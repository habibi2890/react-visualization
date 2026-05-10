"use client";

import { BookMarked, CheckCircle2, NotebookPen, Puzzle, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { concepts } from "@/content/lessons";
import { useProgressStore, type RecentActivityItem, type RecentActivityType } from "@/stores/progress-store";

const activityMeta: Record<RecentActivityType, { label: string; icon: typeof CheckCircle2; description: string }> = {
  completed: {
    label: "Lesson completed",
    icon: CheckCircle2,
    description: "You locked in a visual concept.",
  },
  quiz: {
    label: "Quiz attempt",
    icon: Trophy,
    description: "You checked your mental model.",
  },
  playground: {
    label: "Practice attempt",
    icon: Puzzle,
    description: "You practiced by editing code.",
  },
  note: {
    label: "Note saved",
    icon: NotebookPen,
    description: "You wrote the concept in your own words.",
  },
  bookmark: {
    label: "Saved for review",
    icon: BookMarked,
    description: "You added this concept to the review queue.",
  },
};

export function RecentActivity({ compact = false }: { compact?: boolean }) {
  const recentActivity = useProgressStore((state) => state.recentActivity);
  const visibleActivity = recentActivity.slice(0, compact ? 3 : 6);

  return (
    <Card>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge variant="primary">Recent activity</Badge>
          <h2 className="mt-3 text-2xl font-bold">Your latest learning moves</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            A lightweight timeline helps learners remember momentum after quizzes, notes, and practice.
          </p>
        </div>
        <ButtonLink href="/progress" variant="ghost">
          View progress
        </ButtonLink>
      </div>

      {visibleActivity.length ? (
        <div className="mt-6 grid gap-3">
          {visibleActivity.map((activity) => (
            <ActivityRow key={activity.id} activity={activity} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-border bg-surface-muted p-5">
          <p className="font-semibold">No recent actions yet.</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Complete a lesson, take a quiz, save notes, or try the playground to start the timeline.
          </p>
        </div>
      )}
    </Card>
  );
}

function ActivityRow({ activity }: { activity: RecentActivityItem }) {
  const meta = activityMeta[activity.type];
  const concept = concepts.find((item) => item.slug === activity.slug);
  const Icon = meta.icon;
  const href = activity.type === "quiz" ? "/quiz" : `/visualizers/${activity.slug}`;

  return (
    <a
      href={href}
      className="flex gap-4 rounded-3xl border border-border bg-surface-muted p-4 transition hover:border-primary/50 hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
        <Icon size={19} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-bold">{meta.label}</span>
          {activity.value !== undefined ? <Badge variant={activity.value >= 100 ? "success" : "warning"}>{activity.value}%</Badge> : null}
        </span>
        <span className="mt-1 block text-sm leading-6 text-muted">
          {concept?.title ?? activity.slug} · {meta.description}
        </span>
      </span>
    </a>
  );
}
