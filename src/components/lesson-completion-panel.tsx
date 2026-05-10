"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { concepts, learningPaths } from "@/content/lessons";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/stores/progress-store";

function getNextStep(slug: string) {
  const path = learningPaths.find((item) => item.lessonSlugs.includes(slug));

  if (!path) {
    return {
      href: "/concepts",
      label: "Browse more concepts",
      description: "Keep exploring the concept library.",
    };
  }

  const currentIndex = path.lessonSlugs.indexOf(slug);
  const nextSlug = path.lessonSlugs[currentIndex + 1];

  if (!nextSlug) {
    return {
      href: `/paths/${path.slug}`,
      label: "Review full path",
      description: `You reached the end of ${path.title}. Review the path and choose the next branch.`,
    };
  }

  const nextConcept = concepts.find((item) => item.slug === nextSlug);

  return {
    href: `/visualizers/${nextSlug}`,
    label: nextConcept?.title ?? "Next visualizer",
    description: `Continue in ${path.title} with the next connected concept.`,
  };
}

export function LessonCompletionPanel({
  slug,
  mode = "visualizer",
}: {
  slug: string;
  mode?: "concept" | "visualizer";
}) {
  const completedLessons = useProgressStore((state) => state.completedLessons);
  const markComplete = useProgressStore((state) => state.markComplete);
  const completed = completedLessons.includes(slug);
  const nextStep = useMemo(() => getNextStep(slug), [slug]);
  const concept = concepts.find((item) => item.slug === slug);

  return (
    <Card className="border-primary/20 bg-primary-soft/35">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Badge variant={completed ? "success" : "primary"}>
            {completed ? "Lesson completed" : "Finish the lesson"}
          </Badge>
          <h2 className="mt-3 text-2xl font-bold">
            {completed ? "Nice work — keep the momentum." : "Ready to lock in this concept?"}
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted">
            {completed
              ? `You marked ${concept?.title ?? "this lesson"} as complete. The next step is ready when you are.`
              : mode === "visualizer"
                ? "Mark this visualizer complete after you step through the timeline, inspect the code, and answer the mini quiz."
                : "Mark this concept complete after you read the mental model, review the code, and open the visualizer."}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:min-w-72">
          <Button
            type="button"
            onClick={() => markComplete(slug)}
            disabled={completed}
            variant={completed ? "secondary" : "primary"}
            className="w-full"
          >
            <CheckCircle2 size={16} aria-hidden />
            {completed ? "Completed" : "Mark lesson complete"}
          </Button>
          <Link
            href={nextStep.href}
            className={cn(
              "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold transition",
              "hover:border-primary/50 hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            )}
          >
            <Sparkles size={16} aria-hidden />
            {nextStep.label}
            <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </div>
      <p className="mt-5 rounded-2xl border border-border bg-background/70 p-4 text-sm leading-6 text-muted">
        Next step: {nextStep.description}
      </p>
    </Card>
  );
}
