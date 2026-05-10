import { AppShell } from "@/components/navigation";
import { LessonCard } from "@/components/lesson-card";
import { Badge } from "@/components/ui/badge";
import { concepts } from "@/content/lessons";

export default function VisualizersPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="primary">Visualizers</Badge>
        <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          Explore interactive concept labs.
        </h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {concepts.map((concept) => (
            <LessonCard key={concept.id} lesson={concept} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
