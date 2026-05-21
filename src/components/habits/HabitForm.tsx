import { useRef, useState, type FormEvent, type RefObject } from 'react';
import { Plus } from 'lucide-react';
import { useHabits } from '@/context/useHabits';
import { HABIT_COLORS, COLOR_MAP, type HabitColor } from '@/types/habit';
import { cn } from '@/lib/utils';

export interface HabitFormProps {
  inputRef?: RefObject<HTMLInputElement | null>;
  variant?: 'default' | 'onboarding';
  onHabitAdded?: () => void;
}

export function HabitForm({
  inputRef,
  variant = 'default',
  onHabitAdded,
}: HabitFormProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState<HabitColor>('violet');
  const { addHabit } = useHabits();
  const localRef = useRef<HTMLInputElement>(null);
  const activeRef = inputRef ?? localRef;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    addHabit(trimmed, color);
    setName('');
    setColor(HABIT_COLORS[(HABIT_COLORS.indexOf(color) + 1) % HABIT_COLORS.length]);
    if (variant === 'onboarding') {
      onHabitAdded?.();
    } else {
      activeRef.current?.focus();
    }
  }

  const isOnboarding = variant === 'onboarding';

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'rounded-xl border shadow-card transition-all duration-200',
        'border-edge bg-surface',
        'focus-within:border-edge-strong focus-within:bg-surface-raised',
      )}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <input
          ref={activeRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder={
            isOnboarding ? 'e.g. Drink water, Read, Exercise…' : 'Add a new habit…'
          }
          maxLength={60}
          autoComplete="off"
          aria-label="New habit name"
          className={cn(
            'min-w-0 flex-1 bg-transparent outline-none',
            'text-[14px] tracking-[-0.01em] text-foreground',
            'placeholder:text-subtle',
          )}
        />
        <button
          type="submit"
          disabled={!name.trim()}
          aria-label="Add habit"
          className={cn(
            'flex size-7 shrink-0 items-center justify-center rounded-lg',
            'bg-violet-600 text-white transition-all duration-150',
            'hover:bg-violet-500 active:scale-90',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60',
            'disabled:cursor-not-allowed disabled:opacity-25',
          )}
        >
          <Plus size={14} />
        </button>
      </div>

      <div className="mx-4 h-px bg-edge" />

      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.07em] text-subtle">
            Color
          </span>
          <div className="flex items-center gap-1.5">
            {HABIT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                aria-label={`Select ${c} color`}
                aria-pressed={color === c}
                className={cn(
                  'size-[14px] rounded-full transition-all duration-150',
                  COLOR_MAP[c].dot,
                  color === c
                    ? 'scale-[1.35] ring-2 ring-foreground/20'
                    : 'opacity-35 hover:opacity-65 hover:scale-110',
                )}
              />
            ))}
          </div>
        </div>

        {!isOnboarding && (
          <p className="text-[11px] text-subtle select-none">
            Press{' '}
            <kbd className="rounded border border-edge-strong bg-surface px-1 py-0.5 font-mono text-[10px] text-muted-foreground">
              /
            </kbd>{' '}
            to focus
          </p>
        )}
      </div>
    </form>
  );
}
