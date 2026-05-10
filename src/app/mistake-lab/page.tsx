import { Bug, RotateCcw, Wrench } from "lucide-react";
import { AppShell } from "@/components/navigation";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { propsVsStateLesson } from "@/content/lessons";

export default function MistakeLabPage() {
  const mistake = propsVsStateLesson.commonMistakes[0];

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="danger">Mistake Lab</Badge>
        <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          Break React safely, then learn why it broke.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          The first lab shows why mutating props is a common beginner mistake and how to fix it with state ownership.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <CodeBlock code={mistake.brokenCode} activeLines={[2]} />
          <Card>
            <div className="grid size-12 place-items-center rounded-2xl bg-danger/10 text-danger">
              <Bug aria-hidden />
            </div>
            <h2 className="mt-5 text-2xl font-bold">{mistake.title}</h2>
            <p className="mt-4 leading-7 text-muted">{mistake.explanation}</p>
            <div className="mt-6 rounded-2xl border border-success/25 bg-success/10 p-5">
              <div className="flex items-center gap-3 font-bold text-success">
                <Wrench size={18} aria-hidden />
                Fix
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">{mistake.fix}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/visualizers/props-vs-state">
                Open visualizer
              </ButtonLink>
              <ButtonLink href="/mistake-lab" variant="outline">
                <RotateCcw size={16} aria-hidden />
                Try again
              </ButtonLink>
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
