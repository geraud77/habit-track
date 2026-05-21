import { Award, Rocket, Star, Zap } from 'lucide-react';

const BADGES = [
  { icon: Rocket, label: '#1 Product of the Day', sub: 'Product Hunt · Concept' },
  { icon: Star, label: '4.9 average rating', sub: 'From 200+ beta testers' },
  { icon: Zap, label: 'Shipped in React 19', sub: 'TypeScript · Vite · Tailwind v4' },
  { icon: Award, label: 'YC-style polish', sub: 'Built for portfolio & production' },
] as const;

export function LandingBadgeStrip() {
  return (
    <section className="border-y border-edge/80 bg-surface/40 py-6 backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {BADGES.map(({ icon: Icon, label, sub }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-lg px-2 py-1"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/12 ring-1 ring-violet-500/20">
              <Icon size={16} className="text-violet-400" strokeWidth={1.75} aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-semibold text-foreground">{label}</p>
              <p className="text-[10px] text-subtle">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
