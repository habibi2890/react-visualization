import { ArrowRight, BookOpen, FlaskConical, GitCompareArrows, Map, PlayCircle } from "lucide-react";
import { AppShell } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const steps = [
  {
    title: "Start with Props vs State",
    description: "Learn where values live and how parent/child components communicate.",
    href: "/visualizers/props-vs-state",
    icon: PlayCircle,
  },
  {
    title: "Watch React render",
    description: "See click → state queue → render → commit → effects in one timeline.",
    href: "/visualizers/react-render-cycle",
    icon: BookOpen,
  },
  {
    title: "Compare confusing ideas",
    description: "Use quick cards when two concepts feel similar but behave differently.",
    href: "/compare",
    icon: GitCompareArrows,
  },
  {
    title: "Practice and debug",
    description: "Try playground tasks, quizzes, and Mistake Lab to lock in the mental model.",
    href: "/mistake-lab",
    icon: FlaskConical,
  },
];

export default function StartPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="primary">Start here</Badge>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          A simple first path through React Visual Lab.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          If you are new, follow these four steps. Each one turns an invisible React idea into something you can see and test.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={step.title}>
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-lg font-bold text-white dark:text-slate-950">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <Icon className="text-primary" aria-hidden />
                        <h2 className="text-2xl font-bold">{step.title}</h2>
                      </div>
                      <p className="mt-3 leading-7 text-muted">{step.description}</p>
                      <ButtonLink href={step.href} variant="outline" className="mt-5">
                        Open step
                        <ArrowRight size={16} aria-hidden />
                      </ButtonLink>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Card>
              <Map className="text-primary" aria-hidden />
              <h2 className="mt-4 text-xl font-bold">Need the full journey?</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                Roadmaps organize concepts, visualizers, quizzes, playground tasks, and mistake simulations into one learning sequence.
              </p>
              <ButtonLink href="/roadmaps" className="mt-5 w-full">
                View roadmaps
              </ButtonLink>
            </Card>
            <Card>
              <h2 className="text-xl font-bold">Quick reference</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                When a term feels unfamiliar, open the glossary before continuing.
              </p>
              <ButtonLink href="/glossary" variant="outline" className="mt-5 w-full">
                Open glossary
              </ButtonLink>
            </Card>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
