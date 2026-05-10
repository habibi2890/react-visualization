import { ArrowRight, CheckCircle2, Clock, Route } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { concepts, learningPaths } from "@/content/lessons";

const roadmapStages = [
  {
    title: "Foundation mental model",
    description: "Start with component communication, state ownership, and re-render basics.",
    links: ["props-vs-state", "react-render-cycle"],
  },
  {
    title: "Hooks behavior",
    description: "Learn when effects run, skip, clean up, or become stale.",
    links: ["use-effect-dependency-array"],
  },
  {
    title: "Next.js boundaries",
    description: "Understand what renders on the server and what hydrates in the browser.",
    links: ["server-vs-client-components"],
  },
  {
    title: "Practice and debug",
    description: "Use quizzes, playgrounds, and mistake simulations to turn concepts into habits.",
    links: [],
  },
];

export function RoadmapTimeline() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        {roadmapStages.map((stage, index) => (
          <Card key={stage.title} className="relative overflow-hidden">
            <div className="flex flex-col gap-5 md:flex-row md:items-start">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-primary text-lg font-bold text-white dark:text-slate-950">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold">{stage.title}</h2>
                <p className="mt-2 leading-7 text-muted">{stage.description}</p>
                {stage.links.length > 0 ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {stage.links.map((slug) => {
                      const concept = concepts.find((item) => item.slug === slug);

                      if (!concept) return null;

                      return (
                        <a
                          key={slug}
                          href={`/concepts/${slug}`}
                          className="rounded-2xl border border-border bg-surface-muted p-4 transition hover:border-primary/40"
                        >
                          <Badge variant="primary">{concept.category}</Badge>
                          <p className="mt-3 font-bold">{concept.title}</p>
                          <p className="mt-1 text-sm text-muted">{concept.estimatedMinutes} min visual lesson</p>
                        </a>
                      );
                    })}
                  </div>
                ) : (
                  <div className="mt-5 flex flex-wrap gap-3">
                    <ButtonLink href="/quiz" variant="outline">Take quiz</ButtonLink>
                    <ButtonLink href="/playground" variant="outline">Practice code</ButtonLink>
                    <ButtonLink href="/mistake-lab" variant="outline">Debug mistakes</ButtonLink>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
        <Card>
          <div className="flex items-center gap-3">
            <Route className="text-primary" aria-hidden />
            <h2 className="text-xl font-bold">Recommended path</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">
            Complete React Beginner first, then move into Next.js Beginner once component mental models feel natural.
          </p>
        </Card>

        {learningPaths.map((path) => (
          <Card key={path.id}>
            <div className="flex items-center justify-between gap-3">
              <Badge variant="success">{path.difficulty}</Badge>
              <span className="inline-flex items-center gap-2 text-sm text-muted">
                <Clock size={15} aria-hidden />
                {path.estimatedHours}h
              </span>
            </div>
            <h3 className="mt-4 text-xl font-bold">{path.title}</h3>
            <ul className="mt-4 space-y-2">
              {path.outcomes.slice(0, 3).map((outcome) => (
                <li key={outcome} className="flex gap-2 text-sm text-muted">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" aria-hidden />
                  {outcome}
                </li>
              ))}
            </ul>
            <ButtonLink href={`/paths/${path.slug}`} className="mt-5 w-full">
              Open path
              <ArrowRight size={16} aria-hidden />
            </ButtonLink>
          </Card>
        ))}
      </aside>
    </div>
  );
}
