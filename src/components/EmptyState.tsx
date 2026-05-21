import { cn } from '@/lib/utils';

export function EmptyState() {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4',
        'rounded-2xl border border-dashed py-14 px-6 text-center',
        'border-edge',
      )}
    >
      <div className="flex size-12 items-center justify-center rounded-xl bg-surface-raised ring-1 ring-edge-strong">
        <span className="text-xl leading-none select-none text-muted-foreground">✦</span>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-[14px] font-medium tracking-[-0.01em] text-foreground">
          No habits yet
        </h3>
        <p className="max-w-[260px] text-[13px] leading-relaxed text-muted-foreground">
          Add your first habit above to start building your daily routine.
        </p>
      </div>
    </div>
  );
}
