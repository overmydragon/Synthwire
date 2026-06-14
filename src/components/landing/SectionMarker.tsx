export function SectionMarker({
  num,
  eyebrow,
  align = 'left',
}: {
  num: string;
  eyebrow: string;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={`flex items-center gap-3 ${
        align === 'center' ? 'justify-center' : ''
      }`}
    >
      <span className="text-[11px] font-mono text-ink-500 tracking-tight">
        {num}
      </span>
      <span className="h-px w-12 bg-white/[0.1]" />
      <span className="eyebrow text-ink-400">{eyebrow}</span>
    </div>
  );
}
