import { personal } from '@/data/resume';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center">
            <span className="font-display font-bold text-accent text-xs leading-none">S</span>
          </div>
          <span className="text-[12px] font-medium text-muted">{personal.name}</span>
        </div>
        <p className="text-[11px] text-subtle text-center">
          Software Engineer &amp; System Analyst · Gurugram, India
        </p>
        <p className="text-[11px] text-subtle">© {year}</p>
      </div>
    </footer>
  );
}
