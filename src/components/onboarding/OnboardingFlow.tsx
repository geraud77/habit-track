import { useState } from 'react';
import {
  ArrowRight,
  BarChart2,
  Check,
  Flame,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react';
import { useHabits } from '@/context/useHabits';
import { useOnboarding } from '@/context/onboardingContext';
import { HabitForm } from '@/components/habits';
import { COLOR_MAP, type HabitColor } from '@/types/habit';
import { cn } from '@/lib/utils';

const STEPS = ['welcome', 'habit', 'complete'] as const;
type Step = (typeof STEPS)[number];

const SUGGESTIONS: { name: string; color: HabitColor }[] = [
  { name: 'Drink water', color: 'cyan' },
  { name: 'Morning exercise', color: 'emerald' },
  { name: 'Read 20 minutes', color: 'blue' },
  { name: 'Meditate', color: 'violet' },
  { name: 'Sleep by 11pm', color: 'amber' },
];

function ProgressDots({ step }: { step: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {STEPS.map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-1.5 rounded-full transition-all duration-300',
            i === step ? 'w-6 bg-violet-500' : 'w-1.5 bg-edge-strong',
          )}
        />
      ))}
    </div>
  );
}

function WelcomeStep({ onNext, onDemo }: { onNext: () => void; onDemo: () => void }) {
  const features = [
    { icon: Target, label: 'Track daily habits', desc: 'One tap per day' },
    { icon: Flame, label: 'Build streaks', desc: 'Stay consistent' },
    { icon: BarChart2, label: 'See analytics', desc: 'Charts & heatmaps' },
    { icon: TrendingUp, label: 'Get AI insights', desc: 'Patterns that matter' },
  ];

  return (
    <div className="flex w-full max-w-md flex-col items-center text-center animate-fade-up">
      <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-violet-500/15">
        <Sparkles size={24} className="text-violet-400" />
      </div>

      <h1 className="text-[26px] font-semibold tracking-[-0.03em] text-foreground">
        Welcome to HabitFlow
      </h1>
      <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-muted-foreground">
        Build better habits with streaks, analytics, and personalised insights — all in one calm workspace.
      </p>

      <div className="mt-8 grid w-full grid-cols-2 gap-3">
        {features.map(({ icon: Icon, label, desc }) => (
          <div
            key={label}
            className="rounded-lg border border-edge bg-surface p-3 text-left shadow-card"
          >
            <Icon size={16} strokeWidth={1.8} className="mb-2 text-violet-400" />
            <p className="text-[12px] font-medium text-foreground">{label}</p>
            <p className="mt-0.5 text-[11px] text-subtle">{desc}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        className={cn(
          'mt-8 flex w-full items-center justify-center gap-2 rounded-lg',
          'bg-violet-600 px-4 py-3 text-[14px] font-medium text-white',
          'transition-all duration-150 hover:bg-violet-500 active:scale-[0.98]',
        )}
      >
        Get started
        <ArrowRight size={16} />
      </button>

      <button
        type="button"
        onClick={onDemo}
        className="mt-3 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        Explore with demo data
      </button>
    </div>
  );
}

function FirstHabitStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const { addHabit } = useHabits();

  function pickSuggestion(name: string, color: HabitColor) {
    addHabit(name, color);
    onNext();
  }

  return (
    <div className="flex w-full max-w-md flex-col animate-fade-up">
      <button
        type="button"
        onClick={onBack}
        className="mb-6 self-start text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back
      </button>

      <h2 className="text-[22px] font-semibold tracking-[-0.025em] text-foreground">
        Create your first habit
      </h2>
      <p className="mt-1.5 text-[13px] text-muted-foreground">
        Start with one small win. You can always add more later.
      </p>

      <div className="mt-6">
        <HabitForm variant="onboarding" onHabitAdded={onNext} />
      </div>

      <p className="mt-5 text-center text-[11px] font-medium uppercase tracking-[0.06em] text-subtle">
        Quick picks
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        {SUGGESTIONS.map(({ name, color }) => (
          <button
            key={name}
            type="button"
            onClick={() => pickSuggestion(name, color)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full border border-edge',
              'bg-surface px-3 py-1.5 text-[12px] font-medium text-foreground',
              'transition-all duration-150 hover:border-edge-strong hover:bg-surface-raised active:scale-95',
            )}
          >
            <span className={cn('size-2 rounded-full', COLOR_MAP[color].dot)} />
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

function CompleteStep({ onFinish }: { onFinish: () => void }) {
  const { habits } = useHabits();

  return (
    <div className="flex w-full max-w-md flex-col items-center text-center animate-scale-in">
      <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-emerald-500/15">
        <Check size={28} strokeWidth={2} className="text-emerald-400" />
      </div>

      <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-foreground">
        You&apos;re all set
      </h2>
      <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
        {habits.length === 1
          ? `"${habits[0]?.name}" is ready to track. Your dashboard is waiting.`
          : `${habits.length} habits added. Your dashboard is ready.`}
      </p>

      <div className="mt-8 w-full rounded-lg border border-edge bg-surface p-4 text-left shadow-card">
        <p className="label mb-3">What to do next</p>
        <ul className="space-y-2.5 text-[12px] text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-violet-400">1.</span>
            Mark habits complete each day with one tap
          </li>
          <li className="flex gap-2">
            <span className="text-violet-400">2.</span>
            Check Analytics for trends and heatmaps
          </li>
          <li className="flex gap-2">
            <span className="text-violet-400">3.</span>
            Visit Insights for AI-style productivity tips
          </li>
        </ul>
      </div>

      <button
        type="button"
        onClick={onFinish}
        className={cn(
          'mt-8 flex w-full items-center justify-center gap-2 rounded-lg',
          'bg-violet-600 px-4 py-3 text-[14px] font-medium text-white',
          'transition-all duration-150 hover:bg-violet-500 active:scale-[0.98]',
        )}
      >
        Go to dashboard
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

export function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const { completeOnboarding } = useOnboarding();
  const { loadDemoHabits } = useHabits();

  function handleDemo() {
    loadDemoHabits();
    completeOnboarding();
  }

  function handleFinish() {
    completeOnboarding();
  }

  const currentStep: Step = STEPS[step] ?? 'welcome';

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background">
      <div className="flex h-14 shrink-0 items-center justify-center border-b border-edge px-6">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-violet-500/15">
            <Sparkles size={12} className="text-violet-400" />
          </div>
          <span className="text-[13px] font-semibold tracking-[-0.02em]">HabitFlow</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-10">
        {currentStep === 'welcome' && (
          <WelcomeStep onNext={() => setStep(1)} onDemo={handleDemo} />
        )}
        {currentStep === 'habit' && (
          <FirstHabitStep onNext={() => setStep(2)} onBack={() => setStep(0)} />
        )}
        {currentStep === 'complete' && <CompleteStep onFinish={handleFinish} />}
      </div>

      <div className="shrink-0 border-t border-edge px-6 py-5">
        <ProgressDots step={step} />
      </div>
    </div>
  );
}
