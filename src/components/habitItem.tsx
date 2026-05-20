import { Button } from "./ui/button";
import { endOfWeek, format, isFuture, startOfWeek } from "date-fns";
import { eachDayOfInterval } from "date-fns";
import type { Habit } from "./habitList";

interface HabitItemProps {
  habit: Habit;
  deleteHabit: (id: string) => void;
}

function HabitItem({ habit, deleteHabit }: HabitItemProps) {
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });
  return (
    <section className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span>{habit.name}</span>
          <span className="text-amber-400">🔥2</span>
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
            key={date.toISOString()}
            variant="purple"
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

export default HabitItem;
