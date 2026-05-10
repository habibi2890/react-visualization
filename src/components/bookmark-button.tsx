"use client";

import { Bookmark, CheckCircle2 } from "lucide-react";
import { useProgressStore } from "@/stores/progress-store";
import { Button } from "@/components/ui/button";

export function BookmarkButton({ slug }: { slug: string }) {
  const bookmarks = useProgressStore((state) => state.bookmarks);
  const toggleBookmark = useProgressStore((state) => state.toggleBookmark);
  const saved = bookmarks.includes(slug);

  return (
    <Button
      type="button"
      variant={saved ? "secondary" : "outline"}
      onClick={() => toggleBookmark(slug)}
      aria-pressed={saved}
    >
      <Bookmark size={16} aria-hidden />
      {saved ? "Saved" : "Save"}
    </Button>
  );
}

export function CompleteLessonButton({ slug }: { slug: string }) {
  const completedLessons = useProgressStore((state) => state.completedLessons);
  const markComplete = useProgressStore((state) => state.markComplete);
  const completed = completedLessons.includes(slug);

  return (
    <Button
      type="button"
      variant={completed ? "secondary" : "primary"}
      onClick={() => markComplete(slug)}
      disabled={completed}
    >
      <CheckCircle2 size={16} aria-hidden />
      {completed ? "Completed" : "Mark complete"}
    </Button>
  );
}
