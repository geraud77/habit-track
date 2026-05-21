import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState, type SubmitEvent } from "react";
import { useHabits } from "@/context/useHabits";

// this interface will define the props for the habit form

// this component will render the habit form
function HabitForm() {
  const [name, setName] = useState("");
  const { addHabit } = useHabits();

  // this function will handle the submission of the form
  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!name) return;
    setName("");
    addHabit(name);
    console.log(name);
  }
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder=" New Habit...💪"
        className="border-none bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      />
      <Button disabled={!name} type="submit" variant="purple">
        Add Habit
      </Button>
    </form>
  );
}

export default HabitForm;
