import Header from "./components/header";
import HabitForm from "./components/habitForm";
import HabitList from "./components/habitList";
import { useState } from "react";
import HabitProvider from "./context/habitProvider";
import { addWeeks, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
function App() {
  const [weekOffset, setWeekOffset] = useState(0);
  const week = addWeeks(new Date(), weekOffset);
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(week, { weekStartsOn: 1 }),
    end: endOfWeek(week, { weekStartsOn: 1 }),
  });
  return (
    <HabitProvider>
      <main className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
        <Header
          visibleDates={visibleDates}
          onPrev={() => setWeekOffset(weekOffset - 1)}
          onNext={() => setWeekOffset(weekOffset + 1)}
        />
        <HabitForm />
        <HabitList visibleDates={visibleDates} />
      </main>
    </HabitProvider>
  );
}

export default App;
