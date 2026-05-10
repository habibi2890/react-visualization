"use client";

import Link from "next/link";
import { ArrowRight, Bookmark, Clock, NotebookPen, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { concepts } from "@/content/lessons";
import { useProgressStore } from "@/stores/progress-store";

export function BookmarksList() {
  const bookmarks = useProgressStore((state) => state.bookmarks);
  const completedLessons = useProgressStore((state) => state.completedLessons);
  const lessonNotes = useProgressStore((state) => state.lessonNotes);
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
    <div className="grid gap-6">
      <Card className="border-primary/20 bg-primary-soft/30">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Badge variant="primary">Review queue</Badge>
            <h2 className="mt-3 text-2xl font-bold">Revisit what you saved.</h2>
            <p className="mt-2 max-w-3xl leading-7 text-muted">
              Saved concepts now become a review queue with your notes, completion status, and a direct path back to the visualizer.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:min-w-64">
            <Metric label="Saved" value={savedConcepts.length.toString()} />
            <Metric
              label="With notes"
              value={savedConcepts.filter((concept) => lessonNotes[concept.slug]?.trim()).length.toString()}
            />
          </div>
        </div>
      </Card>

      <div className="grid gap-5">
        {savedConcepts.map((concept) => {
          const note = lessonNotes[concept.slug]?.trim();
          const completed = completedLessons.includes(concept.slug);

          return (
            <Card key={concept.id} className="grid gap-5 lg:grid-cols-[1fr_280px] lg:items-center">
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={completed ? "success" : "warning"}>{completed ? "Completed" : "Needs review"}</Badge>
                  <Badge>{concept.category}</Badge>
                </div>
                <h3 className="mt-3 text-2xl font-bold">{concept.title}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{concept.shortDescription}</p>
                <div className="mt-4 rounded-2xl border border-border bg-surface-muted p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <NotebookPen size={16} className="text-primary" aria-hidden />
                    Note preview
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {note || "No note yet. Open the lesson and write the mental model in your own words."}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="rounded-2xl bg-surface-muted p-4 text-sm text-muted">
                  <Clock size={16} className="mb-2 text-primary" aria-hidden />
                  {concept.estimatedMinutes} min visual review
                </div>
                <Link
                  href={`/visualizers/${concept.slug}`}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-slate-950"
                >
                  Review visualizer
                  <ArrowRight size={16} aria-hidden />
                </Link>
                <Link
                  href={`/concepts/${concept.slug}`}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold transition hover:border-primary/50 hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Read concept
                  <Sparkles size={16} aria-hidden />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-background/80 p-4">
      <p className="text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs font-semibold text-muted">{label}</p>
    </div>
  );
}
