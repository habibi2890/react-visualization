"use client";

import { CheckCircle2, Circle, RefreshCw, ShieldAlert, Zap } from "lucide-react";
import { BookmarkButton, CompleteLessonButton } from "@/components/bookmark-button";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  QuizPanel,
  StepExplanation,
  Timeline,
  useStepPlayer,
} from "@/components/visualizers/shared-controls";
import { useEffectDependencyLesson } from "@/content/lessons";
import { cn } from "@/lib/utils";

const lesson = useEffectDependencyLesson;
const code = lesson.codeExamples[0].code;

const dependencyStates = [
  { previous: "—", current: "42", changed: true, status: "first render" },
  { previous: "—", current: "42", changed: true, status: "run effect" },
  { previous: "42", current: "42", changed: false, status: "skip effect" },
  { previous: "42", current: "99", changed: true, status: "cleanup first" },
  { previous: "42", current: "99", changed: true, status: "new effect" },
  { previous: "42", current: "99", changed: true, status: "missing dependency" },
];

export function UseEffectDependencyVisualizer() {
  const player = useStepPlayer(lesson.steps.length);
  const { stepIndex, playing } = player;
  const step = lesson.steps[stepIndex];
  const dep = dependencyStates[stepIndex];

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <section aria-label="Code panel">
          <CodeBlock code={code} activeLines={step.activeCodeLines} />
        </section>

        <section className="grid gap-5" aria-label="Effect visualization">
          <Card>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Dependency watch list</h2>
                <p className="mt-1 text-sm text-muted">
                  React compares previous and current dependency values after render.
                </p>
              </div>
              <Badge variant={step.showMistake ? "danger" : dep.changed ? "warning" : "success"}>
                {dep.status}
              </Badge>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <DependencyChip label="previous userId" value={dep.previous} muted />
              <DependencyChip label="current userId" value={dep.current} active={dep.changed} />
              <DependencyChip
                label="result"
                value={dep.changed ? "changed" : "same"}
                active={dep.changed}
                success={!dep.changed}
              />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {["Render", "Compare", "Cleanup", "Effect"].map((item) => {
                const active = step.activeComponents.some((component) =>
                  component.toLowerCase().includes(item.toLowerCase()),
                );

                return (
                  <div
                    key={item}
                    className={cn(
                      "rounded-2xl border p-4 text-center transition",
                      active
                        ? "border-primary bg-primary-soft/60"
                        : "border-border bg-surface-muted",
                    )}
                  >
                    <div className="mx-auto mb-3 grid size-10 place-items-center rounded-full bg-surface">
                      {item === "Render" ? (
                        <RefreshCw size={18} className="text-primary" />
                      ) : item === "Compare" ? (
                        <Circle size={18} className="text-accent" />
                      ) : item === "Cleanup" ? (
                        <ShieldAlert size={18} className="text-warning" />
                      ) : (
                        <Zap size={18} className="text-success" />
                      )}
                    </div>
                    <p className="font-semibold">{item}</p>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold">What React decides</h2>
            <div className="mt-5 space-y-3">
              {step.inspectorNotes.map((note) => (
                <div key={note} className="flex gap-3 rounded-2xl bg-surface-muted p-4">
                  <CheckCircle2 size={18} className="mt-0.5 text-success" aria-hidden />
                  <p className="text-sm text-muted">{note}</p>
                </div>
              ))}
            </div>
            {step.showMistake ? (
              <div className="mt-5 rounded-2xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger">
                The effect reads <strong>userId</strong>, so the dependency array should include it.
              </div>
            ) : null}
          </Card>
        </section>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <div className="grid gap-3">
          <StepExplanation
            lesson={lesson}
            stepIndex={stepIndex}
            playing={playing}
            onPrevious={player.previous}
            onReset={player.reset}
            onTogglePlay={() => player.setPlaying((value) => !value)}
            onNext={player.next}
          />
          <div className="flex flex-wrap gap-3">
            <BookmarkButton slug={lesson.slug} />
            <CompleteLessonButton slug={lesson.slug} />
          </div>
        </div>
        <QuizPanel lesson={lesson} />
      </div>

      <Timeline lesson={lesson} stepIndex={stepIndex} title="Effect timeline" />
    </div>
  );
}

function DependencyChip({
  label,
  value,
  active,
  muted,
  success,
}: {
  label: string;
  value: string;
  active?: boolean;
  muted?: boolean;
  success?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4",
        active && "border-warning/40 bg-warning/10",
        success && "border-success/40 bg-success/10",
        muted && "border-border bg-surface-muted",
        !active && !success && !muted && "border-border bg-surface",
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
