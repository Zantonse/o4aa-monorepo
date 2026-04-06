'use client';

interface FrequencyBarProps {
  frequency: number; // 0-1
  label?: string;
  size?: 'sm' | 'md';
  color?: { from: string; to: string };
}

export default function FrequencyBar({ frequency, label, size = 'sm', color }: FrequencyBarProps) {
  const pct = Math.round(frequency * 100);
  const height = size === 'sm' ? 'h-1.5' : 'h-2';
  const gradient = color
    ? `linear-gradient(90deg, ${color.from}, ${color.to})`
    : 'linear-gradient(90deg, #00297A, #3B82F6)';

  return (
    <div className="flex items-center gap-2 min-w-0">
      <div className={`flex-1 ${height} bg-slate-100 rounded-full overflow-hidden`}>
        <div
          className={`${height} rounded-full`}
          style={{ width: `${pct}%`, background: gradient }}
        />
      </div>
      {label !== undefined ? (
        <span className="text-xs text-slate-500 tabular-nums shrink-0">{label}</span>
      ) : (
        <span className="text-xs text-slate-500 tabular-nums shrink-0">{pct}%</span>
      )}
    </div>
  );
}
