import { format } from 'date-fns';
import type { Habit } from '@/types/habit';

export function exportHabitsJson(habits: Habit[]) {
  const blob = new Blob([JSON.stringify(habits, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `habits-${format(new Date(), 'yyyy-MM-dd')}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}
