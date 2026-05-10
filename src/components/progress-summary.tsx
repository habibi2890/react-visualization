"use client";

import { Award, BookOpen, Brain, Target } from "lucide-react";
import { ProgressRing } from "@/components/progress-ring";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { concepts, learningPaths } from "@/content/lessons";
import { useProgressStore } from "@/stores/progress-store";

export function ProgressSummary() {
  const completedLessons = useProgressStore((state) => state.completedLessons);
  const quizScores = useProgressStore((state) => state.quizScores);
  const playgroundAttempts = useProgressStore((state) => state.playgroundAttempts);

  const completedCount = concepts.filter((concept) => completedLessons.includes(concept.slug)).length;
  const overall = Math.round((completedCount / concepts.length) * 100);
  const quizAverage = Object.values(quizScores).length
    ? Math.round(Object.values(quizScores).reduce((sum, score) => sum + score, 0) / Object.values(quizScores).length)
    : 0;
  const attempts = Object.values(playgroundAttempts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-3">
        <MetricCard icon={BookOpen} label="Lessons completed" value={`${completedCount}/${concepts.length}`} />
        <MetricCard icon={Brain} label="Best quiz average" value={`${quizAverage}%`} />
        <MetricCard icon={Target} label="Playground attempts" value={attempts.toString()} />
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
