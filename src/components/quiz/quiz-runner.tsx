"use client";

import { ArrowRight, CheckCircle2, RotateCcw, Trophy, XCircle } from "lucide-react";
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
  const [answeredCount, setAnsweredCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const saveQuizScore = useProgressStore((state) => state.saveQuizScore);
  const markComplete = useProgressStore((state) => state.markComplete);
  const quizScores = useProgressStore((state) => state.quizScores);

  const concept = concepts.find((item) => item.slug === selectedConceptSlug) ?? concepts[0];
  const question = concept.quiz[0];
  const correct = selectedAnswer === question.correctOptionIndex;
  const currentScore = answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0;
  const bestScore = Math.max(...Object.values(quizScores), 0);

  function chooseConcept(slug: string) {
    setSelectedConceptSlug(slug);
    setSelectedAnswer(null);
    setSubmitted(false);
  }

  function submitAnswer() {
    if (selectedAnswer === null) return;

    const score = correct ? 100 : 0;
    saveQuizScore(concept.slug, score);
    setAnsweredCount((count) => count + 1);
    setCorrectCount((count) => count + (correct ? 1 : 0));

    if (correct) {
      markComplete(concept.slug);
    }

    setSubmitted(true);
  }

  function nextQuestion() {
    const currentIndex = concepts.findIndex((item) => item.slug === concept.slug);
    const nextConcept = concepts[(currentIndex + 1) % concepts.length];

    chooseConcept(nextConcept.slug);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-3">
        <Card>
          <div className="flex items-center gap-3">
            <Trophy className="text-warning" aria-hidden />
            <h2 className="font-bold">Quiz progress</h2>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Metric label="Session" value={`${currentScore}%`} />
            <Metric label="Best" value={`${bestScore}%`} />
          </div>
          <p className="mt-4 text-sm leading-6 text-muted">
            Answer, read the feedback, then move to the next concept when the mental model feels clear.
          </p>
        </Card>

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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge variant="warning">Challenge</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em]">{concept.title}</h2>
            <p className="mt-3 text-lg font-semibold">{question.question}</p>
          </div>
          <div className="rounded-2xl bg-surface-muted p-4 text-sm text-muted">
            <span className="font-semibold text-foreground">{answeredCount}</span> answered this session
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctOptionIndex;

            return (
              <button
                key={option}
                type="button"
                disabled={submitted}
                onClick={() => {
                  setSelectedAnswer(index);
                  setSubmitted(false);
                }}
                className={cn(
                  "rounded-2xl border p-4 text-left transition",
                  isSelected ? "border-primary bg-primary-soft/50" : "border-border bg-surface-muted",
                  submitted && isCorrect && "border-success bg-success/10",
                  submitted && isSelected && !isCorrect && "border-danger bg-danger/10",
                  submitted && "cursor-default",
                )}
              >
                <span className="flex items-start justify-between gap-3">
                  <span>
                    <span className="font-semibold">{String.fromCharCode(65 + index)}.</span> {option}
                  </span>
                  {submitted && isCorrect ? <CheckCircle2 size={18} className="text-success" aria-label="Correct option" /> : null}
                  {submitted && isSelected && !isCorrect ? (
                    <XCircle size={18} className="text-danger" aria-label="Selected wrong option" />
                  ) : null}
                </span>
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
            <RotateCcw size={16} aria-hidden />
            Reset
          </Button>
          {submitted ? (
            <Button type="button" variant="ghost" onClick={nextQuestion}>
              Next concept
              <ArrowRight size={16} aria-hidden />
            </Button>
          ) : null}
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
              {!correct ? (
                <p className="mt-3 rounded-xl bg-background/70 p-3 text-sm font-semibold">
                  Correct answer: {question.options[question.correctOptionIndex]}
                </p>
              ) : null}
              <div className="mt-4 rounded-xl bg-background/70 p-3 text-sm text-muted">
                Best saved score for this concept: <span className="font-semibold text-foreground">{quizScores[concept.slug] ?? 0}%</span>
              </div>
            </div>
          </div>
        ) : null}
      </Card>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface-muted p-3">
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs font-semibold text-muted">{label}</p>
    </div>
  );
}
