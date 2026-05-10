import { ArrowRight, GitCompareArrows } from "lucide-react";
import { AppShell } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const comparisons = [
  {
    title: "Props vs State",
    left: "Props are passed in by a parent and read-only for the child.",
    right: "State is component memory that the owner can update.",
    choose: "Use props to configure a child. Use state when a value changes over time.",
    href: "/visualizers/props-vs-state",
  },
  {
    title: "Render vs Commit",
    left: "Render calculates the next UI from current props and state.",
    right: "Commit applies the prepared change to the visible DOM.",
    choose: "Keep render pure. Put DOM side effects after commit with effects.",
    href: "/visualizers/react-render-cycle",
  },
  {
    title: "Stable Key vs Index Key",
    left: "Stable keys describe item identity and preserve row state.",
    right: "Index keys describe position and can mismatch state after reorder.",
    choose: "Use IDs from data for reorderable, insertable, or filterable lists.",
    href: "/visualizers/keys-list-diffing",
  },
  {
    title: "useEffect vs Event Handler",
    left: "Effects synchronize with outside systems after render.",
    right: "Event handlers respond directly to user actions.",
    choose: "Use handlers for clicks/submits. Use effects for sync after UI updates.",
    href: "/visualizers/use-effect-dependency-array",
  },
  {
    title: "Server vs Client Component",
    left: "Server Components fetch data and render without shipping component JS.",
    right: "Client Components handle browser state, effects, and events.",
    choose: "Keep server work server-side. Use small client islands for interactivity.",
    href: "/visualizers/server-vs-client-components",
  },
];

export default function ComparePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="primary">Concept comparisons</Badge>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          Compare confusing frontend concepts side by side.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          Quick decision cards for the ideas beginners most often mix up.
        </p>

        <div className="mt-8 grid gap-6">
          {comparisons.map((item) => (
            <Card key={item.title}>
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <GitCompareArrows className="text-primary" aria-hidden />
                    <h2 className="text-2xl font-bold">{item.title}</h2>
                  </div>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <CompareBox label="This means" body={item.left} />
                    <CompareBox label="Compared with" body={item.right} />
                  </div>
                  <div className="mt-4 rounded-2xl border border-success/25 bg-success/10 p-4 text-sm leading-6 text-muted">
                    <span className="font-bold text-success">Rule of thumb: </span>
                    {item.choose}
                  </div>
                </div>
                <ButtonLink href={item.href} variant="outline">
                  Open visualizer
                  <ArrowRight size={16} aria-hidden />
                </ButtonLink>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function CompareBox({ label, body }: { label: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-muted p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{label}</p>
      <p className="mt-3 leading-7 text-muted">{body}</p>
    </div>
  );
}
