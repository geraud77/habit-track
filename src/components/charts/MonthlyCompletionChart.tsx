import { useState } from 'react';
import type { MonthlyPoint } from '@/hooks/useAnalytics';
import { percentTicks, scaleLinear } from '@/lib/chartScale';
import { cn } from '@/lib/utils';

const W = 480;
const H = 180;
const PAD = { top: 16, right: 8, bottom: 32, left: 36 };
const INNER_W = W - PAD.left - PAD.right;
const INNER_H = H - PAD.top - PAD.bottom;
const BAR_GAP = 12;

interface MonthlyCompletionChartProps {
  data: MonthlyPoint[];
}

export function MonthlyCompletionChart({ data }: MonthlyCompletionChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (data.length === 0) return null;

  const maxY = Math.max(100, ...data.map((d) => d.percent), 1);
  const ticks = percentTicks(maxY);
  const yMax = ticks[ticks.length - 1] ?? 100;

  const barWidth = (INNER_W - BAR_GAP * (data.length - 1)) / data.length;
  const yAt = (v: number) => scaleLinear(v, [0, yMax], [PAD.top + INNER_H, PAD.top]);

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto select-none"
        role="img"
        aria-label="Monthly completion rate over the last six months"
      >
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
                className="fill-subtle"
                style={{ fontSize: 9 }}
              >
                {tick}%
              </text>
            </g>
          );
        })}

        {data.map((d, i) => {
          const x = PAD.left + i * (barWidth + BAR_GAP);
          const barH = PAD.top + INNER_H - yAt(d.percent);
          const y = yAt(d.percent);
          const isHover = hovered === i;

          return (
            <g
              key={d.monthStart.toISOString()}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                rx={3}
                className={cn(
                  'transition-all duration-300 ease-out',
                  isHover ? 'fill-violet-500' : 'fill-violet-500/55',
                )}
              />
              <text
                x={x + barWidth / 2}
                y={H - 10}
                textAnchor="middle"
                className="fill-subtle"
                style={{ fontSize: 10 }}
              >
                {d.label}
              </text>
              {isHover && (
                <text
                  x={x + barWidth / 2}
                  y={y - 6}
                  textAnchor="middle"
                  className="fill-foreground font-medium"
                  style={{ fontSize: 10 }}
                >
                  {d.percent}%
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {hovered !== null && data[hovered] && (
        <p className="mt-2 text-[11px] text-subtle">
          <span className="font-medium text-foreground">{data[hovered].label}</span>
          {' — '}
          {data[hovered].completed} of {data[hovered].possible} habit-days completed
        </p>
      )}
    </div>
  );
}
