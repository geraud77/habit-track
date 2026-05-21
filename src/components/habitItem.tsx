import { Button } from "./ui/button";
import { format, isFuture, isSameDay, subDays } from "date-fns";

import { useHabits } from "@/context/useHabits";
import type { Habit } from "@/context/habitProvider";

// this interface will define the props for the habit item
interface HabitItemProps {
  habit: Habit;
  visibleDates: Date[];
}

function HabitItem({ habit, visibleDates }: HabitItemProps) {
  const { deleteHabit, toggleHabitCompletion } = useHabits();

  const streak = getStreak(habit.completions);
  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span>{habit.name}</span>
          {streak !== 0 && <span className="text-amber-400">🔥{streak}</span>}
        </div>
        <div>
          <Button
            variant="destructive"
            className="text-sm"
            onClick={() => deleteHabit(habit.id)}
          >
            Delete
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {visibleDates.map((date) => (
          <Button
            size="icon-lg"
            disabled={isFuture(date)}
            onClick={() => toggleHabitCompletion(habit.id, date)}
            key={date.toISOString()}
            variant={
              habit.completions.some((d) => isSameDay(date, d))
                ? "purple"
                : "default"
            }
            className="flex flex-1 items-center flex-col text-xs rounded-lg gap-0.5"
          >
            <span>{format(date, "EEE")}</span>
            <p>{format(date, "d")}</p>
          </Button>
        ))}
      </div>
    </section>
  );
}

// this function will get the streak of a habit
function getStreak(completions: Date[]) {
  let streak = 0;
  let date = new Date();
  while (completions.some((d) => isSameDay(d, date))) {
    streak++;
    date = subDays(date, 1);
  }
  return streak;
}

export default HabitItem;
