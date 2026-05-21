# HabitFlow — Frontend Architecture

## Principles

- **Colocate by feature**, share only what repeats twice or more
- **TypeScript everywhere** — domain types in `types/`, no implicit `any`
- **Stable context callbacks** — `useCallback` + `useMemo` on provider values to limit re-renders
- **Memo list rows** — habit items only re-render when their own data changes
- **Lazy routes** — each main view is code-split via `React.lazy`

## Folder layout

```
src/
├── config/          # App-wide constants (navigation, view registry)
├── context/         # React context providers (habits, nav, theme, …)
├── hooks/           # Stateful logic reused across views
├── lib/             # Pure functions (habits, insights, export)
├── types/           # Shared TypeScript types
├── views/           # Route-level screens (one per app section)
├── pages/           # Full-page flows outside the shell (landing)
├── components/
│   ├── habits/      # HabitForm, HabitList, HabitItem
│   ├── layout/      # NavLinkButton, shell helpers
│   ├── ui/          # Generic UI (Panel, Button, Skeleton)
│   ├── settings/    # SettingsSection, SettingsRow
│   ├── charts/      # Chart primitives
│   ├── dashboard/   # Dashboard-only widgets
│   ├── landing/     # Marketing page sections
│   └── …            # App chrome (Sidebar, TopBar, CommandPalette)
└── main.tsx         # Provider tree + mount
```

## Data flow

1. **HabitProvider** owns habit state (localStorage via `useLocalStorage`)
2. **Views** read data through hooks (`useHabits`, `useAnalytics`, `useDashboardMetrics`)
3. **Actions** flow up through context methods (`addHabit`, `toggleHabitCompletion`, …)
4. **Navigation** is client-side view state (`NavProvider`), not URL-based — intentional for a portfolio SPA

## Performance notes

| Technique | Where |
|-----------|--------|
| `memo(HabitItem)` | Skips re-render when sibling habits update |
| `memo(HabitList)` | Stable list wrapper |
| `useMemo` habit IDs | DnD `SortableContext` items array |
| Lazy `ViewRenderer` | Loads view chunks on first visit |
| Functional `setState` in deletes | Avoids stale closures / extra deps |

## Marketing vs product shell

- **Landing** (`mode === 'landing'`): document scroll enabled; long marketing page
- **App** (`useScrollLock(true)`): `html/body` locked; `AppShell` main area scrolls internally
- Set via `App.tsx` from `appModeContext` — avoids fighting `overflow: hidden` on the homepage

## Adding a new view

1. Add id to `View` in `config/navigation.ts` and `VIEW_ORDER`
2. Create `views/MyView.tsx` and export a named component
3. Register lazy import in `config/views.tsx`
4. Add nav entry to `PRIMARY_NAV` or `SETTINGS_NAV` if needed
