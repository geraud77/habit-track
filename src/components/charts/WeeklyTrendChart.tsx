import { useId, useState } from 'react';
import type { WeeklyTrendPoint } from '@/hooks/useAnalytics';
import { percentTicks, scaleLinear } from '@/lib/chartScale';
import { cn } from '@/lib/utils';

const W = 560;
const H = 160;
const PAD = { top: 16, right: 12, bottom: 28, left: 36 };
const INNER_W = W - PAD.left - PAD.right;
const INNER_H = H - PAD.top - PAD.bottom;

interface WeeklyTrendChartProps {
  data: WeeklyTrendPoint[];
}

export function WeeklyTrendChart({ data }: WeeklyTrendChartProps) {
  const gradientId = useId();
  const [hovered, setHovered] = useState<number | null>(null);

  if (data.length === 0) return null;

  const maxY = Math.max(100, ...data.map((d) => d.percent), 1);
  const ticks = percentTicks(maxY);
  const yMax = ticks[ticks.length - 1] ?? 100;

  const xAt = (i: number) =>
    PAD.left + (data.length <= 1 ? INNER_W / 2 : (i / (data.length - 1)) * INNER_W);
  const yAt = (v: number) => scaleLinear(v, [0, yMax], [PAD.top + INNER_H, PAD.top]);

  const linePoints = data.map((d, i) => `${xAt(i)},${yAt(d.percent)}`).join(' ');
  const areaPoints = [
    `${xAt(0)},${yAt(0)}`,
    ...data.map((d, i) => `${xAt(i)},${yAt(d.percent)}`),
    `${xAt(data.length - 1)},${yAt(0)}`,
  ].join(' ');

  const active = hovered !== null ? data[hovered] : null;

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto select-none"
        role="img"
        aria-label="Weekly completion trend over the last 12 weeks"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.60 0.20 293)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="oklch(0.60 0.20 293)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {ticks.map((tick) => {
          const y = yAt(tick);
          return (
            <g key={tick}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={y}
                y2={y}
                className="stroke-edge"
                strokeWidth={1}
              />
              <text
                x={PAD.left - 6}
                y={y + 3}
                textAnchor="end"
                className="fill-subtle text-[9px]"
                style={{ fontSize: 9 }}
              >
                {tick}%
              </text>
            </g>
          );
        })}

        {/* Area + line */}
        <polygon points={areaPoints} fill={`url(#${gradientId})`} />
        <polyline
          points={linePoints}
          fill="none"
          className="stroke-violet-500"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Points + hit targets */}
        {data.map((d, i) => (
          <g key={d.weekStart.toISOString()}>
            <circle
              cx={xAt(i)}
              cy={yAt(d.percent)}
              r={hovered === i ? 5 : 3.5}
              className={cn(
                'fill-violet-500 transition-all duration-150',
                hovered === i && 'stroke-background stroke-[2px]',
              )}
            />
            <rect
              x={xAt(i) - INNER_W / data.length / 2}
              y={PAD.top}
              width={INNER_W / data.length}
              height={INNER_H}
              fill="transparent"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          </g>
        ))}

        {/* X labels — show every other week if crowded */}
        {data.map((d, i) =>
          i % (data.length > 8 ? 2 : 1) === 0 || i === data.length - 1 ? (
            <text
              key={`lbl-${i}`}
              x={xAt(i)}
              y={H - 8}
              textAnchor="middle"
              className="fill-subtle"
              style={{ fontSize: 9 }}
            >
              {d.label}
            </text>
          ) : null,
        )}
      </svg>

      {active && (
        <div className="mt-2 flex items-center gap-3 text-[11px]">
          <span className="font-medium tabular-nums text-foreground">
            {active.percent}%
          </span>
          <span className="text-subtle">
            Week of {active.label} · {active.completed}/{active.possible} completions
          </span>
        </div>
      )}
    </div>
  );
}
