# React/Next.js Visualization Learning Platform — Handoff

Last updated: 2026-05-10

## 1. Project summary

React/Next.js Visualization Learning Platform is a polished interactive learning app that helps beginners understand invisible frontend concepts through visualizers, timelines, route maps, quizzes, playground tasks, mistake simulations, and beginner-friendly reference pages.

The product is designed for:

- Students and interns learning React/Next.js.
- Junior frontend developers who know HTML/CSS/JavaScript but struggle with mental models.
- Teachers, mentors, and bootcamp instructors who need visual explanations.
- Portfolio/demo use cases where the app needs to feel professional and presentation-ready.

Core promise:

> Make invisible React and Next.js mechanisms visible, memorable, and practical.

## 2. Current status

The repository now contains a functional Next.js MVP, not only a blueprint. It includes:

- Public landing page.
- App shell with sidebar/top/mobile navigation.
- Dashboard.
- Start Here onboarding.
- React and Next.js learning hubs.
- Learning paths and roadmap pages.
- Concept library and concept detail pages.
- Interactive visualizer gallery and dynamic visualizer routes.
- Practice playground.
- Quiz flow.
- Mistake Lab.
- Progress and bookmark pages.
- Compare page.
- Glossary page.
- Demo Script page.
- About/product vision page.
- Settings page with theme support.
- Product blueprint and this handoff document.

## 3. Tech stack

Runtime and framework:

- Next.js `16.2.6` with App Router.
- React `19.2.4`.
- TypeScript `^5`.
- Node target used during development: Node `22.12.0`.
- npm target used during development: npm `10.8.3`.

Styling and UI:

- Tailwind CSS v4.
- `@tailwindcss/postcss`.
- Custom reusable UI primitives in `src/components/ui`.
- `lucide-react` icons.
- `next-themes` for light/dark/system theme behavior.

Interactivity:

- Zustand for persisted local progress/bookmark/settings state.
- Framer Motion is installed for meaningful animations.

Validation:

- ESLint via `npm run lint`.
- TypeScript via `npm run typecheck`.
- Production build via `npm run build`.

## 4. How to run locally

### Prerequisites

- Node.js 22.x recommended.
- npm 10.x recommended.

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### Production build

```bash
npm run build
npm run start
```

### Quality checks

Run these before every PR:

```bash
npm run lint
npm run typecheck
npm run build
```

All of these passed locally for the latest delivered PRs.

## 5. Important npm scripts

From `package.json`:

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start local Next.js dev server |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server after build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript without emitting files |

## 6. Repository structure

Important paths:

```text
docs/
  product-blueprint.md       Product/UX/design blueprint
  HANDOFF.md                 This handoff document

src/app/
  page.tsx                   Landing page
  start/page.tsx             Beginner onboarding path
  dashboard/page.tsx         Learner dashboard
  concepts/page.tsx          Concept library
  concepts/[slug]/page.tsx   Concept detail pages
  visualizers/page.tsx       Visualizer gallery
  visualizers/[slug]/page.tsx Dynamic visualizer page
  paths/page.tsx             Learning paths index
  paths/[slug]/page.tsx      Path detail page
  learn/react/page.tsx       React learning hub
  learn/nextjs/page.tsx      Next.js learning hub
  roadmaps/page.tsx          Roadmaps
  route-map/page.tsx         Next.js route map explorer
  playground/page.tsx        Practice playground
  quiz/page.tsx              Quiz flow
  mistake-lab/page.tsx       Mistake simulator/explorer
  progress/page.tsx          Progress page
  bookmarks/page.tsx         Saved concepts
  compare/page.tsx           Concept comparison cards
  glossary/page.tsx          Beginner glossary
  demo-script/page.tsx       5-minute project demo script
  settings/page.tsx          Settings
  about/page.tsx             Product vision/about

src/components/
  navigation.tsx             App shell, sidebar, top nav, mobile quick nav
  bookmark-button.tsx        Bookmark and complete lesson actions
  code-block.tsx             Code display with active line highlighting
  concept-search.tsx         Concept search/filter UI
  roadmap-timeline.tsx       Reusable visual roadmap component
  route-map-explorer.tsx     Interactive Next.js route map
  ui/                        Button, badge, card, progress primitives
  visualizers/               Interactive visualizer components

src/content/
  lessons.ts                 Typed lesson/content model and learning paths

src/stores/
  progress-store.ts          Zustand persisted learner state

src/lib/
  utils.ts                   Utility helpers
```

## 7. Content model

Lesson content lives in `src/content/lessons.ts`.

Main exported data:

- `concepts`: list of all concept lessons.
- `learningPaths`: list of learning paths.
- Individual lesson exports such as `propsVsStateLesson`, `renderCycleLesson`, `keysListDiffingLesson`, `useEffectDependencyLesson`, `serverClientComponentsLesson`.

Each lesson follows the `ConceptLesson` shape:

- `id`, `slug`, `title`.
- `category`.
- `difficulty`.
- `estimatedMinutes`.
- `prerequisites`.
- `shortDescription`.
- `learningGoals`.
- `explanation`.
- `mentalModel`.
- `codeExamples`.
- `visualizationType`.
- `steps`.
- `commonMistakes`.
- `quiz`.
- `relatedConcepts`.

This structure powers concept pages, visualizer pages, progress, quiz, roadmaps, Mistake Lab, and playground references.

## 8. Completed feature history

### PR #1 — MVP foundation

Implemented the first functional Next.js MVP:

- Next.js App Router app.
- Landing page.
- Dashboard.
- Learning paths.
- Concept pages.
- Visualizer gallery.
- Mistake Lab base.
- Progress/bookmark/settings pages.
- Dark/light mode.
- Props vs State visualizer.
- Typed lesson content model.

### PR #2 — Remaining MVP visualizers and concept pages

Added:

- useEffect Dependency Array visualizer.
- Server Components vs Client Components visualizer.
- Stronger dynamic concept/detail routing.

### PR #3 — Playground, quiz, and live progress

Added:

- Practice Playground.
- Quiz flow.
- More interactive progress/bookmark behavior.

### PR #4 — Navigation, discovery, and settings polish

Added:

- Better navigation/mobile UX.
- About/Product Vision page.
- More complete Settings page.
- Concept search/filter experience.

### PR #5 — Mistake Lab and roadmaps

Added:

- Interactive Mistake Lab explorer.
- Visual Roadmaps page.
- Reusable roadmap timeline.

### PR #6 — Next.js route map explorer

Added:

- Interactive Next.js App Router/Route Map explorer.
- Next.js learning hub improvements.
- Links from navigation and landing.

### PR #7 — React Render Cycle visualizer

Added:

- React Render Cycle lesson.
- Visualizer for click → state queue → render → commit → effects.
- Integration into concepts, dashboard, roadmaps, paths, and playground.

### PR #8 — Keys and List Diffing visualizer

Added:

- React Keys & List Diffing lesson.
- Visualizer for stable keys, row identity, list insertions, and index-key mistakes.
- Integration into React path, roadmaps, playground, concept pages, and Mistake Lab via shared content.

### PR #9 — Concept comparison cards

Added:

- `/compare` page.
- Side-by-side cards for confusing concepts:
  - Props vs State.
  - Render vs Commit.
  - Stable Key vs Index Key.
  - useEffect vs Event Handler.
  - Server vs Client Component.

### PR #10 — Beginner glossary

Added:

- `/glossary` page.
- Short definitions and code examples for core React/Next.js terms.
- Links to relevant visualizers and route map.

### PR #11 — Start Here onboarding

Added:

- `/start` page.
- Four-step beginner onboarding sequence.
- Links to foundational visualizers, Compare, Mistake Lab, Roadmaps, and Glossary.

### PR #12 — Demo script

Added:

- `/demo-script` page.
- 5-minute walkthrough script for portfolio, classroom, school project, or startup prototype demos.
- Timed talking points and direct navigation links.

## 9. Main user flows

### Beginner first-time learner

1. Open `/`.
2. Click Start learning.
3. Follow `/start`.
4. Open Props vs State.
5. Open React Render Cycle.
6. Use Compare when concepts feel similar.
7. Practice in Playground or Mistake Lab.
8. Track progress/bookmarks locally.

### Visual lesson flow

1. Open `/visualizers`.
2. Choose a concept.
3. Read mental model and learning goals.
4. Step through code and visualization.
5. Use previous/next/play/reset controls.
6. Read inspector notes.
7. Answer quiz.
8. Bookmark or mark complete.

### Instructor/demo flow

1. Open `/demo-script`.
2. Follow timed steps.
3. Show landing value proposition.
4. Show `/start`.
5. Demo a visualizer.
6. Show Mistake Lab/Playground.
7. Close with Roadmaps, Compare, Glossary.

## 10. Current visual lessons

Implemented visual lessons:

1. React Props vs State
   - Parent/child data flow.
   - State ownership.
   - Props read-only mistake.

2. React Render Cycle
   - Event handler.
   - setState queue.
   - Render phase.
   - Commit phase.
   - Effect timing.
   - Stale state read mistake.

3. React Keys & List Diffing
   - Stable keys.
   - Matching old/new rows.
   - Preserving row state.
   - Index key mistake.

4. useEffect Dependency Array
   - Dependency comparison.
   - Effect run/skip behavior.
   - Cleanup timing.
   - Missing dependency mistake.

5. Server Components vs Client Components
   - Server rendering.
   - Client boundary.
   - Hydration.
   - Overusing `use client` mistake.

## 11. State and persistence

The app uses Zustand in `src/stores/progress-store.ts`.

Stored locally:

- Completed lesson slugs.
- Bookmarked lesson slugs.
- Recently visited lesson slugs.
- User study preferences/settings.

Important note:

- There is no backend/database yet.
- Progress is local-browser persisted.
- This is appropriate for MVP/demo/portfolio scope.

## 12. Design system notes

The UI aims for:

- Calm educational SaaS feel.
- Professional developer-tool style.
- Beginner-friendly hierarchy.
- Light/dark theme support.
- Rounded cards and clear CTAs.
- Consistent `Badge`, `ButtonLink`, `Card`, and progress components.

Core patterns:

- Code + visualization split view.
- Step explanation + timeline + quiz.
- Inspector panels for invisible internal behavior.
- Common mistake panels with cause/fix/prevention.
- Progressive disclosure through pages like Start Here, Compare, and Glossary.

## 13. Accessibility notes

Existing implementation uses:

- Semantic headings and sections.
- `aria-label` on major visualization sections.
- `aria-hidden` for decorative icons.
- Visible focus styles through shared component classes.
- Text explanations for important visual states.

Future accessibility improvements:

- Add keyboard shortcut support for visualizer step controls.
- Add reduced-motion-specific animation fallbacks if more animations are introduced.
- Add automated accessibility checks such as Playwright + axe.

## 14. Performance notes

Current app is mostly static and builds quickly.

Build output currently includes static routes for all main pages and SSG pages for dynamic concepts/visualizers/paths.

Future performance improvements:

- Dynamically import heavy visualizers if they grow larger.
- Use lazy loading for any future code editor such as Monaco or Sandpack.
- Keep Server Components as default for static/content pages.
- Keep Client Components limited to interactive widgets and visualizers.

## 15. Known limitations

This is an MVP/prototype. Current limitations:

- No authentication.
- No backend persistence.
- No MDX pipeline yet; lessons are structured TypeScript objects.
- No real code execution sandbox.
- Practice Playground is guided and keyword-based, not a full compiler/runtime.
- No CI workflow configured in the repository at the time of handoff.
- No hosted preview deployment configured.
- No E2E test suite yet.

## 16. Recommended next steps

High-value next PRs:

1. Add GitHub Actions CI
   - Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`.

2. Add E2E smoke tests
   - Playwright test for:
     - `/start`
     - `/visualizers/props-vs-state`
     - `/visualizers/react-render-cycle`
     - `/route-map`
     - `/playground`

3. Add a real code playground
   - Sandpack or Monaco.
   - Start with safe guided examples.

4. Add more React lessons
   - Component Composition.
   - Conditional Rendering.
   - List Rendering.
   - Controlled vs Uncontrolled Components.
   - Lifting State Up.
   - Context API.

5. Add more Next.js lessons
   - Dynamic Routes.
   - Loading/Error/Not Found UI.
   - SSR vs SSG vs ISR.
   - Caching and Revalidation.
   - Server Actions.

6. Add deployment
   - Vercel is the natural default for this stack.
   - Configure preview deployments for PRs.

7. Improve content authoring
   - Move lesson data to MDX or JSON files if content grows.
   - Keep the TypeScript model as the validation layer.

## 17. How to add a new lesson

1. Add a new `ConceptLesson` object in `src/content/lessons.ts`.
2. Add it to the `concepts` array.
3. Add the slug to the correct `learningPaths[].lessonSlugs`.
4. If it needs a custom visualizer:
   - Create `src/components/visualizers/<name>-visualizer.tsx`.
   - Import it in `src/app/visualizers/[slug]/page.tsx`.
   - Add a matching condition in `VisualizerSwitch`.
5. If useful, add a playground challenge in `src/components/playground/practice-playground.tsx`.
6. If it belongs in Roadmaps, update `src/components/roadmap-timeline.tsx`.
7. Run:

```bash
npm run lint
npm run typecheck
npm run build
```

## 18. How to add a new page

1. Create `src/app/<route>/page.tsx`.
2. Wrap content in `AppShell`.
3. Use shared UI components from:
   - `src/components/ui/badge.tsx`
   - `src/components/ui/button.tsx`
   - `src/components/ui/card.tsx`
4. Add navigation links in `src/components/navigation.tsx` if it is a primary page.
5. Add entry CTAs from relevant pages.
6. Run lint/typecheck/build.

## 19. PR and branch workflow used

Workflow followed:

1. Sync `origin/main`.
2. Create a new feature branch:

```bash
git checkout -B devin/<timestamp>-feature-name origin/main
```

3. Make focused changes.
4. Validate locally.
5. Commit with focused message.
6. Push branch.
7. Open PR to `main`.
8. Wait for merge before starting the next branch.

Do not push directly to `main`.

## 20. Final handoff checklist

Before considering a future PR ready:

- [ ] New feature is scoped and aligned with visual-learning product direction.
- [ ] User-facing copy is beginner-friendly.
- [ ] Visuals explain a real concept, not decorative animation.
- [ ] Page is responsive.
- [ ] Navigation/entry points are wired.
- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.
- [ ] PR description includes summary and human review checklist.
