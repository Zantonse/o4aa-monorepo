'use client';

import { useState } from 'react';
import {
  ChevronDown,
  Clock,
  Users,
  Star,
  Copy,
  Check,
  Mic,
  ArrowRight,
} from 'lucide-react';
import clsx from 'clsx';
import {
  AUDIENCES,
  OPENING,
  DEMO_MODULES,
  CLOSE_OPTIONS,
  SO_WHAT,
  type AudienceProfile,
  type DemoModule,
  type DemoVariant,
  type DemoBeat,
} from '@/lib/demo-flow-data';

/* ── Tiny copy button ────────────────────────────── */
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="p-1 rounded hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
      title="Copy talk track"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

/* ── Audience selector pills ─────────────────────── */
function AudienceSelector({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {AUDIENCES.map((a) => (
        <button
          key={a.id}
          onClick={() => onSelect(a.id)}
          className={clsx(
            'px-3.5 py-2 rounded-lg text-sm font-medium transition-all border',
            selected === a.id
              ? 'bg-[#00297A] text-white border-[#00297A] shadow-md'
              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50',
          )}
        >
          <span className="mr-1.5">{a.emoji}</span>
          {a.label}
        </button>
      ))}
    </div>
  );
}

/* ── Timeline bar ────────────────────────────────── */
function TimelineBar({ audience }: { audience: AudienceProfile }) {
  const total = 19; // Acts total = 19 min of demo time
  const segments = [
    { label: 'Discover', min: audience.discoverMin, color: '#6d28d9' },
    { label: 'Onboard', min: 1, color: '#0284c7' },
    { label: 'Protect', min: audience.protectMin, color: '#059669' },
    { label: 'Govern', min: audience.governMin, color: '#d97706' },
  ];

  return (
    <div className="space-y-2">
      <div className="flex gap-0.5 h-8 rounded-lg overflow-hidden">
        {/* Opening */}
        <div
          className="flex items-center justify-center text-[10px] font-semibold text-white"
          style={{ width: `${(3 / 30) * 100}%`, background: '#334155' }}
        >
          Open
        </div>
        {segments.map((s) => (
          <div
            key={s.label}
            className="flex items-center justify-center text-[10px] font-semibold text-white"
            style={{ width: `${(s.min / 30) * 100}%`, background: s.color }}
          >
            {s.min >= 3 ? `${s.label} (${s.min}m)` : s.min >= 2 ? `${s.min}m` : ''}
          </div>
        ))}
        {/* So-What */}
        <div
          className="flex items-center justify-center text-[10px] font-semibold text-white"
          style={{ width: `${(5 / 30) * 100}%`, background: '#475569' }}
        >
          So-What
        </div>
        {/* Close */}
        <div
          className="flex items-center justify-center text-[10px] font-semibold text-white"
          style={{ width: `${(3 / 30) * 100}%`, background: '#1e293b' }}
        >
          Close
        </div>
      </div>
      <div className="flex justify-between text-[10px] text-slate-400 font-mono px-0.5">
        <span>0:00</span>
        <span>22:00</span>
        <span>27:00</span>
        <span>30:00</span>
      </div>
    </div>
  );
}

/* ── Beat card ───────────────────────────────────── */
function BeatCard({ beat, index, accentColor }: { beat: DemoBeat; index: number; accentColor: string }) {
  return (
    <div
      className={clsx(
        'relative pl-4 border-l-2 py-3',
        beat.isHighlight ? 'bg-amber-50/60 rounded-r-lg pr-4 -ml-px border-l-[3px]' : '',
      )}
      style={{ borderColor: beat.isHighlight ? '#d97706' : accentColor }}
    >
      {beat.isHighlight && (
        <span className="absolute -top-2 left-3 text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-2 py-0.5 rounded">
          <Star className="w-3 h-3 inline -mt-0.5 mr-0.5" />
          Strongest Moment
        </span>
      )}
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
        <h5 className="text-sm font-semibold text-slate-800">{beat.title}</h5>
        <span className="text-[10px] text-slate-400 font-mono">{beat.duration}</span>
      </div>
      <p className="text-xs text-slate-500 mb-2">{beat.action}</p>
      <div className="flex items-start gap-2 bg-white/80 border border-slate-100 rounded-lg px-3 py-2">
        <Mic className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-700 leading-relaxed italic flex-1">{beat.talkTrack}</p>
        <CopyBtn text={beat.talkTrack} />
      </div>
    </div>
  );
}

/* ── Variant accordion ───────────────────────────── */
function VariantSection({ variant, accentColor, defaultOpen }: { variant: DemoVariant; accentColor: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <div className="border border-slate-100 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
            style={{ background: `${accentColor}15`, color: accentColor }}
          >
            {variant.label}
          </span>
          <span className="text-xs text-slate-500">
            <Users className="w-3 h-3 inline mr-1" />
            {variant.audience}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            <Clock className="w-3 h-3 inline mr-1" />
            {variant.duration}
          </span>
        </div>
        <ChevronDown
          className={clsx('w-4 h-4 text-slate-400 transition-transform', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-1">
          {variant.beats.map((beat, i) => (
            <BeatCard key={i} beat={beat} index={i} accentColor={accentColor} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Act card ────────────────────────────────────── */
function ActCard({ mod, selectedAudience }: { mod: DemoModule; selectedAudience: string }) {
  const [open, setOpen] = useState(false);

  // Determine which variant is "recommended" for this audience
  const audienceProfile = AUDIENCES.find((a) => a.id === selectedAudience);
  const zoomLevel =
    mod.id === 'discover'
      ? audienceProfile?.discover
      : mod.id === 'onboard'
        ? 'skim'
        : mod.id === 'protect'
          ? audienceProfile?.protect
          : audienceProfile?.govern;

  return (
    <div className={clsx('bg-white border rounded-xl shadow-sm overflow-hidden', mod.color.border)}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={clsx('text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded', mod.color.badge, mod.color.badgeText)}
          >
            {mod.act}
          </span>
          <h3 className={clsx('font-semibold text-sm', mod.color.heading)}>{mod.title}</h3>
          {zoomLevel && (
            <span
              className={clsx(
                'text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded',
                zoomLevel === 'zoom'
                  ? 'bg-emerald-100 text-emerald-700'
                  : zoomLevel === 'medium'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-slate-100 text-slate-500',
              )}
            >
              {zoomLevel}
            </span>
          )}
        </div>
        <ChevronDown className={clsx('w-4 h-4 text-slate-400 transition-transform', open && 'rotate-180')} />
      </button>

      {!open && (
        <p className="px-5 pb-3 text-xs text-slate-500 -mt-1">{mod.narrativeBeat}</p>
      )}

      {open && (
        <div className="px-5 pb-5 space-y-4">
          <p className="text-xs text-slate-500">{mod.narrativeBeat}</p>
          <p className="text-[10px] text-slate-400">
            <strong>Demo asset:</strong> {mod.demoAsset}
            {mod.componentId && <span className="font-mono ml-1">({mod.componentId.slice(0, 8)}…)</span>}
          </p>

          <div className="space-y-2">
            {mod.variants.map((v, i) => (
              <VariantSection
                key={i}
                variant={v}
                accentColor={mod.color.accent}
                defaultOpen={
                  (zoomLevel === 'zoom' && v.label.toLowerCase().includes('zoom')) ||
                  (zoomLevel === 'skim' && v.label.toLowerCase().includes('skim')) ||
                  (zoomLevel === 'medium' && v.label.toLowerCase().includes('medium')) ||
                  mod.variants.length === 1
                }
              />
            ))}
          </div>

          {mod.transition && (
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <p className="text-xs text-slate-500 italic">{mod.transition}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Main page ───────────────────────────────────── */
export default function DemoFlowPage() {
  const [selectedAudience, setSelectedAudience] = useState('architect');
  const audience = AUDIENCES.find((a) => a.id === selectedAudience)!;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Demo Flow — The Universal Story</h1>
        <p className="text-sm text-slate-500 mt-1">
          One 30-minute narrative that adapts to any audience. Select who&apos;s in the room and the flow adjusts.
        </p>
      </div>

      {/* Audience selector */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Who&apos;s in the room?</h2>
        <AudienceSelector selected={selectedAudience} onSelect={setSelectedAudience} />
      </div>

      {/* Timeline */}
      <TimelineBar audience={audience} />

      {/* Opening */}
      <div className="bg-slate-900 text-white rounded-xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded">
            Opening · 0:00-3:00
          </span>
        </div>
        <div className="flex gap-3">
          {OPENING.stats.map((s, i) => (
            <div key={i} className="flex-1 text-center">
              <div className="text-2xl font-bold text-amber-400">{s.value}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="flex items-start gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
          <Mic className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-300 leading-relaxed italic flex-1">{OPENING.script}</p>
          <CopyBtn text={OPENING.script} />
        </div>
        <p className="text-[10px] text-slate-500">{OPENING.source}</p>
      </div>

      {/* Acts */}
      <div className="space-y-4">
        {DEMO_MODULES.map((mod) => (
          <ActCard key={mod.id} mod={mod} selectedAudience={selectedAudience} />
        ))}
      </div>

      {/* So-What */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
          The So-What · 22:00-27:00
        </span>
        <div className="flex items-start gap-2 bg-slate-50 border border-slate-100 rounded-lg px-4 py-3">
          <Mic className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-700 leading-relaxed italic flex-1">{SO_WHAT.script}</p>
          <CopyBtn text={SO_WHAT.script} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SO_WHAT.perAudience.map((pa, i) => (
            <div key={i} className="bg-slate-50 border border-slate-100 rounded-lg p-3">
              <div className="text-sm font-semibold text-slate-700">
                <span className="mr-1">{pa.emoji}</span> For {pa.audience}
              </div>
              <p className="text-xs text-slate-500 mt-1">{pa.landing}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Close */}
      <div className="space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
          The Close · 27:00-30:00
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CLOSE_OPTIONS.map((opt, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-lg p-4 space-y-2">
              <div className="text-sm font-semibold text-slate-700">
                <span className="mr-1.5">{opt.emoji}</span>{opt.audience}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed italic">{opt.offer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
