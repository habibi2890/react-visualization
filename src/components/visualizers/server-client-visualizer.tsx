"use client";

import { ArrowRight, Database, Monitor, MousePointerClick, Server, ShieldAlert } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  QuizPanel,
  StepExplanation,
  Timeline,
  useStepPlayer,
} from "@/components/visualizers/shared-controls";
import { serverClientComponentsLesson } from "@/content/lessons";
import { cn } from "@/lib/utils";

const lesson = serverClientComponentsLesson;
const code = lesson.codeExamples[0].code;

const routeFiles = [
  { name: "app/products/[id]/page.tsx", kind: "Server Component", server: true },
  { name: "getProduct(params.id)", kind: "Server data", server: true },
  { name: "add-to-cart-button.tsx", kind: "Client Component", server: false },
  { name: '"use client"', kind: "Boundary", server: false },
];

export function ServerClientVisualizer() {
  const player = useStepPlayer(lesson.steps.length);
  const { stepIndex, playing } = player;
  const step = lesson.steps[stepIndex];

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <section aria-label="Code panel">
          <CodeBlock code={code} activeLines={step.activeCodeLines} />
        </section>

        <section className="grid gap-5" aria-label="Server client route map">
          <Card>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Server/client boundary map</h2>
                <p className="mt-1 text-sm text-muted">
                  Keep server work on the server and browser-only interactivity in small client islands.
                </p>
              </div>
              <Badge variant={step.showMistake ? "danger" : "primary"}>{step.timelineEvent}</Badge>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto_1fr]">
              <EnvironmentPanel
                title="Server"
                icon="server"
                active={step.activeComponents.some((item) => item.includes("Server"))}
                items={["Render ProductPage", "Fetch product", "Prepare RSC payload"]}
              />
              <div className="hidden items-center text-primary lg:flex">
                <ArrowRight aria-hidden />
              </div>
              <EnvironmentPanel
                title="Browser"
                icon="browser"
                active={step.activeComponents.some((item) => item.includes("Browser") || item.includes("Hydration") || item.includes("Client"))}
                items={["Show HTML preview", "Load client JS", "Attach onClick handler"]}
              />
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {routeFiles.map((file) => {
                const active =
                  (file.server && step.activeComponents.some((item) => item.includes("Server"))) ||
                  (!file.server && step.activeComponents.some((item) => item.includes("Client") || item.includes("Hydration")));

                return (
                  <div
                    key={file.name}
                    className={cn(
                      "rounded-2xl border p-4",
                      active ? "border-primary bg-primary-soft/50" : "border-border bg-surface-muted",
                    )}
                  >
                    <p className="font-mono text-sm font-semibold">{file.name}</p>
                    <p className="mt-2 text-xs text-muted">{file.kind}</p>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold">Boundary inspector</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <BoundaryFact label="Can fetch secrets" value="Server" />
              <BoundaryFact label="Can use onClick" value="Client" />
              <BoundaryFact label="Boundary rule" value="Serializable props" />
            </div>
            {step.showMistake ? (
              <div className="mt-5 flex gap-3 rounded-2xl border border-danger/30 bg-danger/10 p-4 text-sm text-danger">
                <ShieldAlert size={18} className="mt-0.5" aria-hidden />
                <p>Putting use client too high can ship more JavaScript than necessary.</p>
              </div>
            ) : null}
          </Card>
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

      <Timeline lesson={lesson} stepIndex={stepIndex} title="Request and hydration timeline" />
    </div>
  );
}

function EnvironmentPanel({
  title,
  icon,
  active,
  items,
}: {
  title: string;
  icon: "server" | "browser";
  active: boolean;
  items: string[];
}) {
  const Icon = icon === "server" ? Server : Monitor;

  return (
    <div
      className={cn(
        "rounded-3xl border p-5",
        active ? "border-primary bg-primary-soft/45" : "border-border bg-surface-muted",
      )}
    >
      <div className="flex items-center gap-3">
        <div className="grid size-11 place-items-center rounded-2xl bg-surface">
          <Icon size={20} className="text-primary" aria-hidden />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 text-sm">
            {item.includes("Fetch") ? (
              <Database size={16} className="text-accent" aria-hidden />
            ) : item.includes("onClick") ? (
              <MousePointerClick size={16} className="text-success" aria-hidden />
            ) : (
              <span className="size-2 rounded-full bg-primary" />
            )}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function BoundaryFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface-muted p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-2 font-bold">{value}</p>
    </div>
  );
}
