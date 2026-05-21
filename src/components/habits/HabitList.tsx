import { memo, useCallback, useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useHabits } from '@/context/useHabits';
import { HabitItem } from './HabitItem';
import { HabitsEmptyState } from '@/components/EmptyState';

interface HabitListProps {
  visibleDates: Date[];
}

function HabitListComponent({ visibleDates }: HabitListProps) {
  const { habits, reorderHabits } = useHabits();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const habitIds = useMemo(() => habits.map((h) => h.id), [habits]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (over && active.id !== over.id) {
        const oldIndex = habits.findIndex((h) => h.id === active.id);
        const newIndex = habits.findIndex((h) => h.id === over.id);
        reorderHabits(oldIndex, newIndex);
      }
    },
    [habits, reorderHabits],
  );

  if (habits.length === 0) return <HabitsEmptyState />;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={habitIds} strategy={verticalListSortingStrategy}>
        <section className="flex flex-col gap-2" aria-label="Habits list">
          {habits.map((habit, index) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              visibleDates={visibleDates}
              index={index}
            />
          ))}
        </section>
      </SortableContext>
    </DndContext>
  );
}

export const HabitList = memo(HabitListComponent);
