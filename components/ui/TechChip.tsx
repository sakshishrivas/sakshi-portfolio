interface TechChipProps {
  name: string;
  className?: string;
}

export function TechChip({ name, className = '' }: TechChipProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-medium
        text-subtle border border-border bg-surface
        hover:border-accent/40 hover:text-accent-soft hover:bg-accent/5
        transition-all duration-200 cursor-default ${className}`}
    >
      {name}
    </span>
  );
}
