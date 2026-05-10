import { AppShell } from "@/components/navigation";
import { RoadmapTimeline } from "@/components/roadmap-timeline";
import { Badge } from "@/components/ui/badge";

export default function RoadmapsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="primary">Roadmaps</Badge>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          Follow a visual path from React basics to Next.js boundaries.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          Use this roadmap to sequence lessons, visualizers, quizzes, playground practice, and mistake simulations into one coherent demo journey.
        </p>
        <div className="mt-8">
          <RoadmapTimeline />
        </div>
      </div>
    </AppShell>
  );
}
