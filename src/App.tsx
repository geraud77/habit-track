import { useEffect, useRef, useState } from 'react';
import { addWeeks, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import Header from './components/header';
import HabitForm from './components/habitForm';
import HabitList from './components/habitList';
import { StatsPanel } from './components/StatsPanel';
import { ToastContainer } from './components/ToastContainer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const [weekOffset, setWeekOffset] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const formInputRef = useRef<HTMLInputElement | null>(null);

  const week = addWeeks(new Date(), weekOffset);
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(week, { weekStartsOn: 1 }),
    end: endOfWeek(week, { weekStartsOn: 1 }),
  });

  // Press "/" anywhere (outside an input) to focus the add-habit field.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (
        e.key === '/' &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        formInputRef.current?.focus();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-5 px-4 py-8 sm:px-6 sm:py-10">
      <ErrorBoundary>
        <Header
          visibleDates={visibleDates}
          onPrev={() => setWeekOffset((o) => o - 1)}
          onNext={() => setWeekOffset((o) => o + 1)}
          onGoToToday={() => setWeekOffset(0)}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <StatsPanel />
        <HabitForm inputRef={formInputRef} />
        <HabitList visibleDates={visibleDates} />
      </ErrorBoundary>
      <ToastContainer />
    </main>
  );
}
