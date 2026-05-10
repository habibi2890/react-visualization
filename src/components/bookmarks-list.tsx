"use client";

import { Bookmark } from "lucide-react";
import { ProgressAwareLessonCard } from "@/components/progress-aware-lesson-card";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { concepts } from "@/content/lessons";
import { useProgressStore } from "@/stores/progress-store";

export function BookmarksList() {
  const bookmarks = useProgressStore((state) => state.bookmarks);
  const savedConcepts = concepts.filter((concept) => bookmarks.includes(concept.slug));

  if (savedConcepts.length === 0) {
    return (
      <Card className="grid place-items-center py-16 text-center">
        <Bookmark className="mb-4 text-subtle" aria-hidden />
        <h2 className="text-xl font-bold">No saved concepts yet</h2>
        <p className="mt-2 max-w-md text-sm text-muted">
          Save visualizers you want to revisit before interviews or real projects.
        </p>
        <ButtonLink href="/concepts" className="mt-6">
          Browse concepts
        </ButtonLink>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {savedConcepts.map((concept) => (
        <ProgressAwareLessonCard key={concept.id} lesson={concept} />
      ))}
    </div>
  );
}
