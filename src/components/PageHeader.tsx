import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; to?: string };

export default function PageHeader({
  title,
  subtitle,
  crumbs = [],
}: {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative pt-32 pb-20 border-b border-white/10 bg-slate-dark technical-grid overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 relative">
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-steel/60 mb-6">
          <Link to="/" className="hover:text-electric">Home</Link>
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              <ChevronRight className="size-3" />
              {c.to ? <Link to={c.to} className="hover:text-electric">{c.label}</Link> : <span className="text-steel">{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1 className="font-bebas text-6xl md:text-8xl text-white tracking-tight leading-[0.85] animate-fade-up">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 font-playfair italic text-lg text-electric animate-fade-up delay-100">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
