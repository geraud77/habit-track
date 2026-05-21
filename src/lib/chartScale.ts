/** Maps a value from [d0,d1] to [r0,r1]. Clamps to range ends. */
export function scaleLinear(
  value: number,
  domain: [number, number],
  range: [number, number],
): number {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  if (d1 === d0) return (r0 + r1) / 2;
  const t = Math.max(0, Math.min(1, (value - d0) / (d1 - d0)));
  return r0 + t * (r1 - r0);
}

/** Nice Y-axis ticks from 0 to max (always includes 0 and 100 cap for percentages). */
export function percentTicks(maxValue: number): number[] {
  const max = Math.min(100, Math.max(maxValue, 10));
  const step = max <= 25 ? 5 : max <= 50 ? 10 : 25;
  const ticks: number[] = [];
  for (let v = 0; v <= max; v += step) ticks.push(v);
  if (ticks[ticks.length - 1] < 100 && max >= 75) ticks.push(100);
  return ticks;
}
