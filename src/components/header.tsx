import { Button } from "./ui/button";

function Header() {
  return (
    <header className="flex justify-between items-center ">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Habit Tracker</h1>
        <p className="text-sm text-zinc-400">1/1 done today</p>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <h4 className="text-sm text-zinc-400">
          {new Date().toLocaleDateString()}
        </h4>
        <div className="flex gap-2">
          <Button variant="purple">PREV</Button>
          <Button variant="purple">NEXT</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
