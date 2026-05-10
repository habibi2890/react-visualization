import { Activity, ArrowRight, Bookmark, Sparkles, Target } from "lucide-react";
import { AppShell } from "@/components/navigation";
import { LessonCard } from "@/components/lesson-card";
import { ProgressRing } from "@/components/progress-ring";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { concepts, learningPaths } from "@/content/lessons";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <Card className="overflow-hidden p-8">
            <Badge variant="primary">Welcome back</Badge>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-[-0.04em] md:text-6xl">
              Today, make one invisible React idea visible.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              Continue with Props vs State and watch state ownership, props flow, and re-renders happen step by step.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/visualizers/props-vs-state">
                Continue lesson
                <ArrowRight size={18} aria-hidden />
              </ButtonLink>
              <ButtonLink href="/paths/react-beginner" variant="outline">
                View React path
              </ButtonLink>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold">Progress overview</h2>
            <div className="mt-6 space-y-6">
              <ProgressRing value={34} label="React Beginner" />
              <ProgressRing value={18} label="Next.js Beginner" />
            </div>
          </Card>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                  Recommended
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-[-0.03em]">
                  Concepts to learn next
                </h2>
              </div>
              <ButtonLink href="/paths/react-beginner" variant="ghost">
                See path
              </ButtonLink>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {concepts.map((lesson, index) => (
                <LessonCard key={lesson.id} lesson={lesson} completed={index === 0} />
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <Card>
              <div className="flex items-center gap-3">
                <Target className="text-primary" aria-hidden />
                <h2 className="font-bold">Suggested next step</h2>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">
                Learn why changing state makes React render again, then review the render timeline.
              </p>
              <ButtonLink href="/visualizers/props-vs-state" className="mt-5 w-full">
                Open visualizer
              </ButtonLink>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <Bookmark className="text-secondary" aria-hidden />
                <h2 className="font-bold">Bookmarked concepts</h2>
              </div>
              <div className="mt-4 space-y-3">
                {concepts.slice(0, 2).map((lesson) => (
                  <a
                    key={lesson.slug}
                    href={`/visualizers/${lesson.slug}`}
                    className="block rounded-2xl border border-border bg-surface-muted p-4 transition hover:border-primary/40"
                  >
                    <p className="font-semibold">{lesson.title}</p>
                    <p className="mt-1 text-xs text-muted">{lesson.estimatedMinutes} min visual lesson</p>
                  </a>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3">
                <Activity className="text-accent" aria-hidden />
                <h2 className="font-bold">Recent activity</h2>
              </div>
              <div className="mt-4 space-y-4 text-sm">
                {[
                  "Completed Props vs State quiz",
                  "Bookmarked useEffect Dependency Array",
                  "Opened Next.js Beginner path",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <Sparkles size={16} className="mt-0.5 text-primary" aria-hidden />
                    <span className="text-muted">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </aside>
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold tracking-[-0.03em]">Learning paths</h2>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            {learningPaths.map((path) => (
              <Card key={path.id}>
                <Badge variant="primary">{path.estimatedHours} hours</Badge>
                <h3 className="mt-4 text-2xl font-bold">{path.title}</h3>
                <p className="mt-3 text-muted">{path.description}</p>
                <ButtonLink href={`/paths/${path.slug}`} className="mt-6">
                  Continue path
                </ButtonLink>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
