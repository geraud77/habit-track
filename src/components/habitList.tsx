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
import HabitItem from './habitItem';
import { EmptyState } from './EmptyState';

interface HabitListProps {
  visibleDates: Date[];
}

export default function HabitList({ visibleDates }: HabitListProps) {
  const { habits, reorderHabits } = useHabits();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = habits.findIndex((h) => h.id === active.id);
      const newIndex = habits.findIndex((h) => h.id === over.id);
      reorderHabits(oldIndex, newIndex);
    }
  }

  if (habits.length === 0) return <EmptyState />;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={habits.map((h) => h.id)}
        strategy={verticalListSortingStrategy}
      >
        <section className="flex flex-col gap-2" aria-label="Habits list">
          {habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              visibleDates={visibleDates}
            />
          ))}
        </section>
      </SortableContext>
    </DndContext>
  );
}
