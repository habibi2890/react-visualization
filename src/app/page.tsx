import {
  ArrowRight,
  Blocks,
  Bug,
  GitBranch,
  PlayCircle,
  Route,
  Sparkles,
  Workflow,
} from "lucide-react";
import { MarketingNav } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card, SectionHeader } from "@/components/ui/card";
import { learningPaths } from "@/content/lessons";

const problems = [
  "State changes are invisible",
  "Re-renders feel random",
  "Hooks depend on timing",
  "Server and client code get mixed up",
];

const features = [
  {
    title: "Component Tree Explorer",
    description: "See parent-child relationships, state ownership, and props moving through the tree.",
    icon: GitBranch,
  },
  {
    title: "Render Timeline",
    description: "Follow clicks, state updates, re-renders, DOM updates, effects, and cleanups.",
    icon: Workflow,
  },
  {
    title: "Hook Visualizer",
    description: "Watch dependency arrays change and learn why an effect runs or skips.",
    icon: Sparkles,
  },
  {
    title: "Next.js Route Map",
    description: "Visualize app directory files, layouts, loading states, and server/client boundaries.",
    icon: Route,
  },
  {
    title: "Mistake Lab",
    description: "Trigger common bugs safely, then inspect what went wrong and how to fix it.",
    icon: Bug,
  },
  {
    title: "Interactive Playground",
    description: "Connect code, UI output, state, props, and render logs in one learning workspace.",
    icon: PlayCircle,
  },
];

export default function Home() {
  return (
    <>
      <MarketingNav />
      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <Badge variant="primary" className="mb-6 w-fit">
              Interactive React and Next.js learning lab
            </Badge>
            <h1 className="max-w-4xl text-5xl font-bold leading-[1.02] tracking-[-0.05em] md:text-7xl">
              See how React and Next.js work under the hood.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted md:text-xl">
              Learn components, props, state, hooks, rendering, routing, and server/client boundaries through interactive diagrams, code, and step-by-step visualizations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/dashboard">
                Start learning visually
                <ArrowRight size={18} aria-hidden />
              </ButtonLink>
              <ButtonLink href="/visualizers/react-render-cycle" variant="outline">
                Try Render Cycle
              </ButtonLink>
            </div>
          </div>
          <HeroVisualizerPreview />
        </section>

        <section className="border-y border-border bg-surface/45 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              align="center"
              eyebrow="The problem"
              title="Frontend concepts are hard when you cannot see them."
              description="React is easier when you can see where state lives, when props move, and why a component renders again."
            />
            <div className="mt-12 grid gap-4 md:grid-cols-4">
              {problems.map((problem) => (
                <Card key={problem} className="p-5">
                  <div className="mb-4 grid size-11 place-items-center rounded-2xl bg-danger/10 text-danger">
                    <Bug size={20} aria-hidden />
                  </div>
                  <h3 className="font-bold">{problem}</h3>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="The solution"
            title="Read less wall-of-text. Step through the mental model."
            description="Every concept connects a short explanation, code, visual state, render timeline, common mistake, and quiz."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {["Read the goal", "Watch the concept move", "Inspect what changed"].map((step, index) => (
              <Card key={step}>
                <span className="grid size-12 place-items-center rounded-2xl bg-primary text-lg font-bold text-white dark:text-slate-950">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-xl font-bold">{step}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {index === 0
                    ? "Start with plain language and one focused learning goal."
                    : index === 1
                      ? "Use arrows, highlights, and timelines to reveal invisible behavior."
                      : "Connect each visual change to the exact code and component that caused it."}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-surface/45 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              align="center"
              eyebrow="Features"
              title="A modern learning platform, not a documentation clone."
              description="Polished learning tools for students, interns, junior developers, and mentors."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title}>
                    <div className="grid size-12 place-items-center rounded-2xl bg-accent/10 text-accent">
                      <Icon size={22} aria-hidden />
                    </div>
                    <h3 className="mt-5 text-xl font-bold">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-muted">{feature.description}</p>
                    {feature.title === "Next.js Route Map" ? (
                      <ButtonLink href="/route-map" variant="ghost" className="mt-5 px-0">
                        Explore route map
                      </ButtonLink>
                    ) : null}
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Learning paths"
            title="Structured paths for visual learners."
            description="Start with beginner-friendly foundations, then grow into hooks, App Router, real projects, and common mistakes."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {learningPaths.map((path) => (
              <Card key={path.id} className="relative overflow-hidden">
                <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                <Badge variant="primary">{path.difficulty}</Badge>
                <h3 className="mt-5 text-2xl font-bold">{path.title}</h3>
                <p className="mt-3 text-muted">{path.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {path.outcomes.slice(0, 3).map((outcome) => (
                    <Badge key={outcome}>{outcome}</Badge>
                  ))}
                </div>
                <ButtonLink href={`/paths/${path.slug}`} className="mt-8">
                  View path
                </ButtonLink>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <Card className="grid gap-10 overflow-hidden p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
            <div>
              <Badge variant="warning">Example concept preview</Badge>
              <h2 className="mt-5 text-3xl font-bold tracking-[-0.03em] md:text-5xl">
                useEffect dependency array explained visually
              </h2>
              <p className="mt-5 text-lg leading-8 text-muted">
                This list tells React when your effect should run again. Watch dependencies change, effect runs, skipped renders, and cleanup timing.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-surface-muted p-5">
              <div className="flex flex-wrap gap-3">
                {["userId", "isOpen", "theme"].map((dep, index) => (
                  <span
                    key={dep}
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      index === 0 ? "bg-success/15 text-success" : "bg-surface text-muted"
                    }`}
                  >
                    {dep}
                  </span>
                ))}
              </div>
              <div className="mt-6 space-y-3">
                {["Render #1", "Compare dependencies", "Run effect", "Cleanup before next run"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-surface p-4">
                    <span className="grid size-8 place-items-center rounded-full bg-primary-soft text-sm font-bold text-primary">
                      {index + 1}
                    </span>
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        <section className="border-t border-border px-4 py-20 text-center">
          <Blocks className="mx-auto mb-5 text-primary" size={36} aria-hidden />
          <h2 className="text-3xl font-bold tracking-[-0.03em] md:text-5xl">
            Build a React mental model you can actually see.
          </h2>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/dashboard">Start the MVP demo</ButtonLink>
          </div>
        </section>
      </main>
    </>
  );
}

function HeroVisualizerPreview() {
  return (
    <Card className="relative overflow-hidden p-4 lg:p-5">
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
      <div className="rounded-2xl border border-border bg-surface-muted p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2">
            <span className="size-3 rounded-full bg-danger" />
            <span className="size-3 rounded-full bg-warning" />
            <span className="size-3 rounded-full bg-success" />
          </div>
          <Badge variant="primary">Props vs State</Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-[0.85fr_1fr]">
          <div className="rounded-2xl bg-surface-code p-4 font-mono text-xs leading-6 text-slate-100">
            <p className="text-cyan-200">const [quantity, setQuantity] = useState(1)</p>
            <p className="mt-3 text-slate-300">&lt;ProductCard</p>
            <p className="pl-4 text-blue-200">quantity=&#123;quantity&#125;</p>
            <p className="pl-4 text-purple-200">onAdd=&#123;() =&gt; setQuantity(2)&#125;</p>
            <p className="text-slate-300">/&gt;</p>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-primary/30 bg-surface p-4">
              <div className="flex items-center justify-between">
                <span className="font-bold">ProductPage</span>
                <Badge variant="success">state: 1 → 2</Badge>
              </div>
              <div className="mx-auto my-3 h-8 w-px bg-primary" />
              <div className="rounded-2xl border border-accent/40 bg-accent/10 p-4">
                <span className="font-bold">ProductCard</span>
                <p className="mt-2 text-sm text-muted">prop: quantity = 2</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
              {["Click", "State update", "Re-render"].map((item) => (
                <div key={item} className="rounded-xl bg-primary-soft p-3 text-primary">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
