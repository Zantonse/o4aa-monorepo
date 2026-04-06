import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { DealContext, DiscoveryPlan } from '@/lib/types';
import { buildDiscoveryPrompt } from '@/lib/prompt';

// ----------------------------------------------------------------------------
// Utility: extract a ```json ... ``` fenced block from model output
// ----------------------------------------------------------------------------
function extractJSON(text: string): unknown {
  const match = text.match(/```json\s*([\s\S]*?)```/);
  if (!match) throw new Error('No JSON block found in response');
  return JSON.parse(match[1]);
}

// ----------------------------------------------------------------------------
// POST /api/generate
// Body: { context: DealContext }
// Returns: DiscoveryPlan
// ----------------------------------------------------------------------------
export async function POST(req: NextRequest): Promise<NextResponse> {
  // --- Parse request body ---
  let context: DealContext;
  try {
    const body = await req.json();
    if (!body?.context) {
      return NextResponse.json(
        { error: 'Request body must include a "context" field.' },
        { status: 400 }
      );
    }
    context = body.context as DealContext;

    // Basic field validation
    if (!context.accountName || !context.industry || !context.useCase || !context.dealStage) {
      return NextResponse.json(
        { error: 'context must include accountName, industry, useCase, and dealStage.' },
        { status: 400 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON in request body.' },
      { status: 400 }
    );
  }

  // --- Build the prompt ---
  const prompt = buildDiscoveryPrompt(context);

  // --- Call LiteLLM proxy via OpenAI SDK ---
  const client = new OpenAI({
    apiKey: process.env.LITELLM_API_KEY,
    baseURL: `${process.env.LITELLM_API_URL ?? 'https://llm.atko.ai'}/v1`,
  });

  let rawText: string;
  try {
    const response = await client.chat.completions.create({
      model: process.env.CLAUDE_MODEL ?? 'claude-4-5-sonnet',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    });

    rawText = response.choices[0]?.message?.content ?? '';
    if (!rawText) {
      throw new Error('Empty response from model.');
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown API error';
    console.error('[generate] LiteLLM call failed:', message);
    return NextResponse.json(
      { error: `Model API error: ${message}` },
      { status: 500 }
    );
  }

  // --- Extract and parse JSON from model output ---
  let parsed: unknown;
  try {
    parsed = extractJSON(rawText);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'JSON extraction failed';
    console.error('[generate] JSON extraction failed. Raw response:\n', rawText);
    return NextResponse.json(
      { error: `Failed to parse model output: ${message}` },
      { status: 500 }
    );
  }

  // --- Assemble DiscoveryPlan ---
  const plan = parsed as Pick<DiscoveryPlan, 'cotmView' | 'flowView'>;

  const discoveryPlan: DiscoveryPlan = {
    accountName: context.accountName,
    useCase: context.useCase,
    dealStage: context.dealStage,
    cotmView: plan.cotmView,
    flowView: plan.flowView,
    generatedAt: new Date().toISOString(),
  };

  return NextResponse.json(discoveryPlan);
}
