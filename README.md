# HabitFlow

**A portfolio-grade habit tracker that looks and feels like a funded SaaS product.**

HabitFlow combines a Product Hunt–style marketing homepage with a polished in-app experience: dashboard, analytics, AI-style insights, calendar, command palette, and full keyboard shortcuts — all built with React 19, TypeScript, and Tailwind CSS v4. Data stays on-device via localStorage; no backend required.

---

## Live preview

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

- **First visit** → scrollable marketing homepage (hero, product showcase, pricing, testimonials)
- **Get started** or **Live demo** → enters the app (onboarding on first run; demo loads sample habits)
- **Settings → View homepage** → return to the landing page for portfolio demos

```bash
npm run build    # production build
npm run preview  # preview production build
npm run lint     # ESLint
```

---

## Highlights

| Area | What you get |
|------|----------------|
| **Marketing site** | Hero, product screenshots, features, testimonials, pricing, footer — natural page scroll |
| **Dashboard** | Daily progress ring, focus/consistency scores, weekly chart, mini heatmap, AI insights, today’s habits |
| **Habits** | Weekly grid, streak badges, drag-and-drop reorder, color picker, `/` to focus add-habit |
| **Analytics** | Weekly trend, monthly completion, consistency heatmap, streak analytics |
| **Insights** | Data-driven natural-language tips from real completion patterns |
| **Calendar** | Month view with completion indicators |
| **Command palette** | `⌘K` / `Ctrl+K` — search pages, habits, and actions (Linear-style) |
| **Accessibility** | Skip link, focus rings, ARIA on nav and palette, reduced-motion support |
| **Theme** | Dark/light mode, FOUC-safe, synced `theme-color` meta |

---

## Tech stack

| Layer | Choice |
|-------|--------|
| UI | React 19, TypeScript (strict), React Compiler (Babel) |
| Styling | Tailwind CSS v4, OKLCH tokens, Inter Variable |
| Primitives | Base UI, shadcn-style patterns |
| DnD | `@dnd-kit` (pointer + keyboard) |
| Dates | `date-fns` |
| Build | Vite 8 |
| Icons | Lucide React |

---

## App views

```
Landing → Onboarding (first run) → App shell
                                      ├── Dashboard
                                      ├── Habits
                                      ├── Analytics
                                      ├── Insights
                                      ├── Calendar
                                      └── Settings
```

---

## Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open command palette |
| `⌘⇧L` / `Ctrl+Shift+L` | Toggle dark / light mode |
| `/` | Go to Habits and focus add-habit input |
| `?` | Show all shortcuts |
| `Esc` | Close palette / dialogs |

---

## Project structure

```
src/
├── config/           # Navigation + lazy view registry
├── context/          # Habits, nav, theme, toast, onboarding, app mode, command palette
├── hooks/            # Analytics, stats, keyboard, scroll lock, command items, …
├── lib/              # Pure logic (habits, insights, export, shortcuts)
├── types/            # Habit types + color tokens
├── pages/            # LandingPage
├── views/            # Route-level screens (code-split)
└── components/
    ├── habits/       # HabitForm, HabitList, HabitItem (memoized)
    ├── landing/      # Marketing sections
    ├── layout/       # NavLinkButton, shell helpers
    ├── charts/       # Analytics charts
    ├── dashboard/    # Dashboard widgets
    ├── settings/     # Settings UI primitives
    └── ui/           # Panel, SectionHeader, Button, Skeleton, …
```

See [`src/ARCHITECTURE.md`](src/ARCHITECTURE.md) for data flow, performance notes, and how to add a new view.

---

## Engineering notes

**Scroll modes** — Marketing pages use document scroll; the app shell locks `html/body` and scrolls inside `#main-content` (`useScrollLock`).

**Performance** — Views are lazy-loaded; `HabitItem` / `HabitList` are memoized; habit context uses stable `useCallback` / `useMemo` values.

**Persistence** — `habits-v2` in localStorage with ISO date revival; `habitflow-onboarding-v1` and `habitflow-app-mode` for onboarding and landing vs app entry.

**Insights** — Generated from completion history in `lib/insights.ts` (best day, weekend patterns, timing heuristics where data allows).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Typecheck + production build |
| `npm run preview` | Serve production build |
| `npm run lint` | Run ESLint |

---

## Roadmap

- [ ] Backend sync (tRPC / Supabase) with optimistic updates
- [ ] PWA + push reminders
- [ ] Habit categories / tags
- [ ] Shared team challenges (Team tier on landing is conceptual)

---

## License

MIT — use freely for learning and portfolio work.
