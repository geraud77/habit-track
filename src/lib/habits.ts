import { isSameDay, subDays } from 'date-fns';

/**
 * Counts the number of consecutive days ending today where the habit
 * was completed. Returns 0 if today is not yet completed.
 */
export function getStreak(completions: Date[]): number {
  let streak = 0;
  let cursor = new Date();
  while (completions.some((d) => isSameDay(d, cursor))) {
    streak++;
    cursor = subDays(cursor, 1);
  }
  return streak;
}
