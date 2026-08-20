interface SectionLabelProps {
  number: string;
  title: string;
  className?: string;
}

export function SectionLabel({ number, title, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-[10px] font-mono text-subtle tracking-widest">{number}</span>
      <span className="h-px w-6 bg-border" />
      <span className="text-[10px] font-mono text-subtle uppercase tracking-widest">{title}</span>
    </div>
  );
}
