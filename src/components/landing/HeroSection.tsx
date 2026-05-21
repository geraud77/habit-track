import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { useAppMode } from '@/context/appModeContext';
import { useHabits } from '@/context/useHabits';
import { useOnboarding } from '@/context/onboardingContext';
import { LANDING_STATS } from '@/lib/landingContent';
import { Button } from '@/components/ui/button';
import { ProductMock } from './ProductMock';

interface HeroSectionProps {
  onScrollToProduct: () => void;
}

export function HeroSection({ onScrollToProduct }: HeroSectionProps) {
  const { enterApp } = useAppMode();
  const { loadDemoHabits } = useHabits();
  const { completeOnboarding } = useOnboarding();

  function handleLiveDemo() {
    loadDemoHabits();
    completeOnboarding();
    enterApp();
  }

  return (
    <section className="landing-hero relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="landing-glow pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-xl animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1.5 shadow-sm shadow-violet-500/10">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-violet-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-violet-400" />
              </span>
              <Sparkles size={12} className="text-violet-400" aria-hidden />
              <span className="text-[11px] font-medium text-violet-300">
                Now in public beta — habit tracking, reimagined
              </span>
            </div>

            <h1 className="text-[clamp(2.25rem,5.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
              <span className="text-foreground">Build habits that </span>
              <span className="text-gradient-hero">actually stick</span>
            </h1>

            <p className="mt-6 text-[17px] leading-[1.6] text-subtle">
              HabitFlow is the calm, data-rich habit OS for people who love
              Linear-grade UX — analytics, AI insights, streaks, and a command
              palette in one polished dashboard.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="h-11 bg-violet-600 px-5 text-white shadow-lg shadow-violet-500/25 hover:bg-violet-500"
                onClick={enterApp}
              >
                Start free
                <ArrowRight size={16} className="ml-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11"
                onClick={handleLiveDemo}
              >
                <Play size={14} className="mr-1.5" />
                Live demo
              </Button>
            </div>
            <button
              type="button"
              onClick={onScrollToProduct}
              className="mt-4 block text-[13px] font-medium text-subtle transition-colors hover:text-violet-400"
            >
              Scroll to explore the product ↓
            </button>

            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-edge pt-10">
              {LANDING_STATS.map((stat) => (
                <div key={stat.label}>
                  <dd className="text-[22px] font-semibold tabular-nums tracking-tight text-foreground sm:text-[24px]">
                    {stat.value}
                  </dd>
                  <dt className="mt-1 text-[11px] leading-snug text-subtle">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative animate-fade-up lg:pl-6" style={{ animationDelay: '80ms' }}>
            <div className="landing-mock-shadow rounded-2xl p-1 ring-1 ring-white/5">
              <ProductMock variant="dashboard" />
            </div>
            <div
              className="absolute -bottom-6 -left-6 hidden w-[44%] rounded-xl border border-edge bg-background p-1 shadow-2xl md:block lg:-left-10"
              aria-hidden
            >
              <ProductMock variant="analytics" />
            </div>
            <div
              className="absolute -right-2 top-8 hidden rounded-lg border border-edge bg-surface px-3 py-2 shadow-lg sm:block"
              aria-hidden
            >
              <p className="text-[10px] font-medium text-subtle">Today&apos;s focus</p>
              <p className="text-[18px] font-semibold tabular-nums text-violet-400">86</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
