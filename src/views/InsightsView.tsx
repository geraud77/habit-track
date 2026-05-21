import { useMemo } from 'react';
import { Lightbulb } from 'lucide-react';
import { useHabits } from '@/context/useHabits';
import { useHabitStats } from '@/hooks/useHabitStats';
import { useAnalytics } from '@/hooks/useAnalytics';
import { PageHeader } from '@/components/PageHeader';
import { EmptyState } from '@/components/EmptyState';
import { AiInsightCard } from '@/components/AiInsightCard';
import { generateInsights } from '@/lib/insights';

function useInsights() {
  const { habits } = useHabits();
  const stats = useHabitStats();
  const analytics = useAnalytics();
  return useMemo(
    () => generateInsights(habits, stats, analytics),
    [habits, stats, analytics],
  );
}

export function InsightsView() {
  const { habits } = useHabits();
  const insights = useInsights();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-7 px-6 py-7 pb-24 md:pb-10">
      <PageHeader
        title="Insights"
        subtitle="AI-style patterns learned from your habit history"
      />

      {habits.length === 0 ? (
        <EmptyState
          icon={Lightbulb}
          title="No insights yet"
          description="Add habits and start tracking — personalised insights appear as patterns emerge."
        />
      ) : insights.length === 0 ? (
        <EmptyState
          icon={Lightbulb}
          title="Keep tracking"
          description="Insights need a few days of data. Check back soon."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {insights.map((insight, i) => (
            <AiInsightCard key={insight.id} insight={insight} index={i} />
          ))}
        </div>
      )}

      {insights.length > 0 && (
        <p className="px-1 text-[11px] leading-relaxed text-subtle">
          Insights combine your last 90 days of completions with timing heuristics.
          Labels marked &quot;Estimated&quot; use profile-based patterns until more data is logged.
        </p>
      )}
    </div>
  );
}
