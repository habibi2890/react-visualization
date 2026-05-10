import { AppShell } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { learningPaths } from "@/content/lessons";

export default function PathsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="primary">Roadmaps</Badge>
        <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          Choose a visual learning path.
        </h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {learningPaths.map((path) => (
            <Card key={path.id}>
              <h2 className="text-2xl font-bold">{path.title}</h2>
              <p className="mt-3 text-muted">{path.description}</p>
              <ButtonLink href={`/paths/${path.slug}`} className="mt-6">
                Open path
              </ButtonLink>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
