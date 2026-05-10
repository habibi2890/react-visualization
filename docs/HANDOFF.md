# React/Next.js Visualization Learning Platform — Handoff

Last updated: 2026-05-10

## 1. Current project status

This repository is now a working Next.js MVP for learning React and Next.js visually. It is no longer only a product blueprint.

The app helps beginners understand invisible frontend mechanisms through interactive visualizers, timelines, route maps, quizzes, playground challenges, mistake simulations, notes, bookmarks, progress tracking, and onboarding flows.

Core promise:

> Make invisible React and Next.js mechanisms visible, memorable, and practical.

Target users:

- Students and interns learning React/Next.js.
- Junior frontend developers who know HTML/CSS/JavaScript but struggle with mental models.
- Teachers, mentors, and bootcamp instructors who need visual explanations.
- Portfolio/demo users who need a polished prototype.

## 2. What is implemented

Main pages and flows:

- `/` — landing page.
- `/start` — beginner onboarding.
- `/dashboard` — resume-focused learning plan, daily goal progress, and recent activity.
- `/learn/react` and `/learn/nextjs` — learning hubs.
- `/paths` and `/paths/[slug]` — learning paths with progress state.
- `/concepts` and `/concepts/[slug]` — concept library and detail pages.
- `/visualizers` and `/visualizers/[slug]` — interactive visual lessons.
- `/route-map` — Next.js App Router route map explorer.
- `/playground` — guided practice playground.
- `/quiz` — quiz flow with feedback and best-score persistence.
- `/mistake-lab` — common mistake simulator/explorer.
- `/progress` — progress summary, daily goal progress, skill map, weak-area recommendation, and activity timeline.
- `/bookmarks` — note-aware review queue.
- `/compare` — concept comparison cards.
- `/glossary` — beginner glossary.
- `/roadmaps` — roadmap timelines.
- `/demo-script` — 5-minute demo walkthrough.
- `/settings` — appearance and learning preferences.
- `/about` — product vision.

Implemented learning UX:

- Global command menu via `Ctrl/⌘+K`.
- Lesson completion panel with next-step CTA.
- Learning-path progress and current/next/done states.
- Dashboard daily plan and resume CTA.
- Daily goal progress based on today's local learning activity.
- Per-lesson notes stored locally.
- Bookmarks upgraded into a review queue.
- Quiz feedback with explanations, correct-answer reveal, and best score.
- Progress skill map based on completion, quiz score, and notes.
- Learning preferences that affect actual screens:
  - `showHintsByDefault` opens Playground hints automatically.
  - `reducedMotion` disables visualizer autoplay and spacebar play/pause.
  - `dailyGoalMinutes` appears in the Dashboard learning plan.
- Recent activity tracking for completion, quizzes, playground attempts, notes, and bookmarks.

## 3. Tech stack

Runtime/framework:

- Next.js `16.2.6` with App Router.
- React `19.2.4`.
- TypeScript `^5`.
- Node used during development: `22.12.0`.
- npm used during development: `10.8.3`.

Styling/UI:

- Tailwind CSS v4.
- `@tailwindcss/postcss`.
- Custom UI primitives in `src/components/ui`.
- `lucide-react` icons.
- `next-themes` for light/dark/system theme.

State and interaction:

- Zustand with localStorage persistence.
- Framer Motion installed for meaningful animations.

Validation:

- ESLint: `npm run lint`.
- TypeScript: `npm run typecheck`.
- Production build: `npm run build`.
- Playwright smoke tests: `npm run test:e2e`.
- GitHub Actions CI: `.github/workflows/ci.yml`.

## 4. How to run locally

Prerequisites:

- Node.js 22.x recommended.
- npm 10.x recommended.

Install:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Production build/start:

```bash
npm run build
npm run start
```

Quality checks before every PR:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Playwright browser/dependency setup if needed:

```bash
npm run test:e2e:install
```

## 5. Important npm scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start local Next.js dev server |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server after build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run test:e2e` | Run Playwright smoke tests |
| `npm run test:e2e:install` | Install Playwright Chromium and OS deps |

## 6. Repository structure

```text
docs/
  product-blueprint.md        Product/UX/design blueprint
  HANDOFF.md                  This handoff document

src/app/
  page.tsx                    Landing page
  start/page.tsx              Beginner onboarding
  dashboard/page.tsx          Dashboard
  concepts/page.tsx           Concept library
  concepts/[slug]/page.tsx    Concept detail pages
  visualizers/page.tsx        Visualizer gallery
  visualizers/[slug]/page.tsx Dynamic visualizer page
  paths/page.tsx              Learning paths index
  paths/[slug]/page.tsx       Path detail page
  learn/react/page.tsx        React learning hub
  learn/nextjs/page.tsx       Next.js learning hub
  roadmaps/page.tsx           Roadmaps
  route-map/page.tsx          Next.js route map explorer
  playground/page.tsx         Practice playground
  quiz/page.tsx               Quiz flow
  mistake-lab/page.tsx        Mistake simulator/explorer
  progress/page.tsx           Progress page
  bookmarks/page.tsx          Saved concepts/review queue
  compare/page.tsx            Concept comparison cards
  glossary/page.tsx           Beginner glossary
  demo-script/page.tsx        5-minute demo script
  settings/page.tsx           Settings
  about/page.tsx              Product vision/about

src/components/
  navigation.tsx              App shell, sidebar, top nav, mobile quick nav
  command-menu.tsx            Ctrl/⌘+K command menu
  dashboard-learning-plan.tsx Dashboard learning plan
  lesson-completion-panel.tsx Completion and next-step panel
  lesson-notes.tsx            Per-lesson notes
  progress-summary.tsx        Progress metrics, skill map, weak area
  daily-goal-progress.tsx     Daily goal progress from activity + preferences
  recent-activity.tsx         Recent activity timeline
  bookmark-button.tsx         Bookmark and complete lesson actions
  code-block.tsx              Code display with active line highlighting
  concept-search.tsx          Concept search/filter UI
  roadmap-timeline.tsx        Reusable roadmap component
  route-map-explorer.tsx      Interactive Next.js route map
  ui/                         Button, badge, card, progress primitives
  visualizers/                Interactive visualizer components
  quiz/quiz-runner.tsx        Quiz flow
  playground/practice-playground.tsx Guided practice playground

src/content/
  lessons.ts                  Typed lesson/content model and learning paths

src/stores/
  progress-store.ts           Zustand persisted learner state

tests/e2e/
  smoke.spec.ts               Playwright smoke tests
```

## 7. Content model

Lesson content lives in `src/content/lessons.ts`.

Main exports:

- `concepts`
- `learningPaths`
- Individual lesson exports:
  - `propsVsStateLesson`
  - `renderCycleLesson`
  - `keysListDiffingLesson`
  - `useEffectDependencyLesson`
  - `serverClientComponentsLesson`

Each lesson follows `ConceptLesson` from `src/types/lesson.ts`:

- `id`, `slug`, `title`
- `category`
- `difficulty`
- `estimatedMinutes`
- `prerequisites`
- `shortDescription`
- `learningGoals`
- `explanation`
- `mentalModel`
- `codeExamples`
- `visualizationType`
- `steps`
- `commonMistakes`
- `quiz`
- `practiceTask`
- `relatedConcepts`

This model powers concept pages, visualizer pages, quiz, progress, roadmaps, Mistake Lab, Playground references, and command-menu search.

## 8. Current visual lessons

1. React Props vs State
   - Parent/child data flow.
   - State ownership.
   - Props are read-only.
   - Props mutation mistake.

2. React Render Cycle
   - Event handler.
   - `setState` queue.
   - Render phase.
   - Commit phase.
   - Effect timing.
   - Stale state read mistake.

3. React Keys & List Diffing
   - Stable keys.
   - Matching old/new rows.
   - Preserving row state.
   - Index-key mistake.

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

## 9. State and persistence

The app uses Zustand in `src/stores/progress-store.ts` and persists to localStorage key:

```text
react-visual-lab-progress
```

Stored locally:

- `completedLessons`: completed lesson slugs.
- `bookmarks`: saved lesson slugs.
- `quizScores`: best quiz score per concept.
- `playgroundAttempts`: practice attempt count per challenge.
- `lessonNotes`: notes per lesson slug.
- `recentActivity`: latest completion/quiz/playground/note/bookmark actions.
- `preferences`:
  - `reducedMotion`
  - `showHintsByDefault`
  - `dailyGoalMinutes`

Important:

- There is no backend/database yet.
- There is no authentication yet.
- Progress is local-browser persisted, which is appropriate for MVP/demo scope.

## 10. Testing and CI

Local validation commands:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

CI:

- `.github/workflows/ci.yml`
- Runs install, lint, typecheck, build, and Playwright smoke tests.

Current smoke coverage includes:

- Landing → Start Here.
- Command menu navigation.
- Visualizer step controls and keyboard shortcuts.
- Concept completion guidance.
- Lesson notes persistence.
- Bookmarks review queue.
- Quiz feedback and next-concept flow.
- Progress skill map and weak area.
- Settings preferences affecting Playground/Visualizer/Dashboard.
- Daily goal progress on Dashboard/Progress.
- Dashboard learning plan.
- Route map explorer.
- Playground challenge validation.
- Support pages.

## 11. Completed PR history

- PR #1 — MVP foundation.
- PR #2 — Remaining MVP visualizers and concept pages.
- PR #3 — Playground, quiz, and live progress.
- PR #4 — Navigation, discovery, and settings polish.
- PR #5 — Mistake Lab and roadmaps.
- PR #6 — Next.js route map explorer.
- PR #7 — React Render Cycle visualizer.
- PR #8 — Keys and List Diffing visualizer.
- PR #9 — Concept comparison cards.
- PR #10 — Beginner glossary.
- PR #11 — Start Here onboarding.
- PR #12 — Demo script.
- PR #13 — Project handoff documentation.
- PR #14 — GitHub Actions CI.
- PR #15 — Playwright smoke tests.
- PR #16 — Visualizer keyboard shortcuts.
- PR #17 — Global command menu.
- PR #18 — Lesson completion panel.
- PR #19 — Learning path progress UX.
- PR #20 — Dashboard learning plan.
- PR #21 — Lesson notes.
- PR #22 — Bookmarks review queue.
- PR #23 — Quiz feedback UX.
- PR #24 — Progress skill map.
- PR #25 — Settings-driven learning UX.
- PR #26 — Recent activity timeline and refreshed handoff.
- PR #27 — Daily goal progress UX.

## 12. Main user flows

### Beginner first-time learner

1. Open `/`.
2. Click Start learning.
3. Follow `/start`.
4. Open Props vs State.
5. Step through the visualizer.
6. Mark complete.
7. Take quiz.
8. Save notes/bookmark.
9. Continue through dashboard/path recommendations.

### Returning learner

1. Open `/dashboard`.
2. Resume the recommended lesson.
3. Review saved concepts or recent activity.
4. Use `/progress` to find weak areas.
5. Retake quiz or open Playground.

### Instructor/demo flow

1. Open `/demo-script`.
2. Follow the timed walkthrough.
3. Show landing page value proposition.
4. Show `/start`.
5. Demo a visualizer.
6. Show Mistake Lab, Playground, Progress, and Route Map.
7. Close with Roadmaps, Compare, and Glossary.

## 13. Design system notes

The UI aims for:

- Calm educational SaaS feel.
- Professional developer-tool style.
- Beginner-friendly hierarchy.
- Light/dark theme support.
- Rounded cards and clear CTAs.
- Consistent `Badge`, `ButtonLink`, `Button`, `Card`, and progress primitives.

Core patterns:

- Code + visualization split view.
- Step explanation + timeline + quiz.
- Inspector panels for invisible internal behavior.
- Common mistake panels with cause/fix/prevention.
- Progressive disclosure through Start Here, Compare, Glossary, and Roadmaps.
- Completion/review loops via Progress, Bookmarks, Notes, Quiz, and Activity.

## 14. Accessibility notes

Implemented:

- Semantic headings and sections.
- `aria-label` on major visualization sections and form controls.
- `aria-hidden` for decorative icons.
- Visible focus styles through shared component classes.
- Keyboard shortcuts for visualizer controls.
- Ctrl/⌘+K command menu.
- Reduced-motion preference now disables autoplay.
- Text explanations for important visual states.

Recommended future accessibility improvements:

- Add Playwright + axe automated accessibility checks.
- Add more screen-reader-specific descriptions for complex diagrams.
- Add mobile keyboard/focus regression tests.

## 15. Performance notes

Current app is mostly static and builds quickly. Dynamic concept, visualizer, and path pages are statically generated where appropriate.

Future performance improvements:

- Dynamically import heavy visualizers if they grow larger.
- Use lazy loading for any future Monaco/Sandpack editor.
- Keep Server Components as default for static/content pages.
- Keep Client Components limited to interactive widgets and visualizers.

## 16. Known limitations

Current MVP limitations:

- No authentication.
- No backend persistence.
- No MDX pipeline yet; lessons are structured TypeScript objects.
- No real code execution sandbox.
- Practice Playground is guided and keyword-based, not a full compiler/runtime.
- No hosted preview deployment configured.
- E2E coverage is smoke-level, not exhaustive.

## 17. Recommended next steps

High-value next PRs:

1. Add more lessons:
   - Component Composition.
   - Conditional Rendering.
   - Controlled vs Uncontrolled Components.
   - Lifting State Up.
   - Context API.

2. Add more Next.js lessons:
   - Dynamic Routes.
   - Loading/Error/Not Found UI.
   - SSR vs SSG vs ISR.
   - Caching and Revalidation.
   - Server Actions.

3. Improve Playground:
   - Add Sandpack or Monaco.
   - Replace keyword checks with safer structured validation.

4. Add deployment:
   - Vercel is the natural default.
   - Configure PR preview deployments.

5. Improve content authoring:
   - Move lessons to MDX or JSON if content grows.
   - Keep TypeScript types as the validation layer.

6. Expand tests:
   - Add mobile viewport smoke coverage.
   - Add route coverage for every visualizer.
   - Add accessibility checks.

## 18. How to add a new lesson

1. Add a new `ConceptLesson` object in `src/content/lessons.ts`.
2. Add it to the `concepts` array.
3. Add the slug to the correct `learningPaths[].lessonSlugs`.
4. If it needs a custom visualizer:
   - Create `src/components/visualizers/<name>-visualizer.tsx`.
   - Import it in `src/app/visualizers/[slug]/page.tsx`.
   - Add a matching condition in `VisualizerSwitch`.
5. If useful, add a playground challenge in `src/components/playground/practice-playground.tsx`.
6. If it belongs in Roadmaps, update `src/components/roadmap-timeline.tsx`.
7. Add or update E2E smoke coverage if it affects a core flow.
8. Run validation commands.

## 19. How to add a new page

1. Create `src/app/<route>/page.tsx`.
2. Wrap content in `AppShell`.
3. Use shared UI components from `src/components/ui`.
4. Add navigation links in `src/components/navigation.tsx` if it is a primary page.
5. Add entry CTAs from relevant pages.
6. Add command-menu entry if it should be searchable.
7. Run lint/typecheck/build/E2E.

## 20. PR workflow used

1. Sync `origin/main`.
2. Create a branch:

```bash
git checkout -B devin/<timestamp>-feature-name origin/main
```

3. Make focused changes.
4. Validate locally:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

5. Commit and push.
6. Open PR to `main`.
7. Wait for CI.
8. Merge before starting the next branch.

Do not push directly to `main`.

## 21. Final handoff checklist

Before considering a future PR ready:

- [ ] Feature is scoped and aligned with visual-learning product direction.
- [ ] User-facing copy is beginner-friendly.
- [ ] Visuals explain a real concept, not decorative animation.
- [ ] Page is responsive.
- [ ] Navigation and command-menu entry points are wired when relevant.
- [ ] Local persistence updates are reflected in Progress/Dashboard when relevant.
- [ ] Handoff documentation is updated if the project state changes.
- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.
- [ ] `npm run test:e2e` passes.
- [ ] PR description includes summary and human review checklist.
