"use client";

import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ConceptLesson } from "@/types/lesson";

export function useStepPlayer(stepCount: number) {
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;

    const id = window.setInterval(() => {
      setStepIndex((current) => {
        if (current >= stepCount - 1) {
          setPlaying(false);
          return current;
        }

        return current + 1;
      });
    }, 2200);

    return () => window.clearInterval(id);
  }, [playing, stepCount]);

  return {
    stepIndex,
    setStepIndex,
    playing,
    setPlaying,
    next: () => setStepIndex((value) => Math.min(stepCount - 1, value + 1)),
    previous: () => setStepIndex((value) => Math.max(0, value - 1)),
    reset: () => {
      setStepIndex(0);
      setPlaying(false);
    },
  };
}

export function StepExplanation({
  lesson,
  stepIndex,
  playing,
  onPrevious,
  onReset,
  onTogglePlay,
  onNext,
}: {
  lesson: ConceptLesson;
  stepIndex: number;
  playing: boolean;
  onPrevious: () => void;
  onReset: () => void;
  onTogglePlay: () => void;
  onNext: () => void;
}) {
  const step = lesson.steps[stepIndex];

  return (
    <Card>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <Badge variant="primary">
            Step {stepIndex + 1} of {lesson.steps.length}
          </Badge>
          <h2 className="mt-3 text-2xl font-bold">{step.title}</h2>
          <p className="mt-2 leading-7 text-muted">{step.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            disabled={stepIndex === 0}
            aria-label="Previous step"
          >
            <ArrowLeft size={16} aria-hidden />
            Back
          </Button>
          <Button type="button" variant="outline" onClick={onReset}>
            <RotateCcw size={16} aria-hidden />
            Reset
          </Button>
          <Button type="button" onClick={onTogglePlay}>
            {playing ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
            {playing ? "Pause" : "Play"}
          </Button>
          <Button
            type="button"
            onClick={onNext}
            disabled={stepIndex === lesson.steps.length - 1}
          >
            Next
            <ArrowRight size={16} aria-hidden />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function Timeline({
  lesson,
  stepIndex,
  title = "Timeline",
}: {
  lesson: ConceptLesson;
  stepIndex: number;
  title?: string;
}) {
  const timeline = useMemo(() => lesson.steps.slice(0, stepIndex + 1), [lesson, stepIndex]);

  return (
    <Card>
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {timeline.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "rounded-2xl border p-4",
              index === timeline.length - 1
                ? "border-primary bg-primary-soft/60"
                : "border-border bg-surface-muted",
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-2 font-bold">{item.timelineEvent}</p>
            <p className="mt-2 text-xs leading-5 text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function QuizPanel({ lesson }: { lesson: ConceptLesson }) {
  const question = lesson.quiz[0];

  return (
    <Card>
      <Badge variant="warning">Mini quiz</Badge>
      <h2 className="mt-3 text-xl font-bold">{question.question}</h2>
      <div className="mt-4 space-y-2">
        {question.options.map((option, index) => (
          <button
            key={option}
            type="button"
            className={cn(
              "w-full rounded-2xl border px-4 py-3 text-left text-sm transition hover:border-primary/50",
              index === question.correctOptionIndex
                ? "border-success/40 bg-success/10"
                : "border-border bg-surface-muted",
            )}
          >
            {option}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">{question.explanation}</p>
    </Card>
  );
}
