import { AppShell } from "@/components/navigation";
import { RouteMapExplorer } from "@/components/nextjs/route-map-explorer";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { concepts, learningPaths } from "@/content/lessons";

export default function LearnNextJsPage() {
  const nextPath = learningPaths.find((path) => path.slug === "nextjs-beginner");
  const serverClientConcept = concepts.find(
    (concept) => concept.slug === "server-vs-client-components",
  );

  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="primary">Learn Next.js</Badge>
        <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-[-0.04em] md:text-6xl">
              Build a visual mental model for the App Router.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              Start with route folders, nested layouts, dynamic segments, loading/error states, and server/client boundaries before moving into production patterns.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/route-map">Open route map</ButtonLink>
              <ButtonLink href="/paths/nextjs-beginner" variant="outline">View path</ButtonLink>
              <ButtonLink href="/visualizers/server-vs-client-components" variant="outline">
                Server vs Client
              </ButtonLink>
            </div>
          </div>

          <Card>
            <h2 className="text-xl font-bold">Next.js Beginner</h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              {nextPath?.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {nextPath?.outcomes.map((outcome) => (
                <Badge key={outcome}>{outcome}</Badge>
              ))}
            </div>
          </Card>
        </div>

        <section className="mt-10">
          <RouteMapExplorer />
        </section>

        {serverClientConcept ? (
          <Card className="mt-8">
            <Badge variant="success">Recommended visual lesson</Badge>
            <h2 className="mt-4 text-2xl font-bold">{serverClientConcept.title}</h2>
            <p className="mt-3 text-muted">{serverClientConcept.shortDescription}</p>
            <ButtonLink href={`/visualizers/${serverClientConcept.slug}`} className="mt-6">
              Open visualizer
            </ButtonLink>
          </Card>
        ) : null}
      </div>
    </AppShell>
  );
}
