"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, Clock, Flame, PlayCircle, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { concepts, learningPaths } from "@/content/lessons";
import { useProgressStore } from "@/stores/progress-store";

const primaryPath = learningPaths.find((path) => path.slug === "react-beginner") ?? learningPaths[0];
const pathLessons = primaryPath.lessonSlugs
  .map((slug) => concepts.find((concept) => concept.slug === slug))
  .filter((lesson) => lesson !== undefined);

export function DashboardLearningPlan() {
  const completedLessons = useProgressStore((state) => state.completedLessons);
  const bookmarks = useProgressStore((state) => state.bookmarks);
  const dailyGoalMinutes = useProgressStore((state) => state.preferences.dailyGoalMinutes);
  const completedCount = concepts.filter((concept) => completedLessons.includes(concept.slug)).length;
  const pathCompleted = pathLessons.filter((lesson) => completedLessons.includes(lesson.slug)).length;
  const nextLesson = pathLessons.find((lesson) => !completedLessons.includes(lesson.slug)) ?? pathLessons[0];
  const percentage = Math.round((pathCompleted / pathLessons.length) * 100);
  const bookmarkedConcepts = concepts.filter((concept) => bookmarks.includes(concept.slug)).slice(0, 3);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
      <Card className="border-primary/20 bg-primary-soft/30 p-8">
        <div className="grid gap-6 xl:grid-cols-[1fr_280px] xl:items-center">
          <div>
            <Badge variant="primary">Today&apos;s learning plan</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] md:text-4xl">
              {nextLesson ? `Continue with ${nextLesson.title}.` : "Review what you completed."}
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-muted">
              The dashboard now chooses the next incomplete lesson from the React Beginner path, so learners can resume without guessing.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/visualizers/${nextLesson?.slug ?? "props-vs-state"}`}>
                Resume lesson
                <ArrowRight size={18} aria-hidden />
              </ButtonLink>
              <ButtonLink href={`/paths/${primaryPath.slug}`} variant="outline">
                View path
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-[2rem] border border-border bg-background/80 p-5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-semibold text-muted">React Beginner</span>
              <span className="text-3xl font-bold">{percentage}%</span>
            </div>
            <div className="mt-4 h-3 rounded-full bg-border">
              <div className="h-3 rounded-full bg-primary transition-all" style={{ width: `${percentage}%` }} />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Metric icon={CheckCircle2} label="Done" value={`${completedCount}/${concepts.length}`} />
              <Metric icon={Clock} label="Daily goal" value={`${dailyGoalMinutes}m`} />
            </div>
            <p className="mt-3 text-xs text-muted">
              Next lesson is {nextLesson?.estimatedMinutes ?? 12}m of your {dailyGoalMinutes}m daily goal.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-3">
          <Target className="text-primary" aria-hidden />
          <h2 className="font-bold">Quick actions</h2>
        </div>
        <div className="mt-5 grid gap-3">
          <QuickAction href="/playground" icon={PlayCircle} title="Practice code" description="Apply the concept in a guided challenge." />
          <QuickAction href="/mistake-lab" icon={Flame} title="Debug a mistake" description="See what breaks and how to fix it." />
          <QuickAction href="/glossary" icon={BookOpen} title="Review glossary" description="Translate confusing terms into simple language." />
        </div>
      </Card>

      <Card className="lg:col-span-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge variant="success">Resume-friendly</Badge>
            <h2 className="mt-3 text-2xl font-bold">Saved and recommended concepts</h2>
            <p className="mt-2 text-sm text-muted">Bookmarks and next lessons appear together for a lower-friction return experience.</p>
          </div>
          <ButtonLink href="/bookmarks" variant="ghost">
            View bookmarks
          </ButtonLink>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {(bookmarkedConcepts.length ? bookmarkedConcepts : pathLessons.slice(0, 3)).map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/visualizers/${lesson.slug}`}
              className="rounded-3xl border border-border bg-surface-muted p-5 transition hover:border-primary/50 hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Badge variant={completedLessons.includes(lesson.slug) ? "success" : "primary"}>
                {completedLessons.includes(lesson.slug) ? "Completed" : "Recommended"}
              </Badge>
              <h3 className="mt-3 font-bold">{lesson.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{lesson.estimatedMinutes} min visual lesson</p>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CheckCircle2;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-surface-muted p-3">
      <Icon size={16} className="text-primary" aria-hidden />
      <p className="mt-2 text-lg font-bold">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

function QuickAction({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: typeof PlayCircle;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex gap-3 rounded-2xl border border-border bg-surface-muted p-4 transition hover:border-primary/50 hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
        <Icon size={18} aria-hidden />
      </span>
      <span>
        <span className="font-semibold">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-muted">{description}</span>
      </span>
    </Link>
  );
}
