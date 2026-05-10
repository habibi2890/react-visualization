import { Bookmark } from "lucide-react";
import { AppShell } from "@/components/navigation";
import { LessonCard } from "@/components/lesson-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { concepts } from "@/content/lessons";

export default function BookmarksPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="primary">Bookmarks</Badge>
        <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          Saved concepts for review.
        </h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {concepts.slice(0, 2).map((concept) => (
            <LessonCard key={concept.id} lesson={concept} />
          ))}
          <Card className="grid place-items-center text-center">
            <Bookmark className="mb-4 text-subtle" aria-hidden />
            <h2 className="text-xl font-bold">Save more concepts</h2>
            <p className="mt-2 text-sm text-muted">
              Bookmark visualizers you want to revisit before interviews or projects.
            </p>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
