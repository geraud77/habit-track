import { FEATURES } from '@/lib/landingContent';

export function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-24 border-t border-edge/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label mb-3">Features</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.03em] text-foreground">
            Everything a funded habit app ships on day one
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-subtle">
            No clutter. No gamification noise. Just clarity, streaks, and insights
            that help you improve — the way Notion or Linear would do habits.
          </p>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }, i) => (
            <li
              key={title}
              className="landing-card-hover rounded-xl border border-edge bg-surface p-6 shadow-card"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-violet-500/5 ring-1 ring-violet-500/20">
                <Icon size={20} className="text-violet-400" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-foreground">
                {title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-subtle">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
