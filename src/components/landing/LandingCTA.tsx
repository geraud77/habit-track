import { ArrowRight } from 'lucide-react';
import { useAppMode } from '@/context/appModeContext';
import { useHabits } from '@/context/useHabits';
import { useOnboarding } from '@/context/onboardingContext';
import { Button } from '@/components/ui/button';

export function LandingCTA() {
  const { enterApp } = useAppMode();
  const { loadDemoHabits } = useHabits();
  const { completeOnboarding } = useOnboarding();

  function handleDemo() {
    loadDemoHabits();
    completeOnboarding();
    enterApp();
  }

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="cta-panel relative overflow-hidden rounded-2xl border border-violet-500/25 px-6 py-14 text-center sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.54_0.2_293/12%),transparent_55%)]"
            aria-hidden
          />
          <div className="relative">
            <p className="label mb-3 text-violet-400">Ready when you are</p>
            <h2 className="mx-auto max-w-xl text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold tracking-[-0.03em] text-foreground">
              Start building habits your future self will thank you for
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-subtle">
              Free forever on your device. No account required. Open the live demo
              and explore the full dashboard in one click.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                size="lg"
                className="bg-violet-600 text-white shadow-lg shadow-violet-500/20 hover:bg-violet-500"
                onClick={enterApp}
              >
                Get started free
                <ArrowRight size={16} className="ml-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={handleDemo}>
                Try live demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
