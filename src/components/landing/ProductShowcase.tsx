import { useState } from 'react';
import { SHOWCASE_TABS } from '@/lib/landingContent';
import { ProductMock } from './ProductMock';
import { cn } from '@/lib/utils';

export function ProductShowcase() {
  const [active, setActive] = useState<(typeof SHOWCASE_TABS)[number]['id']>('dashboard');

  return (
    <section id="product" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label mb-3">Product</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.03em] text-foreground">
            Every screen, thoughtfully crafted
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-subtle">
            From your morning dashboard to deep analytics — the interfaces recruiters
            click through first.
          </p>
        </div>

        <div
          className="mt-12 inline-flex w-full flex-wrap justify-center gap-2 rounded-xl border border-edge bg-surface/60 p-1.5 backdrop-blur-sm sm:w-auto"
          role="tablist"
          aria-label="Product screenshots"
        >
          {SHOWCASE_TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={active === id}
              onClick={() => setActive(id)}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-medium transition-all sm:flex-initial',
                active === id
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                  : 'text-subtle hover:text-foreground',
              )}
            >
              <Icon size={14} strokeWidth={1.75} aria-hidden />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-10" role="tabpanel">
          <div className="landing-mock-shadow mx-auto max-w-4xl rounded-2xl p-1">
            <ProductMock variant={active} />
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {SHOWCASE_TABS.map(({ id, label }) => (
            <figure
              key={id}
              className={cn(
                'landing-card-hover overflow-hidden rounded-xl border bg-surface transition-all',
                active === id
                  ? 'border-violet-500/35 ring-1 ring-violet-500/25'
                  : 'border-edge opacity-70 hover:opacity-100',
              )}
            >
              <ProductMock variant={id} />
              <figcaption className="border-t border-edge px-3 py-2.5 text-center text-[11px] font-medium text-subtle">
                {label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
