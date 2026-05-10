"use client";

import { Lightbulb, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useProgressStore } from "@/stores/progress-store";

const prompts = [
  "What mental model finally clicked?",
  "What mistake should I avoid?",
  "What would I explain to another beginner?",
];

export function LessonNotes({ slug, title }: { slug: string; title: string }) {
  const note = useProgressStore((state) => state.lessonNotes[slug] ?? "");
  const saveLessonNote = useProgressStore((state) => state.saveLessonNote);
  const hasNote = note.trim().length > 0;

  return (
    <Card className="border-accent/20 bg-accent/5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Badge variant={hasNote ? "success" : "warning"}>{hasNote ? "Note saved" : "Personal note"}</Badge>
          <h2 className="mt-3 text-2xl font-bold">My notes for {title}</h2>
          <p className="mt-2 leading-7 text-muted">
            Capture the idea in your own words. Notes are saved locally in this browser for each lesson.
          </p>
        </div>
        <div className="grid size-12 place-items-center rounded-2xl bg-surface-muted text-accent">
          <Lightbulb size={22} aria-hidden />
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => saveLessonNote(slug, note ? `${note}\n- ${prompt}` : `- ${prompt}`)}
            className="rounded-2xl border border-border bg-background/70 p-3 text-left text-sm font-semibold text-muted transition hover:border-primary/50 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {prompt}
          </button>
        ))}
      </div>

      <label htmlFor={`lesson-note-${slug}`} className="mt-5 block text-sm font-semibold">
        Lesson note
      </label>
      <textarea
        id={`lesson-note-${slug}`}
        value={note}
        onChange={(event) => saveLessonNote(slug, event.target.value)}
        placeholder="Example: Props are read-only inputs. State belongs to the component that needs to remember and update something."
        className="mt-2 min-h-36 w-full resize-y rounded-3xl border border-border bg-background p-4 text-sm leading-7 outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/10"
      />
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">{note.trim().length} characters saved locally.</p>
        <Button type="button" variant="outline" onClick={() => saveLessonNote(slug, note.trim())}>
          <Save size={16} aria-hidden />
          Save note
        </Button>
      </div>
    </Card>
  );
}
