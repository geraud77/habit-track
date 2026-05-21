import { cn } from '@/lib/utils';

type MockVariant = 'dashboard' | 'analytics' | 'habits';

export function ProductMock({ variant }: { variant: MockVariant }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-edge bg-background shadow-2xl"
      aria-hidden
    >
      <div className="flex items-center gap-1.5 border-b border-edge bg-surface px-3 py-2">
        <span className="size-2 rounded-full bg-rose-400/80" />
        <span className="size-2 rounded-full bg-amber-400/80" />
        <span className="size-2 rounded-full bg-emerald-400/80" />
        <span className="ml-2 text-[10px] text-subtle">HabitFlow — {variant}</span>
      </div>

      <div className="flex min-h-[280px] sm:min-h-[320px]">
        <div className="hidden w-[52px] shrink-0 border-r border-edge bg-surface p-2 sm:block">
          {[40, 28, 28, 28, 28].map((h, i) => (
            <div
              key={i}
              className={cn(
                'mb-1.5 rounded-md',
                i === 0 ? 'bg-violet-500/25' : 'bg-surface-raised',
              )}
              style={{ height: h }}
            />
          ))}
        </div>

        <div className="flex-1 p-3 sm:p-4">
          {variant === 'dashboard' && <DashboardMock />}
          {variant === 'analytics' && <AnalyticsMock />}
          {variant === 'habits' && <HabitsMock />}
        </div>
      </div>
    </div>
  );
}

function DashboardMock() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="h-3 w-24 rounded bg-surface-raised" />
        <div className="h-6 w-6 rounded-full bg-violet-500/20" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {['72%', 'Focus', '8d'].map((label, i) => (
          <div key={label} className="rounded-lg border border-edge bg-surface p-2">
            <div
              className={cn(
                'text-[11px] font-semibold',
                i === 0 ? 'text-violet-400' : 'text-foreground',
              )}
            >
              {label}
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-surface-raised">
              <div
                className="h-full rounded-full bg-violet-500"
                style={{ width: i === 0 ? '72%' : i === 2 ? '80%' : '65%' }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-edge bg-surface p-2">
        <div className="mb-2 h-2 w-16 rounded bg-surface-raised" />
        <div className="flex items-end gap-1 h-14">
          {[40, 55, 35, 70, 60, 80, 45].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-violet-500/70"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-0.5">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'aspect-square rounded-[2px]',
              i % 3 === 0 ? 'bg-violet-500/50' : 'bg-surface-raised',
            )}
          />
        ))}
      </div>
    </div>
  );
}

function AnalyticsMock() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-2">
        {['142', '86%', '12', 'Wed'].map((v) => (
          <div key={v} className="rounded-lg border border-edge bg-surface px-2 py-1.5">
            <div className="text-[10px] font-semibold text-foreground">{v}</div>
            <div className="mt-0.5 h-1.5 w-8 rounded bg-surface-raised" />
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-edge bg-surface p-2">
        <div className="mb-2 flex gap-1">
          {['W1', 'W2', 'W3', 'W4'].map((w) => (
            <span key={w} className="text-[8px] text-subtle">
              {w}
            </span>
          ))}
        </div>
        <div className="flex items-end gap-1 h-16">
          {[30, 45, 55, 70, 50, 85, 75, 90].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-emerald-500/60"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: 35 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'aspect-square rounded-[2px]',
              [0, 1, 2, 7, 8, 14, 21].includes(i % 28)
                ? 'bg-emerald-500/45'
                : i % 5 === 0
                  ? 'bg-violet-500/35'
                  : 'bg-surface-raised',
            )}
          />
        ))}
      </div>
    </div>
  );
}

function HabitsMock() {
  const rows = [
    { name: 'Morning run', color: 'bg-violet-500', days: 5 },
    { name: 'Read 20 min', color: 'bg-emerald-500', days: 7 },
    { name: 'Meditate', color: 'bg-blue-500', days: 4 },
  ];
  return (
    <div className="space-y-2">
      <div className="h-8 rounded-lg border border-edge bg-surface px-2 flex items-center">
        <span className="text-[10px] text-subtle">Add a habit…</span>
      </div>
      {rows.map((row) => (
        <div
          key={row.name}
          className="flex items-center gap-2 rounded-lg border border-edge bg-surface px-2 py-2"
        >
          <span className={cn('size-2 rounded-full', row.color)} />
          <span className="flex-1 text-[10px] font-medium text-foreground">{row.name}</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'size-4 rounded',
                  i < row.days ? row.color : 'bg-surface-raised',
                )}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
