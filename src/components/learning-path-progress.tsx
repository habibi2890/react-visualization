"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, PlayCircle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/stores/progress-store";
import type { ConceptLesson, LearningPath } from "@/types/lesson";

export function LearningPathProgress({
  path,
  lessons,
}: {
  path: LearningPath;
  lessons: ConceptLesson[];
}) {
  const completedLessons = useProgressStore((state) => state.completedLessons);
  const completedCount = lessons.filter((lesson) => completedLessons.includes(lesson.slug)).length;
  const totalMinutes = lessons.reduce((sum, lesson) => sum + lesson.estimatedMinutes, 0);
  const nextLesson = lessons.find((lesson) => !completedLessons.includes(lesson.slug)) ?? lessons[0];
  const percentage = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

  return (
    <div className="space-y-8">
      <Card className="border-primary/20 bg-primary-soft/30 p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-center">
          <div>
            <Badge variant={percentage === 100 ? "success" : "primary"}>
              {completedCount}/{lessons.length} lessons complete
            </Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em]">
              {percentage === 100 ? "Path complete — time to review and expand." : "Your next best step is ready."}
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted">
              {percentage === 100
                ? `You completed every lesson in ${path.title}. Revisit weak spots or jump into a new roadmap.`
                : `Continue with ${nextLesson.title}. This keeps the learning path sequential instead of making you choose from a blank dashboard.`}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href={`/visualizers/${nextLesson.slug}`}>
                {percentage === 100 ? "Review path" : "Continue next lesson"}
                <ArrowRight size={18} aria-hidden />
              </ButtonLink>
              <ButtonLink href="/progress" variant="outline">
                View progress
              </ButtonLink>
            </div>
          </div>
          <div className="rounded-[2rem] border border-border bg-background/80 p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-muted">Path progress</span>
              <span className="text-3xl font-bold">{percentage}%</span>
            </div>
            <div className="mt-4 h-3 rounded-full bg-border">
              <div className="h-3 rounded-full bg-primary transition-all" style={{ width: `${percentage}%` }} />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-surface-muted p-3">
                <p className="text-muted">Lessons</p>
                <p className="mt-1 font-bold">{lessons.length}</p>
              </div>
              <div className="rounded-2xl bg-surface-muted p-3">
                <p className="text-muted">Estimate</p>
                <p className="mt-1 font-bold">{totalMinutes} min</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <section>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-[-0.03em]">Lesson sequence</h2>
            <p className="mt-2 text-muted">Cards now show done/current/up-next status so learners know what to do.</p>
          </div>
          <Badge variant="warning">Completion-aware</Badge>
        </div>
        <div className="mt-5 grid gap-5">
          {lessons.map((lesson, index) => {
            const completed = completedLessons.includes(lesson.slug);
            const current = lesson.slug === nextLesson.slug && percentage < 100;

            return (
              <PathLessonRow
                key={lesson.id}
                lesson={lesson}
                index={index}
                completed={completed}
                current={current}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

function PathLessonRow({
  lesson,
  index,
  completed,
  current,
}: {
  lesson: ConceptLesson;
  index: number;
  completed: boolean;
  current: boolean;
}) {
  return (
    <Card
      className={cn(
        "grid gap-5 transition hover:border-primary/40 md:grid-cols-[auto_1fr_auto] md:items-center",
        current ? "border-primary/50 bg-primary-soft/25" : "",
      )}
    >
      <div
        className={cn(
          "grid size-14 place-items-center rounded-2xl border text-sm font-bold",
          completed
            ? "border-success/30 bg-success/10 text-success"
            : current
              ? "border-primary/40 bg-primary-soft text-primary"
              : "border-border bg-surface-muted text-muted",
        )}
      >
        {completed ? <CheckCircle2 size={22} aria-hidden /> : current ? <Sparkles size={22} aria-hidden /> : index + 1}
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={completed ? "success" : current ? "primary" : "warning"}>
            {completed ? "Done" : current ? "Current" : "Up next"}
          </Badge>
          <span className="inline-flex items-center gap-2 text-sm text-muted">
            <Clock size={15} aria-hidden />
            {lesson.estimatedMinutes} min
          </span>
        </div>
        <h3 className="mt-3 text-xl font-bold">{lesson.title}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{lesson.shortDescription}</p>
      </div>
      <Link
        href={`/visualizers/${lesson.slug}`}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold transition hover:border-primary/50 hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <PlayCircle size={16} aria-hidden />
        {completed ? "Review" : current ? "Continue" : "Preview"}
        <ArrowRight size={16} aria-hidden />
      </Link>
    </Card>
  );
}
