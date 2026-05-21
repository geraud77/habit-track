import { Card } from "./ui/card";
import HabitItem from "./habitItem";
import { useHabits } from "@/context/useHabits";

interface HabitListProps {
  visibleDates: Date[];
}

function HabitList({ visibleDates }: HabitListProps) {
  const { habits } = useHabits();
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
          <HabitItem key={habit.id} habit={habit} visibleDates={visibleDates} />
        </Card>
      ))}
    </section>
  );
}

export default HabitList;
