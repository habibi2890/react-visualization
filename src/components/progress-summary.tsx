"use client";

import { Award, BookOpen, Brain, Compass, NotebookPen, Target } from "lucide-react";
import { DailyGoalProgress } from "@/components/daily-goal-progress";
import { ProgressRing } from "@/components/progress-ring";
import { RecentActivity } from "@/components/recent-activity";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { concepts, learningPaths } from "@/content/lessons";
import { useProgressStore } from "@/stores/progress-store";

const skillLabels = {
  react: "React fundamentals",
  hooks: "Hooks",
  nextjs: "Next.js",
  "state-management": "State management",
  performance: "Performance",
  mistakes: "Mistakes",
};

export function ProgressSummary() {
  const completedLessons = useProgressStore((state) => state.completedLessons);
  const quizScores = useProgressStore((state) => state.quizScores);
  const playgroundAttempts = useProgressStore((state) => state.playgroundAttempts);
  const lessonNotes = useProgressStore((state) => state.lessonNotes);

  const completedCount = concepts.filter((concept) => completedLessons.includes(concept.slug)).length;
  const overall = Math.round((completedCount / concepts.length) * 100);
  const quizAverage = Object.values(quizScores).length
    ? Math.round(Object.values(quizScores).reduce((sum, score) => sum + score, 0) / Object.values(quizScores).length)
    : 0;
  const attempts = Object.values(playgroundAttempts).reduce((sum, count) => sum + count, 0);
  const notesCount = Object.values(lessonNotes).filter((note) => note.trim()).length;
  const nextReviewLesson =
    concepts.find((concept) => !completedLessons.includes(concept.slug) || (quizScores[concept.slug] ?? 0) < 100) ??
    concepts[0];
  const skillGroups = concepts.reduce<Record<string, typeof concepts>>((groups, concept) => {
    return {
      ...groups,
      [concept.category]: [...(groups[concept.category] ?? []), concept],
    };
  }, {});

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-4">
        <MetricCard icon={BookOpen} label="Lessons completed" value={`${completedCount}/${concepts.length}`} />
        <MetricCard icon={Brain} label="Best quiz average" value={`${quizAverage}%`} />
        <MetricCard icon={Target} label="Playground attempts" value={attempts.toString()} />
        <MetricCard icon={NotebookPen} label="Notes captured" value={notesCount.toString()} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {learningPaths.map((path) => {
          const pathCompleted = path.lessonSlugs.filter((slug) => completedLessons.includes(slug)).length;
          const value = Math.round((pathCompleted / path.lessonSlugs.length) * 100);

          return (
            <Card key={path.id}>
              <ProgressRing value={value} label={path.title} />
            </Card>
          );
        })}
      </div>

      <DailyGoalProgress />

      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge variant="primary">Skill map</Badge>
            <h2 className="mt-3 text-2xl font-bold">Where your mental models are forming</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Each skill combines completion, quiz score, and whether you captured notes in your own words.
            </p>
          </div>
          <ButtonLink href="/roadmaps" variant="outline">
            View roadmaps
          </ButtonLink>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {Object.entries(skillGroups).map(([category, lessons]) => {
            const completedInSkill = lessons.filter((lesson) => completedLessons.includes(lesson.slug)).length;
            const skillQuizAverage = Math.round(
              lessons.reduce((sum, lesson) => sum + (quizScores[lesson.slug] ?? 0), 0) / lessons.length,
            );
            const notesInSkill = lessons.filter((lesson) => lessonNotes[lesson.slug]?.trim()).length;
            const value = Math.round(
              ((completedInSkill / lessons.length) * 50) + (skillQuizAverage * 0.35) + ((notesInSkill / lessons.length) * 15),
            );

            return (
              <div key={category} className="rounded-3xl border border-border bg-surface-muted p-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold">{skillLabels[category as keyof typeof skillLabels]}</h3>
                  <Badge variant={value >= 70 ? "success" : "warning"}>{value}%</Badge>
                </div>
                <div className="mt-4 h-3 rounded-full bg-border">
                  <div className="h-3 rounded-full bg-primary transition-all" style={{ width: `${value}%` }} />
                </div>
                <p className="mt-3 text-sm text-muted">
                  {completedInSkill}/{lessons.length} complete · {skillQuizAverage}% quiz · {notesInSkill} notes
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="border-warning/20 bg-warning/5">
        <div className="flex items-center gap-3">
          <Compass className="text-warning" aria-hidden />
          <h2 className="text-xl font-bold">Weak area to review next</h2>
        </div>
        <p className="mt-3 max-w-3xl text-muted">
          {nextReviewLesson.title} is the best next review because it is unfinished or does not have a perfect saved quiz score yet.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <ButtonLink href={`/visualizers/${nextReviewLesson.slug}`}>Review visualizer</ButtonLink>
          <ButtonLink href="/quiz" variant="outline">Retake quiz</ButtonLink>
          <ButtonLink href="/bookmarks" variant="ghost">Open review queue</ButtonLink>
        </div>
      </Card>

      <RecentActivity />

      <Card>
        <div className="flex items-center gap-3">
          <Award className="text-success" aria-hidden />
          <h2 className="text-xl font-bold">Next best action</h2>
        </div>
        <p className="mt-3 text-muted">
          {overall >= 100
            ? "You completed the current MVP concept set. Try the playground challenges next."
            : "Complete the next unfinished visualizer, then take its quiz to lock in the mental model."}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <ButtonLink href="/visualizers/use-effect-dependency-array">Continue learning</ButtonLink>
          <ButtonLink href="/playground" variant="outline">Open playground</ButtonLink>
        </div>
      </Card>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <div className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
          <Icon size={22} aria-hidden />
        </div>
        <Badge variant="success">Live</Badge>
      </div>
      <p className="mt-5 text-3xl font-bold">{value}</p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </Card>
  );
}
