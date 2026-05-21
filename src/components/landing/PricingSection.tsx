import { Check } from 'lucide-react';
import { useAppMode } from '@/context/appModeContext';
import { useHabits } from '@/context/useHabits';
import { useOnboarding } from '@/context/onboardingContext';
import { PRICING_PLANS } from '@/lib/landingContent';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function PricingSection() {
  const { enterApp } = useAppMode();
  const { loadDemoHabits } = useHabits();
  const { completeOnboarding } = useOnboarding();

  function handleCta(planId: string) {
    if (planId === 'free') {
      enterApp();
      return;
    }
    if (planId === 'pro') {
      loadDemoHabits();
      completeOnboarding();
      enterApp();
    }
  }

  return (
    <section id="pricing" className="scroll-mt-24 border-t border-edge/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label mb-3">Pricing</p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-[-0.03em] text-foreground">
            Simple plans. No surprise fees.
          </h2>
          <p className="mt-4 text-[16px] text-subtle">
            Starter is free forever. Pro tiers reflect a real SaaS roadmap — shown
            here for portfolio realism.
          </p>
        </div>

        <ul className="mt-16 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {PRICING_PLANS.map((plan) => (
            <li
              key={plan.id}
              className={cn(
                'landing-card-hover flex flex-col rounded-2xl border p-7 shadow-card',
                plan.featured
                  ? 'border-violet-500/40 bg-gradient-to-b from-violet-500/8 to-surface ring-1 ring-violet-500/25 lg:scale-[1.02]'
                  : 'border-edge bg-surface',
              )}
            >
              {plan.featured && (
                <span className="label mb-4 w-fit rounded-full bg-violet-500/15 px-2.5 py-1 text-violet-400">
                  Most popular
                </span>
              )}
              <h3 className="text-[18px] font-semibold text-foreground">{plan.name}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-subtle">{plan.description}</p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="text-[40px] font-semibold tracking-[-0.04em] text-foreground">
                  {plan.price}
                </span>
                <span className="text-[13px] text-subtle">/{plan.period}</span>
              </p>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px] text-subtle">
                    <Check
                      size={15}
                      className="mt-0.5 shrink-0 text-violet-400"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  'mt-8 h-11 w-full',
                  plan.featured
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20 hover:bg-violet-500'
                    : undefined,
                )}
                variant={plan.featured ? 'default' : 'outline'}
                disabled={plan.id === 'team'}
                onClick={() => handleCta(plan.id)}
              >
                {plan.cta}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
