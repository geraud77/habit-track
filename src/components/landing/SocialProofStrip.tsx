const LOGOS = [
  'Linear',
  'Notion',
  'Vercel',
  'Stripe',
  'Figma',
  'Arc',
] as const;

export function SocialProofStrip() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-subtle">
          Designed for teams who expect
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {LOGOS.map((name) => (
            <span
              key={name}
              className="text-[15px] font-semibold tracking-[-0.03em] text-foreground/25 transition-colors hover:text-foreground/45"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
