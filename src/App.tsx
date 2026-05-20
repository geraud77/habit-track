import Header from "./components/header";
import HabitForm from "./components/habitForm";
import HabitList from "./components/habitList";
import { useState } from "react";
import type { Habit } from "./components/habitList";
function App() {
  const [habits, setHabits] = useState<Habit[]>([]);

  function addHabit(name: string) {
    setHabits((current) => [...current, { id: crypto.randomUUID(), name }]);
  }

  function deleteHabit(id: string) {
    setHabits((current) => current.filter((habit) => habit.id !== id));
  }

  return (
    <main className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header />
      <HabitForm addHabit={addHabit} />
      <HabitList habits={habits} deleteHabit={deleteHabit} />
    </main>
  );
}

export default App;
