import { format, isToday } from "date-fns";
import { Button } from "./ui/button";
import { useHabits } from "@/context/useHabits";

interface HeaderProps {
  visibleDates: Date[];
  onPrev: () => void;
  onNext: () => void;
}
function Header({ visibleDates, onPrev, onNext }: HeaderProps) {
  const { habits } = useHabits();
  const doneToday = habits.filter((habit) =>
    habit.completions.some((completion) => isToday(completion)),
  ).length;

  const dateRange = `${format(visibleDates[0], "MMM d")} - ${format(visibleDates[visibleDates.length - 1], "MMM d")}`;
  return (
    <header className="flex justify-between items-center ">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <p className="text-sm text-zinc-400">
          {doneToday}/{habits.length} done today
        </p>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <h4 className="text-sm text-zinc-400">{dateRange}</h4>
        <div className="flex gap-2">
          <Button variant="purple" onClick={onPrev}>
            PREV
          </Button>
          <Button
            variant="purple"
            onClick={onNext}
            disabled={visibleDates.some((date) => isToday(date))}
          >
            NEXT
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
