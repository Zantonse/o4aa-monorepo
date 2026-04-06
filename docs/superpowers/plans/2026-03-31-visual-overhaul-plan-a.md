# Visual Overhaul Plan A: Assets + Infrastructure + Landing Page

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate 20 custom icons/illustrations via /nano-banana-art, restructure routes (Question Bank moves to /questions), build the new landing page at /, and update the header/nav.

**Architecture:** Asset-first approach — generate all visual assets before touching code so components can reference real files. Then route restructure (move existing page, create new landing), then wire everything together. No new dependencies — uses Next.js Image component for asset rendering.

**Tech Stack:** Next.js 16 App Router, Tailwind v4, /nano-banana-art for asset generation, next/image for optimized serving, next/link for navigation.

**Spec:** `docs/superpowers/specs/2026-03-31-visual-overhaul-design.md`

---

## File Map

**Create:**
- `public/icons/` — 15 icon PNGs (3 feature + 9 industry + 3 nav)
- `public/illustrations/` — 5 illustration PNGs (4 diagram headers + 1 hero)
- `app/questions/page.tsx` — Question Bank page (moved from `/`)
- `components/LandingPage.tsx` — New landing page component
- `lib/industry-colors.ts` — Shared industry color system (used by landing + insights + diagrams)

**Modify:**
- `app/page.tsx` — Replace Question Bank with LandingPage import
- `app/layout.tsx` — Dark navy header
- `components/NavLinks.tsx` — Add Questions + Diagrams links, update labels

**No changes to:** `app/insights/`, `app/wizard/`, `components/CustomerIntelligence.tsx`, `components/CheatSheet.tsx`, `components/FullDetailView.tsx` (those are Plan B)

---

### Task 1: Generate Feature Icons (3 assets)

**Files:**
- Create: `public/icons/feature-question-bank.png`
- Create: `public/icons/feature-call-wizard.png`
- Create: `public/icons/feature-intelligence.png`

- [ ] **Step 1: Create output directory**

```bash
mkdir -p public/icons
```

- [ ] **Step 2: Generate Question Bank icon via /nano-banana-art**

Invoke `/nano-banana-art` with this prompt:
```
A flat geometric icon of a crosshair target reticle on a solid bright green #00FF00 background.
Minimalist line-art style, 2px stroke weight, navy blue (#00297A) lines.
Clean corners, no fill, no shadow, no 3D effects. 48x48 pixel icon.
Professional, Stripe/Linear design aesthetic. No text, no logos.
```

Save output to `public/icons/feature-question-bank.png`.

If transparent background is needed, run background removal:
```bash
pip install rembg pillow 2>/dev/null
python3 -c "
from rembg import remove
from PIL import Image
import io
input_img = Image.open('public/icons/feature-question-bank.png')
output_img = remove(input_img)
output_img.save('public/icons/feature-question-bank.png')
"
```

- [ ] **Step 3: Generate Call Wizard icon**

Invoke `/nano-banana-art` with:
```
A flat geometric icon of a magic wand with small spark lines radiating from the tip, on a solid bright green #00FF00 background.
Minimalist line-art style, 2px stroke weight, navy blue (#00297A) lines.
Clean corners, no fill, no shadow, no 3D effects. 48x48 pixel icon.
Professional, Stripe/Linear design aesthetic. No text, no logos.
```

Save to `public/icons/feature-call-wizard.png`. Run rembg if needed.

- [ ] **Step 4: Generate Customer Intelligence icon**

Invoke `/nano-banana-art` with:
```
A flat geometric icon of an abstract neural network — 5 small circles connected by thin lines in a web pattern, on a solid bright green #00FF00 background.
Minimalist line-art style, 2px stroke weight, navy blue (#00297A) lines.
Clean corners, no fill, no shadow, no 3D effects. 48x48 pixel icon.
Professional, Stripe/Linear design aesthetic. No text, no logos.
```

Save to `public/icons/feature-intelligence.png`. Run rembg if needed.

- [ ] **Step 5: Verify all 3 icons exist**

```bash
ls -la public/icons/feature-*.png
```

Expected: 3 PNG files, each roughly 2-10KB.

- [ ] **Step 6: Commit**

```bash
git add public/icons/feature-*.png
git commit -m "assets: generate 3 feature icons via nano-banana-art"
```

---

### Task 2: Generate Industry Icons (9 assets)

**Files:**
- Create: `public/icons/industry-{healthcare,financial-services,technology,retail,manufacturing,insurance,media,professional-services,other}.png`

- [ ] **Step 1: Generate all 9 industry icons using the 3x3 grid trick**

This is the recommended approach for visual consistency. Invoke `/nano-banana-art` with:

```
A 3x3 grid of 9 flat geometric icons on a solid bright green #00FF00 background, arranged in a neat grid with clear spacing between each icon. Each icon represents one industry:

Row 1: Healthcare (medical cross inside a shield), Financial Services (classical building with columns), Technology (circuit board chip)
Row 2: Retail (shopping bag with handle), Manufacturing (industrial gear/cog), Insurance (umbrella)
Row 3: Media (play button triangle), Professional Services (briefcase), Other (globe with latitude lines)

All icons share: 2px stroke weight, navy blue (#00297A) lines, no fill, rounded line caps, consistent sizing within the grid. Minimalist Stripe/Linear design aesthetic. No text, no labels, no 3D effects.
```

Save the grid to `public/icons/industry-grid.png`.

- [ ] **Step 2: Split the grid into 9 individual icons**

```bash
python3 -c "
from PIL import Image

grid = Image.open('public/icons/industry-grid.png')
w, h = grid.size
cell_w, cell_h = w // 3, h // 3

names = [
    'healthcare', 'financial-services', 'technology',
    'retail', 'manufacturing', 'insurance',
    'media', 'professional-services', 'other'
]

for i, name in enumerate(names):
    row, col = divmod(i, 3)
    left = col * cell_w
    top = row * cell_h
    right = left + cell_w
    bottom = top + cell_h
    cell = grid.crop((left, top, right, bottom))
    cell = cell.resize((24, 24), Image.LANCZOS)
    cell.save(f'public/icons/industry-{name}.png')
    print(f'  Saved industry-{name}.png')
"
```

- [ ] **Step 3: Remove backgrounds from all 9 icons**

```bash
python3 -c "
from rembg import remove
from PIL import Image
import glob

for f in sorted(glob.glob('public/icons/industry-*.png')):
    if 'grid' in f:
        continue
    img = Image.open(f)
    out = remove(img)
    out.save(f)
    print(f'  Processed {f}')
"
```

- [ ] **Step 4: Clean up grid file and verify**

```bash
rm public/icons/industry-grid.png
ls -la public/icons/industry-*.png | wc -l
```

Expected: 9 files.

- [ ] **Step 5: Commit**

```bash
git add public/icons/industry-*.png
git commit -m "assets: generate 9 industry icons via nano-banana-art grid"
```

---

### Task 3: Generate Illustrations (5 assets)

**Files:**
- Create: `public/illustrations/diagram-agent-gateway.png`
- Create: `public/illustrations/diagram-before-after.png`
- Create: `public/illustrations/diagram-cross-app-access.png`
- Create: `public/illustrations/diagram-archetype-landscape.png`
- Create: `public/illustrations/hero-identity-network.png`

- [ ] **Step 1: Create directory**

```bash
mkdir -p public/illustrations
```

- [ ] **Step 2: Generate Agent Gateway header illustration**

Invoke `/nano-banana-art`:
```
Abstract illustration of layered horizontal bars stacked vertically with a shield motif, representing a multi-layer security proxy. Navy to blue gradient (#00297A to #3B82F6). Geometric, clean edges, subtle depth through overlapping translucent layers. 400x200 pixels, 16:9 aspect. No text, no logos, no people. Professional B2B enterprise style.
```

Save to `public/illustrations/diagram-agent-gateway.png`.

- [ ] **Step 3: Generate Before/After header illustration**

Invoke `/nano-banana-art`:
```
Abstract split composition illustration. Left half: fractured, disconnected geometric shapes in red (#DC2626) tones representing chaos and ungoverned access. Right half: ordered, connected geometric shapes in green (#16A34A) tones representing governed, structured access. Clean dividing line in the center. 400x200 pixels. No text, no logos, no people. Professional B2B enterprise style.
```

Save to `public/illustrations/diagram-before-after.png`.

- [ ] **Step 4: Generate Cross-App Access header illustration**

Invoke `/nano-banana-art`:
```
Abstract illustration of connected nodes with flowing curved data lines between them, representing token exchange between applications. Blue accent (#3B82F6) on slate background. 5 circular nodes connected by smooth arcing lines with small directional indicators. Geometric, clean, minimal. 400x200 pixels. No text, no logos, no people. Professional B2B enterprise style.
```

Save to `public/illustrations/diagram-cross-app-access.png`.

- [ ] **Step 5: Generate Archetype Landscape header illustration**

Invoke `/nano-banana-art`:
```
Abstract mosaic or treemap illustration with blocks of varying sizes in a multi-color palette: indigo, navy blue, green, amber, rose, violet, fuchsia, teal, slate. Represents data density across categories. Geometric rectangles with subtle rounded corners, packed tightly. 400x200 pixels. No text, no logos, no people. Professional B2B enterprise style.
```

Save to `public/illustrations/diagram-archetype-landscape.png`.

- [ ] **Step 6: Generate Landing Page hero background**

Invoke `/nano-banana-art`:
```
Abstract geometric network illustration. Connected circular nodes of varying sizes linked by thin lines, representing an identity network of users, agents, and systems. Central hub is larger, navy blue (#00297A). Surrounding nodes are lighter blue and slate gray. Very subtle, low-contrast — designed to be used at 15% opacity as a background texture. Light gray (#F8FAFC) base. 1200x400 pixels, 3:1 aspect. No text, no logos, no people.
```

Save to `public/illustrations/hero-identity-network.png`.

- [ ] **Step 7: Verify all 5 illustrations exist**

```bash
ls -la public/illustrations/*.png
```

Expected: 5 PNG files.

- [ ] **Step 8: Commit**

```bash
git add public/illustrations/*.png
git commit -m "assets: generate 5 illustrations via nano-banana-art"
```

---

### Task 4: Generate Nav Icons (3 assets)

**Files:**
- Create: `public/icons/nav-questions.png`
- Create: `public/icons/nav-wizard.png`
- Create: `public/icons/nav-insights.png`

- [ ] **Step 1: Generate 3 nav icons as a single row**

Invoke `/nano-banana-art`:
```
Three small minimalist icons in a horizontal row on a solid bright green #00FF00 background. Left to right: a crosshair target, a magic wand with spark, a neural network of 4 connected dots. All icons: 1.5px stroke, slate gray (#64748B) color, no fill, 16x16 pixel size each. Consistent visual weight across all three. No text, no labels.
```

Save to `public/icons/nav-row.png`.

- [ ] **Step 2: Split into 3 individual icons**

```bash
python3 -c "
from PIL import Image

row = Image.open('public/icons/nav-row.png')
w, h = row.size
cell_w = w // 3

names = ['nav-questions', 'nav-wizard', 'nav-insights']
for i, name in enumerate(names):
    left = i * cell_w
    cell = row.crop((left, 0, left + cell_w, h))
    cell = cell.resize((16, 16), Image.LANCZOS)
    cell.save(f'public/icons/{name}.png')
    print(f'  Saved {name}.png')

import os
os.remove('public/icons/nav-row.png')
"
```

- [ ] **Step 3: Commit**

```bash
git add public/icons/nav-*.png
git commit -m "assets: generate 3 nav icons via nano-banana-art"
```

---

### Task 5: Create Industry Color System

**Files:**
- Create: `lib/industry-colors.ts`

- [ ] **Step 1: Create the shared color system**

This file is used by landing page, insights, cheat sheet, and diagrams. Single source of truth for industry-specific colors.

Create `lib/industry-colors.ts`:

```typescript
import type { Industry } from './archetype-types';

export interface IndustryColorScheme {
  gradient: { from: string; to: string };
  bg: string;       // light background (e.g., card tint)
  border: string;    // border color
  text: string;      // heading text
  badge: string;     // badge background
  badgeText: string; // badge text
}

export const INDUSTRY_COLORS: Record<Industry, IndustryColorScheme> = {
  technology: {
    gradient: { from: '#312e81', to: '#4338ca' },
    bg: '#EEF2FF',
    border: '#C7D2FE',
    text: '#4F46E5',
    badge: '#E0E7FF',
    badgeText: '#3730A3',
  },
  'financial-services': {
    gradient: { from: '#1e3a5f', to: '#1e40af' },
    bg: '#EFF6FF',
    border: '#BFDBFE',
    text: '#1D4ED8',
    badge: '#DBEAFE',
    badgeText: '#1E40AF',
  },
  healthcare: {
    gradient: { from: '#166534', to: '#16a34a' },
    bg: '#F0FDF4',
    border: '#BBF7D0',
    text: '#16A34A',
    badge: '#DCFCE7',
    badgeText: '#166534',
  },
  manufacturing: {
    gradient: { from: '#92400e', to: '#d97706' },
    bg: '#FFFBEB',
    border: '#FDE68A',
    text: '#D97706',
    badge: '#FEF3C7',
    badgeText: '#92400E',
  },
  'retail-ecommerce': {
    gradient: { from: '#9f1239', to: '#e11d48' },
    bg: '#FFF1F2',
    border: '#FECDD3',
    text: '#E11D48',
    badge: '#FFE4E6',
    badgeText: '#9F1239',
  },
  insurance: {
    gradient: { from: '#5b21b6', to: '#7c3aed' },
    bg: '#F5F3FF',
    border: '#DDD6FE',
    text: '#7C3AED',
    badge: '#EDE9FE',
    badgeText: '#5B21B6',
  },
  'media-entertainment': {
    gradient: { from: '#86198f', to: '#c026d3' },
    bg: '#FDF4FF',
    border: '#F5D0FE',
    text: '#C026D3',
    badge: '#FAE8FF',
    badgeText: '#86198F',
  },
  'professional-services': {
    gradient: { from: '#115e59', to: '#0d9488' },
    bg: '#F0FDFA',
    border: '#99F6E4',
    text: '#0D9488',
    badge: '#CCFBF1',
    badgeText: '#115E59',
  },
  other: {
    gradient: { from: '#334155', to: '#64748b' },
    bg: '#F8FAFC',
    border: '#E2E8F0',
    text: '#64748B',
    badge: '#F1F5F9',
    badgeText: '#334155',
  },
};

export function getIndustryIcon(industry: Industry): string {
  return `/icons/industry-${industry}.png`;
}

export function getFeatureIcon(feature: 'question-bank' | 'call-wizard' | 'intelligence'): string {
  return `/icons/feature-${feature}.png`;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit lib/industry-colors.ts --target es2015 --moduleResolution node --module esnext
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/industry-colors.ts
git commit -m "feat: add shared industry color system"
```

---

### Task 6: Move Question Bank to /questions

**Files:**
- Create: `app/questions/page.tsx`
- Modify: `app/page.tsx` (will be replaced in Task 7)

- [ ] **Step 1: Create the /questions route**

Create `app/questions/page.tsx` — this is the Question Bank page moved from `/`:

```typescript
import type { Metadata } from 'next';
import QuestionBankPage from '@/components/QuestionBankPage';

export const metadata: Metadata = {
  title: 'Question Bank | O4AA Discovery Planner',
  description: 'CoTM framework discovery questions by use case',
};

export default function QuestionsRoute() {
  return <QuestionBankPage />;
}
```

- [ ] **Step 2: Rename the current homepage component**

The current `app/page.tsx` exports `HomePage` which is the Question Bank. We need to extract it into a named component so both `/` (temporarily) and `/questions` can use it.

Create `components/QuestionBankPage.tsx` — copy the entire contents of `app/page.tsx` but rename the export:

```typescript
'use client';

import { useState } from 'react';
import { FileSearch } from 'lucide-react';
import { UseCase, DiscoveryPlan, USE_CASE_LABELS } from '@/lib/types';
import { QUESTION_BANK } from '@/lib/question-bank';
import QuestionPlan from '@/components/QuestionPlan';

export default function QuestionBankPage() {
  const [plan, setPlan] = useState<DiscoveryPlan | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase>('workforce-ai-agents');

  const loadPlan = () => {
    const { cotmView, flowView } = QUESTION_BANK[selectedUseCase];
    setPlan({
      accountName: USE_CASE_LABELS[selectedUseCase],
      useCase: selectedUseCase,
      dealStage: 'initial-discovery',
      cotmView,
      flowView,
      generatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Use case selector bar */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm px-5 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label htmlFor="useCase" className="text-sm font-medium text-slate-700 shrink-0">
            Use Case
          </label>
          <select
            id="useCase"
            value={selectedUseCase}
            onChange={(e) => setSelectedUseCase(e.target.value as UseCase)}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900"
          >
            {(Object.entries(USE_CASE_LABELS) as [UseCase, string][]).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <button
            onClick={loadPlan}
            className="bg-[#00297A] hover:bg-[#003a9e] text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm shrink-0"
          >
            Load Questions
          </button>
        </div>
      </div>

      {/* Output */}
      {plan ? (
        <QuestionPlan plan={plan} onRegenerate={loadPlan} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <FileSearch size={28} className="text-slate-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-700 mb-1">
            No plan loaded yet
          </h3>
          <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
            Select a use case above and click Load Questions to view the discovery question bank.
          </p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verify /questions route works**

```bash
npm run build 2>&1 | tail -15
```

Expected: Build succeeds with `/questions` route listed.

- [ ] **Step 4: Commit**

```bash
git add app/questions/page.tsx components/QuestionBankPage.tsx
git commit -m "feat: move Question Bank to /questions route"
```

---

### Task 7: Build Landing Page Component

**Files:**
- Create: `components/LandingPage.tsx`
- Modify: `app/page.tsx` — replace with LandingPage import

- [ ] **Step 1: Create LandingPage component**

Create `components/LandingPage.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AVAILABLE_INDUSTRIES,
  AVAILABLE_USE_CASES,
  AI_TRANSCRIPTS,
  TOTAL_TRANSCRIPTS,
  getArchetypesByIndustry,
} from '@/lib/archetype-data';
import {
  INDUSTRY_LABELS,
  ARCHETYPE_USE_CASE_LABELS,
} from '@/lib/archetype-types';
import type { Industry, ArchetypeUseCase } from '@/lib/archetype-types';
import { getFeatureIcon } from '@/lib/industry-colors';

const FEATURE_CARDS = [
  {
    title: 'Question Bank',
    description: 'CoTM framework questions by use case. Copy-ready for call prep.',
    href: '/questions',
    icon: getFeatureIcon('question-bank'),
    iconBg: '#EEF2FF',
    count: '4 use cases',
  },
  {
    title: 'Call Wizard',
    description: 'AI-generated discovery plan tailored to your account context.',
    href: '/wizard',
    icon: getFeatureIcon('call-wizard'),
    iconBg: '#F0FDF4',
    count: 'AI-powered',
  },
  {
    title: 'Customer Intelligence',
    description: 'Archetype briefs from 743 Gong transcripts. Pre-call prep in seconds.',
    href: '/insights',
    icon: getFeatureIcon('intelligence'),
    iconBg: '#FFF7ED',
    count: '17 archetypes',
  },
];

const DIAGRAM_TILES = [
  { title: 'Agent Gateway', subtitle: '7-layer architecture', id: 'agent-gateway' },
  { title: 'Before / After', subtitle: 'Identity flow comparison', id: 'before-after' },
  { title: 'Cross-App Access', subtitle: 'Token exchange flow', id: 'cross-app-access' },
  { title: 'Archetype Maps', subtitle: 'Industry heat maps', id: 'archetype-landscape' },
];

export default function LandingPage() {
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | ''>('');
  const [selectedUseCase, setSelectedUseCase] = useState<ArchetypeUseCase | ''>('');

  const availableUseCases = selectedIndustry
    ? getArchetypesByIndustry(selectedIndustry).map(a => a.useCase)
    : AVAILABLE_USE_CASES;

  function handleIndustryChange(industry: Industry | '') {
    setSelectedIndustry(industry);
    if (industry) {
      const useCases = getArchetypesByIndustry(industry).map(a => a.useCase);
      if (useCases.length > 0 && (!selectedUseCase || !useCases.includes(selectedUseCase as ArchetypeUseCase))) {
        setSelectedUseCase(useCases[0]);
      }
    } else {
      setSelectedUseCase('');
    }
  }

  function handleGo() {
    if (selectedIndustry && selectedUseCase) {
      router.push(`/insights?industry=${selectedIndustry}&useCase=${selectedUseCase}`);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <div
        className="text-center py-12 px-4 rounded-2xl relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #EEF2FF 0%, #F8FAFC 100%)' }}
      >
        <h1 className="text-3xl font-bold text-slate-900">AI Agent Discovery Toolkit</h1>
        <p className="text-sm text-slate-500 mt-2 max-w-xl mx-auto">
          Pain points, stakeholders, discovery questions, and talk tracks — grounded in {AI_TRANSCRIPTS} real customer conversations across 9 industries.
        </p>

        {/* Quick-start selector */}
        <div className="flex gap-3 justify-center mt-6 max-w-xl mx-auto">
          <div className="flex-1 relative">
            <select
              value={selectedIndustry}
              onChange={e => handleIndustryChange(e.target.value as Industry | '')}
              className="w-full appearance-none rounded-lg border border-slate-300 px-3 py-2.5 pr-8 text-sm bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="">Select industry...</option>
              {AVAILABLE_INDUSTRIES.map(ind => (
                <option key={ind} value={ind}>{INDUSTRY_LABELS[ind]}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <div className="flex-1 relative">
            <select
              value={selectedUseCase}
              onChange={e => setSelectedUseCase(e.target.value as ArchetypeUseCase)}
              disabled={!selectedIndustry}
              className="w-full appearance-none rounded-lg border border-slate-300 px-3 py-2.5 pr-8 text-sm bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-slate-50 disabled:text-slate-400"
            >
              <option value="">Select use case...</option>
              {availableUseCases.map(uc => (
                <option key={uc} value={uc}>{ARCHETYPE_USE_CASE_LABELS[uc]}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <button
            onClick={handleGo}
            disabled={!selectedIndustry || !selectedUseCase}
            className="bg-[#00297A] hover:bg-[#003a9e] disabled:bg-slate-300 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm shrink-0"
          >
            Go <ArrowRight className="inline w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {FEATURE_CARDS.map(card => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 text-center hover:shadow-md hover:border-slate-300 transition-all group"
          >
            <div
              className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
              style={{ background: card.iconBg }}
            >
              <Image src={card.icon} alt={card.title} width={28} height={28} />
            </div>
            <h3 className="font-semibold text-sm text-slate-900">{card.title}</h3>
            <p className="text-xs text-slate-500 mt-1">{card.description}</p>
            <span className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-[#00297A] group-hover:gap-2 transition-all">
              {card.count} <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>

      {/* Diagram tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {DIAGRAM_TILES.map(tile => (
          <Link
            key={tile.id}
            href={`/diagrams#${tile.id}`}
            className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center hover:bg-slate-100 transition-colors"
          >
            <div className="text-xs font-semibold text-slate-600">{tile.title}</div>
            <div className="text-xs text-slate-400 mt-0.5">{tile.subtitle}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Replace app/page.tsx**

Replace the contents of `app/page.tsx` with:

```typescript
import LandingPage from '@/components/LandingPage';

export default function Home() {
  return <LandingPage />;
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | tail -15
```

Expected: Build succeeds with both `/` and `/questions` routes.

- [ ] **Step 4: Commit**

```bash
git add components/LandingPage.tsx app/page.tsx
git commit -m "feat: add landing page with feature cards and quick-start selector"
```

---

### Task 8: Update Header and Navigation

**Files:**
- Modify: `app/layout.tsx`
- Modify: `components/NavLinks.tsx`

- [ ] **Step 1: Update NavLinks with new routes and labels**

Replace the `links` array in `components/NavLinks.tsx`:

```typescript
const links = [
  { href: '/questions', label: 'Questions' },
  { href: '/wizard', label: 'Wizard' },
  { href: '/insights', label: 'Insights' },
  { href: '/diagrams', label: 'Diagrams' },
] as const;
```

Also update the active-state logic to handle the landing page — `/` should not highlight any nav link:

The `isActive` check is already `pathname === link.href` which naturally won't match `/` for any of these links. No change needed to the logic.

- [ ] **Step 2: Update layout header to dark navy**

In `app/layout.tsx`, change the header from white to dark navy:

Replace:
```tsx
<header className="bg-white border-b border-slate-200 sticky top-0 z-50">
```

With:
```tsx
<header className="bg-[#00297A] border-b border-[#001d5a] sticky top-0 z-50">
```

Replace the logo/wordmark colors to work on dark background:
```tsx
<span className="text-white font-bold text-lg leading-none">Okta</span>
<span className="text-blue-200 font-normal text-lg leading-none">for AI Agents</span>
<span className="text-blue-400/50 mx-1 font-light text-lg leading-none">|</span>
```

Also add a home link wrapping the logo:
```tsx
<Link href="/" className="flex items-center gap-2">
  <span className="text-white font-bold text-lg leading-none">Okta</span>
  <span className="text-blue-200 font-normal text-lg leading-none">for AI Agents</span>
</Link>
<span className="text-blue-400/50 mx-1 font-light text-lg leading-none">|</span>
<NavLinks />
```

Add `import Link from 'next/link';` at the top of layout.tsx.

- [ ] **Step 3: Update NavLinks colors for dark header**

In `components/NavLinks.tsx`, update the active/inactive styles:

Replace:
```tsx
isActive
  ? 'text-[#00297A] bg-blue-50'
  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
```

With:
```tsx
isActive
  ? 'text-white bg-white/15'
  : 'text-blue-200 hover:text-white hover:bg-white/10'
```

- [ ] **Step 4: Verify build and visual check**

```bash
npm run build 2>&1 | tail -15
```

Expected: Clean build. All 5 routes present: `/`, `/questions`, `/wizard`, `/insights`, `/diagrams` (diagrams will 404 until Plan B — that's expected).

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx components/NavLinks.tsx
git commit -m "feat: dark navy header with updated nav links"
```

---

### Task 9: Final Verification + Deploy

- [ ] **Step 1: Full build check**

```bash
npm run build 2>&1
```

Expected: Clean build, all routes listed.

- [ ] **Step 2: Start dev server and verify pages**

```bash
npm run dev &
sleep 3
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/          # Landing page
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/questions  # Question Bank
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/wizard    # Call Wizard
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/insights  # Insights
kill %1
```

Expected: All return `200`.

- [ ] **Step 3: Push and deploy**

```bash
git push
npx vercel --prod
```

- [ ] **Step 4: Verify production**

```bash
curl -s -o /dev/null -w "%{http_code}" https://o4aa-discovery.vercel.app/
curl -s -o /dev/null -w "%{http_code}" https://o4aa-discovery.vercel.app/questions
curl -s -o /dev/null -w "%{http_code}" https://o4aa-discovery.vercel.app/insights
```

Expected: All return `200`.
