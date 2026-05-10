"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  QuizPanel,
  StepExplanation,
  Timeline,
  useStepPlayer,
} from "@/components/visualizers/shared-controls";
import { propsVsStateLesson } from "@/content/lessons";
import { cn } from "@/lib/utils";

const lesson = propsVsStateLesson;
const code = lesson.codeExamples[0].code;

export function PropsVsStateVisualizer() {
  const player = useStepPlayer(lesson.steps.length);
  const { stepIndex, playing } = player;
  const step = lesson.steps[stepIndex];

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
        <StepExplanation
          lesson={lesson}
          stepIndex={stepIndex}
          playing={playing}
          onPrevious={player.previous}
          onReset={player.reset}
          onTogglePlay={() => player.setPlaying((value) => !value)}
          onNext={player.next}
        />
        <QuizPanel lesson={lesson} />
      </div>

      <Timeline lesson={lesson} stepIndex={stepIndex} title="Render timeline" />
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
