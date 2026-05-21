import { Brain, Sparkles } from 'lucide-react';
import type { ProductivityInsight } from '@/lib/insights';
import { cn } from '@/lib/utils';

const TYPE_STYLES = {
  success: {
    border: 'border-l-emerald-500/60',
    bg: 'bg-emerald-500/[0.04]',
    chip: 'text-emerald-400 bg-emerald-500/10',
  },
  info: {
    border: 'border-l-violet-500/60',
    bg: 'bg-violet-500/[0.04]',
    chip: 'text-violet-400 bg-violet-500/10',
  },
  warning: {
    border: 'border-l-amber-500/60',
    bg: 'bg-amber-500/[0.04]',
    chip: 'text-amber-400 bg-amber-500/10',
  },
  neutral: {
    border: 'border-l-edge-strong',
    bg: 'bg-surface',
    chip: 'text-muted-foreground bg-surface-raised',
  },
} as const;

interface AiInsightCardProps {
  insight: ProductivityInsight;
  index?: number;
  compact?: boolean;
}

/**
 * AI-style insight card — headline message, category chip, optional detail.
 */
export function AiInsightCard({ insight, index = 0, compact = false }: AiInsightCardProps) {
  const styles = TYPE_STYLES[insight.type];
  const Icon = insight.icon;

  return (
    <article
      className={cn(
        'interactive-card rounded-lg border border-l-[3px] border-edge animate-fade-up',
        compact ? 'p-3.5' : 'p-4',
        styles.border,
        styles.bg,
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex gap-3">
        <div
          className={cn(
            'flex shrink-0 items-center justify-center rounded-lg bg-violet-500/10',
            compact ? 'size-8' : 'size-9',
          )}
        >
          <Brain size={compact ? 14 : 15} strokeWidth={1.8} className="text-violet-400" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-violet-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.06em] text-violet-400">
              <Sparkles size={9} />
              AI insight
            </span>
            <span
              className={cn(
                'rounded-md px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.05em]',
                styles.chip,
              )}
            >
              {insight.category}
            </span>
            {insight.estimated && (
              <span className="text-[9px] text-subtle">Estimated</span>
            )}
          </div>

          <p
            className={cn(
              'font-medium leading-snug tracking-[-0.015em] text-foreground',
              compact ? 'text-[12px]' : 'text-[13px]',
            )}
          >
            {insight.message}
          </p>

          {insight.detail && (
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              {insight.detail}
            </p>
          )}
        </div>

        <Icon
          size={14}
          strokeWidth={1.8}
          className="mt-1 shrink-0 text-subtle opacity-60"
          aria-hidden
        />
      </div>
    </article>
  );
}
