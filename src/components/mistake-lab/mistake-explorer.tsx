"use client";

import { Bug, CheckCircle2, Lightbulb, RotateCcw, Wrench, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { concepts } from "@/content/lessons";
import { cn } from "@/lib/utils";

const mistakeScenarios = concepts.flatMap((concept) =>
  concept.commonMistakes.map((mistake) => ({
    ...mistake,
    conceptSlug: concept.slug,
    conceptTitle: concept.title,
    category: concept.category,
  })),
);

export function MistakeExplorer() {
  const [selectedId, setSelectedId] = useState(mistakeScenarios[0].id);
  const [mode, setMode] = useState<"bug" | "why" | "fix">("bug");
  const scenario = useMemo(
    () => mistakeScenarios.find((mistake) => mistake.id === selectedId) ?? mistakeScenarios[0],
    [selectedId],
  );

  function selectScenario(id: string) {
    setSelectedId(id);
    setMode("bug");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
      <aside className="space-y-3">
        {mistakeScenarios.map((mistake) => (
          <button
            key={mistake.id}
            type="button"
            onClick={() => selectScenario(mistake.id)}
            className={cn(
              "w-full rounded-3xl border p-5 text-left transition",
              mistake.id === scenario.id
                ? "border-danger bg-danger/10"
                : "border-border bg-surface hover:border-danger/40",
            )}
          >
            <Badge variant="danger">{mistake.category}</Badge>
            <p className="mt-3 font-bold">{mistake.title}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{mistake.conceptTitle}</p>
          </button>
        ))}
      </aside>

      <div className="grid gap-6">
        <Card>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <Badge variant="danger">Mistake simulator</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em]">{scenario.title}</h2>
              <p className="mt-3 max-w-2xl text-muted">
                Trigger the mistake, inspect why it happened, then reveal the safer mental model.
              </p>
            </div>
            <ButtonLink href={`/visualizers/${scenario.conceptSlug}`} variant="outline">
              Review visualizer
            </ButtonLink>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-4">
            <CodeBlock code={scenario.brokenCode} activeLines={[2, 3]} />
            <div className="flex flex-wrap gap-3">
              <Button type="button" variant={mode === "bug" ? "danger" : "outline"} onClick={() => setMode("bug")}>
                <Bug size={16} aria-hidden />
                Trigger bug
              </Button>
              <Button type="button" variant={mode === "why" ? "secondary" : "outline"} onClick={() => setMode("why")}>
                <Lightbulb size={16} aria-hidden />
                Why it happens
              </Button>
              <Button type="button" variant={mode === "fix" ? "primary" : "outline"} onClick={() => setMode("fix")}>
                <Wrench size={16} aria-hidden />
                Show fix
              </Button>
            </div>
          </div>

          <Card>
            {mode === "bug" ? (
              <MistakePanel
                icon="bug"
                title="What went wrong"
                body={scenario.explanation}
                tone="danger"
              />
            ) : null}
            {mode === "why" ? (
              <MistakePanel
                icon="why"
                title="Mental model"
                body={scenario.preventionTip}
                tone="warning"
              />
            ) : null}
            {mode === "fix" ? (
              <MistakePanel icon="fix" title="How to fix it" body={scenario.fix} tone="success" />
            ) : null}

            <div className="mt-6 rounded-3xl border border-border bg-surface-muted p-5">
              <h3 className="font-bold">Debug timeline</h3>
              <div className="mt-4 space-y-3">
                {[
                  ["Bug appears", mode === "bug"],
                  ["Cause explained", mode === "why"],
                  ["Fix applied", mode === "fix"],
                ].map(([label, active], index) => (
                  <div key={label as string} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid size-8 place-items-center rounded-full text-sm font-bold",
                        active ? "bg-primary text-white dark:text-slate-950" : "bg-surface text-muted",
                      )}
                    >
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-muted">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button type="button" variant="ghost" className="mt-5" onClick={() => setMode("bug")}>
              <RotateCcw size={16} aria-hidden />
              Restart simulation
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MistakePanel({
  icon,
  title,
  body,
  tone,
}: {
  icon: "bug" | "why" | "fix";
  title: string;
  body: string;
  tone: "danger" | "warning" | "success";
}) {
  const Icon = icon === "bug" ? XCircle : icon === "why" ? Lightbulb : CheckCircle2;
  const toneClass = {
    danger: "bg-danger/10 text-danger",
    warning: "bg-warning/10 text-warning",
    success: "bg-success/10 text-success",
  }[tone];

  return (
    <div>
      <div className={cn("grid size-12 place-items-center rounded-2xl", toneClass)}>
        <Icon aria-hidden />
      </div>
      <h3 className="mt-5 text-2xl font-bold">{title}</h3>
      <p className="mt-4 leading-7 text-muted">{body}</p>
    </div>
  );
}
