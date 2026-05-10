"use client";

import { ArrowDown, CheckCircle2, KeyRound, Plus, ShieldAlert } from "lucide-react";
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
import { keysListDiffingLesson } from "@/content/lessons";
import { cn } from "@/lib/utils";

const lesson = keysListDiffingLesson;
const before = [
  { key: "a1", text: "Learn props", note: "draft" },
  { key: "b2", text: "Practice state", note: "saved" },
  { key: "c3", text: "Review effects", note: "focus" },
];
const after = [{ key: "d4", text: "Fix keys", note: "new" }, ...before];

export function KeysListDiffingVisualizer() {
  const player = useStepPlayer(lesson.steps.length);
  const { stepIndex, playing } = player;
  const step = lesson.steps[stepIndex];
  const showAfter = stepIndex > 0;
  const showMistake = Boolean(step.showMistake);

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <section aria-label="Code panel">
          <CodeBlock code={lesson.codeExamples[0].code} activeLines={step.activeCodeLines} />
        </section>

        <section className="grid gap-5" aria-label="List diffing visualization">
          <Card>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Key-based diff</h2>
                <p className="mt-1 text-sm text-muted">
                  React matches old and new rows by key before it updates the DOM.
                </p>
              </div>
              <Badge variant={showMistake ? "danger" : "primary"}>{step.timelineEvent}</Badge>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_auto_1fr]">
              <ListPanel title="Before render" rows={before} activeKeys={["a1", "b2", "c3"]} />
              <div className="hidden items-center text-primary lg:flex">
                {showAfter ? <ArrowDown className="-rotate-90" aria-hidden /> : <Plus aria-hidden />}
              </div>
              <ListPanel
                title="Next render"
                rows={showAfter ? after : before}
                activeKeys={showAfter ? ["d4"] : []}
                mistake={showMistake}
              />
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold">Identity inspector</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {(showAfter ? after : before).map((row, index) => (
                <div
                  key={row.key}
                  className={cn(
                    "rounded-2xl border p-4",
                    row.key === "d4" ? "border-success/40 bg-success/10" : "border-border bg-surface-muted",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold">{row.text}</span>
                    <Badge variant={showMistake ? "danger" : "success"}>
                      {showMistake ? `key=${index}` : `key=${row.key}`}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted">Local note: {row.note}</p>
                </div>
              ))}
            </div>
            {showMistake ? (
              <div className="mt-5 flex gap-3 rounded-2xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger">
                <ShieldAlert size={18} className="mt-0.5 shrink-0" aria-hidden />
                <p>Index keys follow position, so local state can stick to the wrong todo after insert.</p>
              </div>
            ) : null}
          </Card>
        </section>
      </div>

      <Timeline lesson={lesson} stepIndex={stepIndex} title="Diff timeline" />

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

function ListPanel({
  title,
  rows,
  activeKeys,
  mistake = false,
}: {
  title: string;
  rows: typeof before;
  activeKeys: string[];
  mistake?: boolean;
}) {
  return (
    <div className="rounded-3xl border border-border bg-surface-muted p-4">
      <h3 className="font-bold">{title}</h3>
      <div className="mt-4 space-y-3">
        {rows.map((row, index) => (
          <div
            key={`${title}-${row.key}`}
            className={cn(
              "rounded-2xl border bg-surface p-4",
              activeKeys.includes(row.key) ? "border-success/50" : "border-border",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold">{row.text}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
                <KeyRound size={13} aria-hidden />
                {mistake ? index : row.key}
              </span>
            </div>
            <p className="mt-2 flex items-center gap-2 text-xs text-muted">
              <CheckCircle2 size={14} aria-hidden />
              state: {row.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
