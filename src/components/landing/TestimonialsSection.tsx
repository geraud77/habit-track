import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/landingContent';

export function TestimonialsSection() {
  return (
    <section className="border-t border-edge/60 bg-surface/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label mb-3">Testimonials</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.03em] text-foreground">
            Loved by builders and designers
          </h2>
          <p className="mt-4 text-[15px] text-subtle">
            The kind of feedback you&apos;d expect after a Product Hunt launch.
          </p>
        </div>

        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <li
              key={t.name}
              className="landing-card-hover flex flex-col rounded-2xl border border-edge bg-surface p-7 shadow-card"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex gap-0.5 text-amber-400/90" aria-hidden>
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-[12px]">
                    ★
                  </span>
                ))}
              </div>
              <Quote
                size={18}
                className="mt-4 text-violet-500/35"
                strokeWidth={1.5}
                aria-hidden
              />
              <blockquote className="mt-3 flex-1 text-[15px] leading-[1.65] text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <footer className="mt-6 flex items-center gap-3 border-t border-edge pt-5">
                <div
                  className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/25 to-violet-500/5 text-[11px] font-semibold text-violet-400 ring-1 ring-violet-500/20"
                  aria-hidden
                >
                  {t.initials}
                </div>
                <div>
                  <cite className="not-italic text-[14px] font-semibold text-foreground">
                    {t.name}
                  </cite>
                  <p className="text-[12px] text-subtle">{t.role}</p>
                </div>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
