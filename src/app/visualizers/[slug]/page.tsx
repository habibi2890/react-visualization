import { notFound } from "next/navigation";
import { AppShell } from "@/components/navigation";
import { KeysListDiffingVisualizer } from "@/components/visualizers/keys-list-diffing-visualizer";
import { PropsVsStateVisualizer } from "@/components/visualizers/props-vs-state-visualizer";
import { RenderCycleVisualizer } from "@/components/visualizers/render-cycle-visualizer";
import { ServerClientVisualizer } from "@/components/visualizers/server-client-visualizer";
import { UseEffectDependencyVisualizer } from "@/components/visualizers/use-effect-dependency-visualizer";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { concepts } from "@/content/lessons";

export default async function VisualizerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = concepts.find((item) => item.slug === slug);

  if (!concept) {
    notFound();
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge variant="primary">{concept.category}</Badge>
            <h1 className="mt-4 text-4xl font-bold tracking-[-0.04em] md:text-6xl">
              {concept.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
              {concept.shortDescription}
            </p>
          </div>
          <div className="flex gap-3">
            <ButtonLink href="/dashboard" variant="outline">
              Dashboard
            </ButtonLink>
            <ButtonLink href="/paths/react-beginner">Path</ButtonLink>
          </div>
        </div>

        <Card className="mb-6 grid gap-6 md:grid-cols-[0.9fr_1fr]">
          <div>
            <h2 className="text-xl font-bold">Mental model</h2>
            <p className="mt-3 leading-7 text-muted">{concept.mentalModel}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Learning goals</h2>
            <ul className="mt-3 grid gap-2 text-sm text-muted md:grid-cols-2">
              {concept.learningGoals.map((goal) => (
                <li key={goal} className="rounded-2xl bg-surface-muted px-4 py-3">
                  {goal}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <VisualizerSwitch slug={slug} />
      </div>
    </AppShell>
  );
}

export function generateStaticParams() {
  return concepts.map((concept) => ({ slug: concept.slug }));
}

function VisualizerSwitch({ slug }: { slug: string }) {
  if (slug === "props-vs-state") {
    return <PropsVsStateVisualizer />;
  }

  if (slug === "use-effect-dependency-array") {
    return <UseEffectDependencyVisualizer />;
  }

  if (slug === "react-render-cycle") {
    return <RenderCycleVisualizer />;
  }

  if (slug === "keys-list-diffing") {
    return <KeysListDiffingVisualizer />;
  }

  if (slug === "server-vs-client-components") {
    return <ServerClientVisualizer />;
  }

  return (
    <Card>
      <h2 className="text-2xl font-bold">Visualizer coming next</h2>
      <p className="mt-3 text-muted">This concept is included as structured content.</p>
    </Card>
  );
}
