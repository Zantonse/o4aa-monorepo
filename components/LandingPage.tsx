'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AVAILABLE_INDUSTRIES, AI_TRANSCRIPTS, getArchetypesByIndustry } from '@/lib/archetype-data';
import { INDUSTRY_LABELS, ARCHETYPE_USE_CASE_LABELS, type Industry, type ArchetypeUseCase } from '@/lib/archetype-types';
import { getFeatureIcon } from '@/lib/industry-colors';

interface FeatureCard {
  href: string;
  title: string;
  description: string;
  icon: ReturnType<typeof getFeatureIcon>;
  cta: string;
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    href: '/questions',
    title: 'Question Bank',
    description: 'CoTM-framework discovery questions organized by use case. Load the right questions for any AI agent conversation.',
    icon: getFeatureIcon('question-bank'),
    cta: 'Browse Questions',
  },
  {
    href: '/wizard',
    title: 'Call Wizard',
    description: 'AI-powered call prep that generates a tailored discovery plan from your account details in seconds.',
    icon: getFeatureIcon('call-wizard'),
    cta: 'Start Wizard',
  },
  {
    href: '/insights',
    title: 'Customer Intelligence',
    description: `Patterns from ${AI_TRANSCRIPTS} AI-related Gong calls — pain points, stakeholders, and product fit by industry and use case.`,
    icon: getFeatureIcon('intelligence'),
    cta: 'View Insights',
  },
];

interface DiagramTile {
  id: string;
  label: string;
  image: string;
}

const DIAGRAM_TILES: DiagramTile[] = [
  { id: 'agent-gateway', label: 'Agent Gateway', image: '/illustrations/diagram-agent-gateway.png' },
  { id: 'cross-app-access', label: 'Cross-App Access', image: '/illustrations/diagram-cross-app-access.png' },
  { id: 'before-after', label: 'Before / After', image: '/illustrations/diagram-before-after.png' },
  { id: 'archetype-landscape', label: 'Archetype Landscape', image: '/illustrations/diagram-archetype-landscape.png' },
];

export default function LandingPage() {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>(AVAILABLE_INDUSTRIES[0]);

  const availableUseCases = useMemo(
    () => getArchetypesByIndustry(selectedIndustry).map(a => a.useCase),
    [selectedIndustry]
  );

  const [selectedUseCase, setSelectedUseCase] = useState<ArchetypeUseCase>(availableUseCases[0]);

  function handleIndustryChange(industry: Industry) {
    setSelectedIndustry(industry);
    const useCases = getArchetypesByIndustry(industry).map(a => a.useCase);
    if (useCases.length > 0 && !useCases.includes(selectedUseCase)) {
      setSelectedUseCase(useCases[0]);
    }
  }

  const handleGo = () => {
    router.push(`/insights?industry=${selectedIndustry}&useCase=${selectedUseCase}`);
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Hero */}
      <section
        className="rounded-2xl overflow-hidden relative px-8 py-14 text-center"
        style={{ background: 'linear-gradient(180deg, #EEF2FF 0%, #F8FAFC 100%)' }}
      >
        {/* Background illustration */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none">
          <Image
            src="/illustrations/hero-identity-network.png"
            alt=""
            width={700}
            height={420}
            className="object-contain"
            priority
          />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
            {AI_TRANSCRIPTS} AI-related Gong transcripts analyzed
          </div>
          <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
            AI Agent Discovery Toolkit
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Everything you need to run a sharp Okta for AI Agents discovery call —
            evidence-backed questions, customer intelligence, and real-time call prep.
          </p>

          {/* Quick-start selector */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-5 py-4 inline-flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl">
            <select
              value={selectedIndustry}
              onChange={(e) => handleIndustryChange(e.target.value as Industry)}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 w-full"
              aria-label="Select industry"
            >
              {AVAILABLE_INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {INDUSTRY_LABELS[ind]}
                </option>
              ))}
            </select>
            <select
              value={selectedUseCase}
              onChange={(e) => setSelectedUseCase(e.target.value as ArchetypeUseCase)}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 w-full"
              aria-label="Select use case"
            >
              {availableUseCases.map((uc) => (
                <option key={uc} value={uc}>
                  {ARCHETYPE_USE_CASE_LABELS[uc]}
                </option>
              ))}
            </select>
            <button
              onClick={handleGo}
              className="bg-[#00297A] hover:bg-[#003a9e] text-white font-semibold px-6 py-2 rounded-lg transition-colors text-sm shrink-0 w-full sm:w-auto"
            >
              Go
            </button>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-5">Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {FEATURE_CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-200 transition-all p-6 flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                <Image
                  src={card.icon}
                  alt={card.title}
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-slate-900 mb-1.5">{card.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{card.description}</p>
              </div>
              <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                {card.cta}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Diagram Tiles */}
      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-5">Reference Diagrams</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {DIAGRAM_TILES.map((tile) => (
            <Link
              key={tile.id}
              href={`/diagrams#${tile.id}`}
              className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-200 hover:shadow-md transition-all"
            >
              <div className="aspect-video flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a5f)' }}>
                <Image
                  src={tile.image}
                  alt={tile.label}
                  width={280}
                  height={158}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="px-3 py-2.5">
                <p className="text-xs font-medium text-slate-700 truncate">{tile.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
