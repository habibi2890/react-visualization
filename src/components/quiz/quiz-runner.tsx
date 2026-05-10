"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { concepts } from "@/content/lessons";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/stores/progress-store";

export function QuizRunner() {
  const [selectedConceptSlug, setSelectedConceptSlug] = useState(concepts[0].slug);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const saveQuizScore = useProgressStore((state) => state.saveQuizScore);
  const markComplete = useProgressStore((state) => state.markComplete);
  const quizScores = useProgressStore((state) => state.quizScores);

  const concept = concepts.find((item) => item.slug === selectedConceptSlug) ?? concepts[0];
  const question = concept.quiz[0];
  const correct = selectedAnswer === question.correctOptionIndex;

  function chooseConcept(slug: string) {
    setSelectedConceptSlug(slug);
    setSelectedAnswer(null);
    setSubmitted(false);
  }

  function submitAnswer() {
    if (selectedAnswer === null) return;

    const score = correct ? 100 : 0;
    saveQuizScore(concept.slug, score);

    if (correct) {
      markComplete(concept.slug);
    }

    setSubmitted(true);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-3">
        {concepts.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => chooseConcept(item.slug)}
            className={cn(
              "w-full rounded-3xl border p-5 text-left transition",
              item.slug === concept.slug
                ? "border-primary bg-primary-soft/50"
                : "border-border bg-surface hover:border-primary/40",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-bold">{item.title}</p>
              {quizScores[item.slug] !== undefined ? (
                <Badge variant={quizScores[item.slug] === 100 ? "success" : "warning"}>
                  {quizScores[item.slug]}%
                </Badge>
              ) : null}
            </div>
            <p className="mt-2 text-sm text-muted">{item.estimatedMinutes} min lesson</p>
          </button>
        ))}
      </aside>

      <Card>
        <Badge variant="warning">Challenge</Badge>
        <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em]">{concept.title}</h2>
        <p className="mt-3 text-lg font-semibold">{question.question}</p>

        <div className="mt-6 grid gap-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctOptionIndex;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setSelectedAnswer(index);
                  setSubmitted(false);
                }}
                className={cn(
                  "rounded-2xl border p-4 text-left transition",
                  isSelected ? "border-primary bg-primary-soft/50" : "border-border bg-surface-muted",
                  submitted && isCorrect && "border-success bg-success/10",
                  submitted && isSelected && !isCorrect && "border-danger bg-danger/10",
                )}
              >
                <span className="font-semibold">{String.fromCharCode(65 + index)}.</span> {option}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" onClick={submitAnswer} disabled={selectedAnswer === null}>
            Submit answer
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setSelectedAnswer(null);
              setSubmitted(false);
            }}
          >
            Reset
          </Button>
        </div>

        {submitted ? (
          <div
            className={cn(
              "mt-6 flex gap-3 rounded-2xl border p-5",
              correct ? "border-success/30 bg-success/10" : "border-danger/30 bg-danger/10",
            )}
          >
            {correct ? (
              <CheckCircle2 className="mt-0.5 text-success" aria-hidden />
            ) : (
              <XCircle className="mt-0.5 text-danger" aria-hidden />
            )}
            <div>
              <p className="font-bold">{correct ? "Correct mental model." : "Not quite yet."}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{question.explanation}</p>
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
