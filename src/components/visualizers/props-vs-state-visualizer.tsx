"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { propsVsStateLesson } from "@/content/lessons";
import { cn } from "@/lib/utils";

const lesson = propsVsStateLesson;
const code = lesson.codeExamples[0].code;

export function PropsVsStateVisualizer() {
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const step = lesson.steps[stepIndex];

  useEffect(() => {
    if (!playing) return;

    const id = window.setInterval(() => {
      setStepIndex((current) => {
        if (current >= lesson.steps.length - 1) {
          setPlaying(false);
          return current;
        }

        return current + 1;
      });
    }, 2200);

    return () => window.clearInterval(id);
  }, [playing]);

  const timeline = useMemo(() => lesson.steps.slice(0, stepIndex + 1), [stepIndex]);

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <section aria-label="Code panel">
          <CodeBlock code={code} activeLines={step.activeCodeLines} />
        </section>

        <section aria-label="Component tree panel" className="grid gap-5">
          <ComponentTree stepIndex={stepIndex} />
          <div className="grid gap-5 md:grid-cols-2">
            <InspectorPanel
              title="State inspector"
              rows={[
                ["Component", "ProductPage"],
                ["State", "quantity"],
                ["Previous", step.previousStateValue?.toString() ?? "—"],
                ["Current", step.stateValue?.toString() ?? "1"],
              ]}
            />
            <InspectorPanel
              title="Props inspector"
              rows={[
                ["From", "ProductPage"],
                ["To", "ProductCard"],
                ["quantity", `${step.propValue ?? 1} · read-only`],
                ["onAdd", "function · read-only"],
              ]}
            />
          </div>
        </section>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
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
                onClick={() => setStepIndex((value) => Math.max(0, value - 1))}
                disabled={stepIndex === 0}
                aria-label="Previous step"
              >
                <ArrowLeft size={16} aria-hidden />
                Back
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setStepIndex(0);
                  setPlaying(false);
                }}
              >
                <RotateCcw size={16} aria-hidden />
                Reset
              </Button>
              <Button type="button" onClick={() => setPlaying((value) => !value)}>
                {playing ? <Pause size={16} aria-hidden /> : <Play size={16} aria-hidden />}
                {playing ? "Pause" : "Play"}
              </Button>
              <Button
                type="button"
                onClick={() => setStepIndex((value) => Math.min(lesson.steps.length - 1, value + 1))}
                disabled={stepIndex === lesson.steps.length - 1}
              >
                Next
                <ArrowRight size={16} aria-hidden />
              </Button>
            </div>
          </div>
        </Card>

        <QuizCard />
      </div>

      <Card>
        <h2 className="text-xl font-bold">Render timeline</h2>
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
    </div>
  );
}

function ComponentTree({ stepIndex }: { stepIndex: number }) {
  const step = lesson.steps[stepIndex];
  const quantity = step.stateValue ?? 1;
  const propValue = step.propValue ?? 1;

  return (
    <Card className="relative min-h-[420px] overflow-hidden">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Component tree</h2>
          <p className="mt-1 text-sm text-muted">State ownership, props flow, and re-render highlights.</p>
        </div>
        <Badge variant={step.showMistake ? "danger" : "success"}>
          {step.showMistake ? "Mistake mode" : "Live model"}
        </Badge>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-5">
          <ComponentNode
            name="ProductPage"
            active={step.activeComponents.includes("ProductPage")}
            badge={`state: quantity = ${quantity}`}
            variant="parent"
          />
          <div className="relative ml-7 h-16 border-l-2 border-dashed border-primary/40">
            <AnimatePresence>
              {step.showPropFlow ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 28 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-4 top-0 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-bold text-accent"
                >
                  props: quantity {propValue}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <ComponentNode
            name="ProductCard"
            active={step.activeComponents.includes("ProductCard")}
            badge={`prop: quantity = ${propValue}`}
            variant="child"
          />
        </div>

        <div className="rounded-3xl border border-border bg-surface-muted p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">
            UI preview
          </p>
          <article className="mt-4 rounded-3xl border border-border bg-surface p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Product card
            </p>
            <h3 className="mt-3 text-2xl font-bold">React Sticker</h3>
            <p className="mt-2 text-muted">$5</p>
            <p className="mt-4 rounded-2xl bg-primary-soft px-4 py-3 font-semibold text-primary">
              Quantity: {propValue}
            </p>
            <button
              type="button"
              className="mt-4 w-full rounded-2xl bg-foreground px-4 py-3 text-sm font-bold text-background"
            >
              Add one
            </button>
          </article>
          {step.showMistake ? (
            <div className="mt-4 rounded-2xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger">
              <strong>Common mistake:</strong> props.quantity = props.quantity + 1
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

function ComponentNode({
  name,
  badge,
  active,
  variant,
}: {
  name: string;
  badge: string;
  active: boolean;
  variant: "parent" | "child";
}) {
  return (
    <motion.div
      animate={{
        scale: active ? 1.02 : 1,
      }}
      className={cn(
        "rounded-3xl border p-5 transition",
        active
          ? "border-primary bg-primary-soft/45 shadow-lg shadow-blue-500/10"
          : "border-border bg-surface",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            {variant === "parent" ? "Parent component" : "Child component"}
          </p>
          <h3 className="mt-2 text-xl font-bold">{name}</h3>
        </div>
        <Badge variant={variant === "parent" ? "primary" : "default"}>{badge}</Badge>
      </div>
    </motion.div>
  );
}

function InspectorPanel({
  title,
  rows,
}: {
  title: string;
  rows: Array<[string, string]>;
}) {
  return (
    <Card>
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-4 space-y-2">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-3 rounded-2xl bg-surface-muted px-4 py-3 text-sm"
          >
            <span className="text-muted">{label}</span>
            <span className="font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function QuizCard() {
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
