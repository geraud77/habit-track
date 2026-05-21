import { useEffect, useMemo, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { useCommandPalette } from '@/context/commandPaletteContext';
import {
  COMMAND_SECTION_LABELS,
  matchesCommandQuery,
  useCommandItems,
  type CommandItem,
} from '@/hooks/useCommandItems';
import { GLOBAL_SHORTCUTS, MOD, PALETTE_SHORTCUTS } from '@/lib/shortcuts';
import { cn } from '@/lib/utils';

export function CommandPalette() {
  const { isOpen, showShortcuts, close, exitShortcuts, openShortcuts } =
    useCommandPalette();
  const allItems = useCommandItems();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const flatFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((item) => matchesCommandQuery(item, q));
  }, [allItems, query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSelectedIndex(0);
      return;
    }
    const t = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen || showShortcuts) return;
    const el = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex, isOpen, showShortcuts]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (showShortcuts) {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => (flatFiltered.length ? (i + 1) % flatFiltered.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) =>
        flatFiltered.length ? (i - 1 + flatFiltered.length) % flatFiltered.length : 0,
      );
    } else if (e.key === 'Enter' && flatFiltered[selectedIndex]) {
      e.preventDefault();
      flatFiltered[selectedIndex].onSelect();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[12vh] sm:pt-[15vh]"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" aria-hidden />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={showShortcuts ? 'Keyboard shortcuts' : 'Command palette'}
        className={cn(
          'relative w-full max-w-lg overflow-hidden rounded-xl border border-edge',
          'bg-surface shadow-2xl animate-fade-up',
        )}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-edge px-4">
          <Search size={16} className="shrink-0 text-subtle" aria-hidden />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={showShortcuts ? 'Shortcuts' : 'Search habits, pages, actions…'}
            aria-label="Search commands"
            autoComplete="off"
            spellCheck={false}
            readOnly={showShortcuts}
            className={cn(
              'h-12 flex-1 bg-transparent text-[14px] text-foreground outline-none',
              'placeholder:text-subtle',
            )}
          />
          <kbd className="hidden rounded border border-edge bg-background px-1.5 py-0.5 text-[10px] font-medium text-subtle sm:inline">
            esc
          </kbd>
        </div>

        {showShortcuts ? (
          <div className="max-h-[min(60vh,400px)] overflow-y-auto p-4">
            <p className="mb-3 text-[12px] text-subtle">
              Keyboard shortcuts for HabitFlow
            </p>
            <div className="space-y-4">
              <ShortcutGroup title="Global" items={GLOBAL_SHORTCUTS} />
              <ShortcutGroup title="Command palette" items={PALETTE_SHORTCUTS} />
            </div>
          </div>
        ) : (
          <CommandResults
            listRef={listRef}
            items={flatFiltered}
            query={query}
            selectedIndex={selectedIndex}
            onSelectIndex={setSelectedIndex}
          />
        )}

        <div className="flex items-center justify-between border-t border-edge px-4 py-2 text-[10px] text-subtle">
          <span className="flex items-center gap-3">
            <span>
              <kbd className="rounded border border-edge px-1">{MOD}K</kbd> palette
            </span>
            <span>
              <kbd className="rounded border border-edge px-1">?</kbd> shortcuts
            </span>
          </span>
          {showShortcuts ? (
            <button type="button" onClick={exitShortcuts} className="hover:text-foreground">
              Back to search
            </button>
          ) : (
            <button type="button" onClick={openShortcuts} className="hover:text-foreground">
              All shortcuts
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CommandResults({
  listRef,
  items,
  query,
  selectedIndex,
  onSelectIndex,
}: {
  listRef: React.RefObject<HTMLDivElement | null>;
  items: CommandItem[];
  query: string;
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
}) {
  return (
    <div
      ref={listRef}
      role="listbox"
      aria-label="Command results"
      className="max-h-[min(50vh,360px)] overflow-y-auto p-2"
    >
      {items.length === 0 ? (
        <p className="px-3 py-8 text-center text-[13px] text-subtle">
          No results for “{query}”
        </p>
      ) : (
        <ul>
          {items.map((item, idx) => {
            const showHeader = idx === 0 || items[idx - 1].section !== item.section;
            const selected = idx === selectedIndex;
            const Icon = item.icon;
            return (
              <li key={item.id} role="presentation">
                {showHeader && (
                  <p className="label px-2 py-1.5">{COMMAND_SECTION_LABELS[item.section]}</p>
                )}
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  data-index={idx}
                  onMouseEnter={() => onSelectIndex(idx)}
                  onClick={() => item.onSelect()}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left',
                    'transition-colors duration-100',
                    selected
                      ? 'bg-violet-500/15 text-foreground'
                      : 'text-foreground hover:bg-surface-raised',
                  )}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.75}
                    className={cn('shrink-0', selected ? 'text-violet-400' : 'text-subtle')}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
                    {item.label}
                  </span>
                  {item.hint && (
                    <span className="shrink-0 text-[11px] text-subtle">{item.hint}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function ShortcutGroup({
  title,
  items,
}: {
  title: string;
  items: { keys: string; label: string }[];
}) {
  return (
    <div>
      <p className="label mb-2">{title}</p>
      <ul className="space-y-1.5">
        {items.map((s) => (
          <li
            key={s.keys + s.label}
            className="flex items-center justify-between gap-4 rounded-lg px-2 py-1.5"
          >
            <span className="text-[13px] text-foreground">{s.label}</span>
            <kbd className="shrink-0 rounded border border-edge bg-background px-2 py-0.5 font-mono text-[11px] text-subtle">
              {s.keys}
            </kbd>
          </li>
        ))}
      </ul>
    </div>
  );
}
