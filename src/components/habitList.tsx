import { Card } from "./ui/card";
import HabitItem from "./habitItem";

export interface Habit {
  id: string;
  name: string;
}
interface HabitListProps {
  habits: Habit[];
  deleteHabit: (id: string) => void;
}

function HabitList({ habits, deleteHabit }: HabitListProps) {
  if (habits.length === 0) {
    return (
      <p className="text-center text-zinc-500 py-12">
        No habits yet. Add one above to get started!
      </p>
    );
  }
  return (
    <section className="flex flex-col gap-4">
      {habits.map((habit) => (
        <Card key={habit.id} className="bg-zinc-800 text-zinc-100 p-4">
          <HabitItem key={habit.id} habit={habit} deleteHabit={deleteHabit} />
        </Card>
      ))}
    </section>
  );
}

export default HabitList;
