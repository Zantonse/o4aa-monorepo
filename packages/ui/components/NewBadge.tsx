export default function NewBadge() {
  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded-md border ml-auto flex-shrink-0"
      style={{
        background: 'var(--color-success-bg)',
        borderColor: 'var(--color-success-border)',
        color: 'var(--color-success-text)',
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: '0.06em',
      }}
    >
      NEW
    </span>
  );
}
