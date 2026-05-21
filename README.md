# ✦ Habit Tracker

**A full-featured daily habit tracker built with React 19 and TypeScript.**

Track habits with streaks, weekly analytics, drag-and-drop ordering, and dark/light mode — all stored in localStorage with no backend required.

> Built as a portfolio project to demonstrate real-world React patterns: custom hooks, context architecture, accessible drag-and-drop, and production-grade TypeScript.

---

## ⚡ Features

| Feature                    | Details                                                      |
| -------------------------- | ------------------------------------------------------------ |
| **Weekly habit grid**      | Toggle completions for each day. Navigate to past weeks.     |
| **Streak tracking**        | Flame badge shows your current consecutive streak per habit  |
| **Analytics dashboard**    | Today's rate, 7-day bar chart, best streak — all live        |
| **Color-coded habits**     | 6 accent colors with glow effects on completion              |
| **Drag-and-drop ordering** | Reorder habits with mouse or keyboard (`@dnd-kit`)           |
| **Dark / Light mode**      | System preference detection, no flash of wrong theme         |
| **Completion celebration** | Toast fires the moment you complete every habit for the day  |
| **Keyboard shortcut**      | Press `/` to instantly focus the add-habit input             |
| **Persistent storage**     | All data survives page reloads (localStorage + date revival) |

---

## 🛠 Tech Stack

|                   | Tech                | Why I chose it                                      |
| ----------------- | ------------------- | --------------------------------------------------- |
| **Framework**     | React 19            | Wanted to use the new compiler + context API syntax |
| **Language**      | TypeScript (strict) | Catches real bugs; `noUnusedLocals` enforced        |
| **Styling**       | Tailwind CSS v4     | CSS-first config, OKLCH perceptual color system     |
| **UI Primitives** | Base UI (headless)  | Accessible, unstyled — I control all the visuals    |
| **Drag-and-drop** | @dnd-kit            | The accessible choice used by Linear and Vercel     |
| **Icons**         | Lucide React        | Tree-shakeable, consistent stroke weight            |
| **Dates**         | date-fns            | Immutable, tree-shakeable, no moment.js baggage     |
| **Build**         | Vite 8 + Rolldown   | Sub-second HMR, Babel React Compiler preset         |

---

## 🏗 Architecture

```
src/
├── types/
│   └── habit.ts            # Centralized types + color token map
├── context/
│   ├── habitProvider.tsx   # All CRUD: useCallback + useMemo for stable refs
│   ├── useHabits.tsx       # Context consumer hook with null guard
│   └── toastContext.tsx    # Custom toast system (no library needed)
├── hooks/
│   ├── useHabitStats.ts    # Derived analytics — extracted custom hook
│   ├── useLocalStorage.ts  # Generic typed persistence with ISO date revival
│   └── useTheme.ts         # Dark/light mode, system preference, FOUC-safe
├── lib/
│   ├── habits.ts           # Pure utility: getStreak (shared across components)
│   ├── sampleData.ts       # Realistic demo data for first-time load
│   └── utils.ts            # cn() helper (clsx + tailwind-merge)
└── components/
    ├── ErrorBoundary.tsx   # Catches render errors — no more white screens
    ├── StatsPanel.tsx      # Uses useHabitStats hook + celebration logic
    ├── habitItem.tsx       # useSortable, accessible day buttons, streak badge
    ├── habitList.tsx       # DnD context wrapper + empty state
    ├── habitForm.tsx       # Controlled input, color picker, keyboard hint
    ├── header.tsx          # Progress strip, theme toggle, week navigation
    ├── EmptyState.tsx      # First-run fallback
    └── ToastContainer.tsx  # Fixed-position notification stack
```

---

## 💡 What I Learned / Engineering Decisions

### Custom hook extraction (`useHabitStats`)

The analytics computation (today's rate, 7-day chart, best streak) started inline inside `StatsPanel`. I extracted it into `useHabitStats` so the component stays focused on rendering and the logic becomes independently testable. This also lets any other component consume the same stats without prop drilling.

### Streak calculation edge case

The streak counter walks backwards from _today_ — not from the most recent completion. This means the streak resets to 0 if today isn't marked yet, even if you have a 30-day run. That's the intentional, motivating behavior: it creates urgency to complete today.

### DnD + click disambiguation

Without `{ activationConstraint: { distance: 6 } }` on the pointer sensor, clicking a day-completion button would sometimes start a drag. The 6px constraint lets React know "the user intended to click, not drag."

### FOUC prevention

The theme toggle persists to localStorage. An inline `<script>` in `index.html` reads localStorage _before_ React mounts and sets `class="dark"` on `<html>`. Without it, there's a flash of light mode on first load for dark-mode users.

### Custom toast vs. a library

The whole toast system is ~55 lines. It uses `useRef<Map<string, ReturnType<typeof setTimeout>>>` to track timer IDs, so manually dismissing a toast correctly cancels its auto-dismiss timer. No cleanup leak. No 30KB dependency.

### localStorage schema migration

The key changed from `habits` → `habits-v2` when the `Habit` type gained `color` and `createdAt`. Old data stays untouched, new users get the correct schema. Proper migration would parse a `version` field — noted in future improvements.

---

## 🚀 Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/habit-tracker
cd habit-tracker
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Sample habits load automatically on first visit.

---

## 🔮 What I'd Build Next

- [ ] **Monthly heatmap** — GitHub-style contribution graph showing completion density
- [ ] **Backend sync** — tRPC + Prisma, optimistic updates with TanStack Query
- [ ] **Web Notifications API** — browser reminders at a user-set time
- [ ] **PWA support** — service worker for offline-first, installable on mobile
- [ ] **Data export** — download all habit history as CSV or JSON
- [ ] **Habit categories** — group by Morning Routine, Health, Work, etc.

---
