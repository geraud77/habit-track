import { subDays } from 'date-fns';
import type { Habit } from '@/types/habit';

function daysAgo(n: number): Date {
  return subDays(new Date(), n);
}

export const sampleHabits: Habit[] = [
  {
    id: 'sample-1',
    name: 'Morning Meditation',
    color: 'violet',
    createdAt: daysAgo(30),
    completions: [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 13, 14, 15].map(daysAgo),
  },
  {
    id: 'sample-2',
    name: 'Exercise',
    color: 'emerald',
    createdAt: daysAgo(30),
    completions: [0, 1, 3, 4, 6, 8, 10, 11, 13, 15, 17].map(daysAgo),
  },
  {
    id: 'sample-3',
    name: 'Read for 30 Minutes',
    color: 'blue',
    createdAt: daysAgo(20),
    completions: [1, 2, 4, 5, 7, 9, 12].map(daysAgo),
  },
  {
    id: 'sample-4',
    name: 'No Sugar',
    color: 'rose',
    createdAt: daysAgo(14),
    completions: [0, 1, 2, 3, 5, 6].map(daysAgo),
  },
  {
    id: 'sample-5',
    name: 'Drink 8 Glasses of Water',
    color: 'cyan',
    createdAt: daysAgo(25),
    completions: [0, 2, 3, 4, 6, 7, 9, 11, 14].map(daysAgo),
  },
];
