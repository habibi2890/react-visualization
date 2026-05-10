"use client";

import {
  ArrowRight,
  Bell,
  Code2,
  MousePointerClick,
  PackageCheck,
  RefreshCw,
  ScreenShare,
  ShieldAlert,
} from "lucide-react";
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
import { renderCycleLesson } from "@/content/lessons";
import { cn } from "@/lib/utils";

const lesson = renderCycleLesson;
const code = lesson.codeExamples[0].code;

const phases = [
  {
    id: "Event handler",
    title: "Event",
    description: "User action requests a change",
    icon: MousePointerClick,
  },
  {
    id: "Update queue",
    title: "Queue",
    description: "State update waits for render",
    icon: Bell,
  },
  {
    id: "Render phase",
    title: "Render",
    description: "React calculates next UI",
    icon: RefreshCw,
  },
  {
    id: "Commit phase",
    title: "Commit",
    description: "DOM updates on screen",
    icon: ScreenShare,
  },
  {
    id: "Effect",
    title: "Effects",
    description: "After-screen work runs",
    icon: PackageCheck,
  },
];

export function RenderCycleVisualizer() {
  const player = useStepPlayer(lesson.steps.length);
  const { stepIndex, playing } = player;
  const step = lesson.steps[stepIndex];
  const activePhaseIndex = Math.max(
    0,
    phases.findIndex((phase) =>
      step.activeComponents.some((component) => component.includes(phase.id)),
    ),
  );

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <section aria-label="Code panel">
          <CodeBlock code={code} activeLines={step.activeCodeLines} />
        </section>

        <section className="grid gap-5" aria-label="Render cycle visualization">
          <Card>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Render cycle pipeline</h2>
                <p className="mt-1 text-sm text-muted">
                  Follow a click through update queue, render, commit, and effects.
                </p>
              </div>
              <Badge variant={step.showMistake ? "danger" : "primary"}>{step.timelineEvent}</Badge>
            </div>

            <div className="mt-6 grid gap-3 lg:grid-cols-5">
              {phases.map((phase, index) => {
                const Icon = phase.icon;
                const active =
                  step.activeComponents.some((component) => component.includes(phase.id)) ||
                  activePhaseIndex === index;

                return (
                  <div key={phase.id} className="flex items-stretch gap-3 lg:block">
                    <div
                      className={cn(
                        "h-full rounded-3xl border p-4 transition",
                        active ? "border-primary bg-primary-soft/60" : "border-border bg-surface-muted",
                      )}
                    >
                      <div className="flex items-center gap-3 lg:block">
                        <div className="grid size-11 place-items-center rounded-2xl bg-surface text-primary">
                          <Icon size={20} aria-hidden />
                        </div>
                        <div>
                          <p className="font-bold lg:mt-4">{phase.title}</p>
                          <p className="mt-1 text-xs leading-5 text-muted">{phase.description}</p>
                        </div>
                      </div>
                    </div>
                    {index < phases.length - 1 ? (
                      <div className="hidden justify-center py-4 text-primary lg:flex">
                        <ArrowRight aria-hidden />
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="grid gap-5 lg:grid-cols-2">
            <Card>
              <h2 className="text-xl font-bold">State snapshot inspector</h2>
              <div className="mt-5 grid gap-3">
                <StateRow label="Previous committed state" value={step.previousStateValue ?? 0} />
                <StateRow label="Current render snapshot" value={step.stateValue ?? 0} />
                <StateRow
                  label="Visible button text"
                  value={step.activeComponents.includes("DOM") || step.activeComponents.includes("Effect") ? 1 : 0}
                />
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold">What React is doing</h2>
              <div className="mt-5 space-y-3">
                {step.inspectorNotes.map((note) => (
                  <div key={note} className="flex gap-3 rounded-2xl bg-surface-muted p-4 text-sm">
                    <Code2 size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                    <span className="text-muted">{note}</span>
                  </div>
                ))}
              </div>
              {step.showMistake ? (
                <div className="mt-5 flex gap-3 rounded-2xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger">
                  <ShieldAlert size={18} className="mt-0.5 shrink-0" aria-hidden />
                  <p>State variables are snapshots. The next value appears in the next render.</p>
                </div>
              ) : null}
            </Card>
          </div>
        </section>
      </div>

      <Timeline lesson={lesson} stepIndex={stepIndex} title="Render timeline" />

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
    </div>
  );
}

function StateRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface-muted px-4 py-3">
      <span className="text-sm text-muted">{label}</span>
      <span className="rounded-full bg-primary-soft px-3 py-1 text-sm font-bold text-primary">
        {value}
      </span>
    </div>
  );
}
