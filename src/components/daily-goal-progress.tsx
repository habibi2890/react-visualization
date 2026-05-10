"use client";

import { ArrowRight, Clock, Flame, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { concepts } from "@/content/lessons";
import { useProgressStore, type RecentActivityItem } from "@/stores/progress-store";

const activityMinutes = {
  completed: 12,
  quiz: 4,
  playground: 8,
  note: 2,
  bookmark: 1,
};

export function DailyGoalProgress({ compact = false }: { compact?: boolean }) {
  const completedLessons = useProgressStore((state) => state.completedLessons);
  const recentActivity = useProgressStore((state) => state.recentActivity);
  const dailyGoalMinutes = useProgressStore((state) => state.preferences.dailyGoalMinutes);
  const todaysActivity = recentActivity.filter(isToday);
  const minutesToday = todaysActivity.reduce((sum, activity) => sum + estimateMinutes(activity), 0);
  const percentage = Math.min(100, Math.round((minutesToday / dailyGoalMinutes) * 100));
  const remaining = Math.max(dailyGoalMinutes - minutesToday, 0);
  const nextLesson = concepts.find((concept) => !completedLessons.includes(concept.slug)) ?? concepts[0];

  return (
    <Card className="border-primary/20 bg-primary-soft/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge variant={remaining === 0 ? "success" : "primary"}>Daily goal</Badge>
          <h2 className="mt-3 text-2xl font-bold">Today&apos;s learning momentum</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            {remaining === 0
              ? "Goal reached. Review a saved concept if you want to keep momentum."
              : `${remaining} minutes left to reach your ${dailyGoalMinutes}-minute goal.`}
          </p>
        </div>
        <div className="grid size-14 place-items-center rounded-2xl bg-background text-primary">
          {remaining === 0 ? <Flame size={24} aria-hidden /> : <Target size={24} aria-hidden />}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-semibold text-muted">{minutesToday}/{dailyGoalMinutes} minutes</span>
          <span className="text-2xl font-bold">{percentage}%</span>
        </div>
        <div className="mt-3 h-3 rounded-full bg-border">
          <div className="h-3 rounded-full bg-primary transition-all" style={{ width: `${percentage}%` }} />
        </div>
      </div>

      {!compact ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <GoalMetric label="Activities today" value={todaysActivity.length.toString()} />
          <GoalMetric label="Goal size" value={`${dailyGoalMinutes}m`} />
          <GoalMetric label="Remaining" value={`${remaining}m`} />
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href={`/visualizers/${nextLesson.slug}`}>
          Continue goal
          <ArrowRight size={16} aria-hidden />
        </ButtonLink>
        <ButtonLink href="/playground" variant="outline">
          <Clock size={16} aria-hidden />
          Practice now
        </ButtonLink>
      </div>
    </Card>
  );
}

function GoalMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-background/80 p-3">
      <p className="text-lg font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  );
}

function isToday(activity: RecentActivityItem) {
  return new Date(activity.createdAt).toDateString() === new Date().toDateString();
}

function estimateMinutes(activity: RecentActivityItem) {
  if (activity.type === "completed") {
    return concepts.find((concept) => concept.slug === activity.slug)?.estimatedMinutes ?? activityMinutes.completed;
  }

  return activityMinutes[activity.type];
}
