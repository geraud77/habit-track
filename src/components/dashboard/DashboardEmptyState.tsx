import { BarChart2, Flame, ListChecks, Plus, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardEmptyStateProps {
  onAddHabit: () => void;
  onShowTips?: () => void;
}

/**
 * Rich empty dashboard for users who skipped onboarding or cleared all habits.
 */
export function DashboardEmptyState({ onAddHabit, onShowTips }: DashboardEmptyStateProps) {
  const steps = [
    { icon: Plus, title: 'Add a habit', desc: 'Name it and pick a color' },
    { icon: ListChecks, title: 'Check in daily', desc: 'One tap marks today complete' },
    { icon: Flame, title: 'Build streaks', desc: 'Consistency compounds over time' },
    { icon: BarChart2, title: 'Review progress', desc: 'Charts unlock after a few days' },
  ];

  return (
    <div className="animate-fade-up rounded-xl border border-dashed border-edge bg-surface/50 p-8">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-violet-500/10">
          <Sparkles size={22} strokeWidth={1.5} className="text-violet-400" />
        </div>

        <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-foreground">
          Your dashboard is ready
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
          Add your first habit to see daily progress, weekly charts, streak heatmaps, and AI insights.
        </p>

        <button
          type="button"
          onClick={onAddHabit}
          className={cn(
            'mt-6 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5',
            'text-[13px] font-medium text-white transition-all duration-150',
            'hover:bg-violet-500 active:scale-[0.98]',
          )}
        >
          <Plus size={16} />
          Add your first habit
        </button>

        <div className="mt-8 grid w-full grid-cols-2 gap-3 text-left sm:grid-cols-4">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="rounded-lg border border-edge bg-surface p-3 shadow-card animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Icon size={14} strokeWidth={1.8} className="mb-2 text-subtle" />
              <p className="text-[11px] font-medium text-foreground">{title}</p>
              <p className="mt-0.5 text-[10px] leading-snug text-subtle">{desc}</p>
            </div>
          ))}
        </div>

        {onShowTips && (
          <button
            type="button"
            onClick={onShowTips}
            className="mt-5 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            View getting-started tips →
          </button>
        )}
      </div>
    </div>
  );
}
