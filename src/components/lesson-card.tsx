import Link from "next/link";
import { ArrowRight, Clock, PlayCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ConceptLesson } from "@/types/lesson";

export function LessonCard({
  lesson,
  completed = false,
}: {
  lesson: ConceptLesson;
  completed?: boolean;
}) {
  return (
    <Card className="group flex h-full flex-col gap-5 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-blue-500/10">
      <div className="flex items-start justify-between gap-4">
        <div className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
          <PlayCircle size={22} aria-hidden />
        </div>
        <Badge variant={completed ? "success" : "primary"}>
          {completed ? "Completed" : lesson.difficulty}
        </Badge>
      </div>
      <div>
        <h3 className="text-xl font-bold tracking-[-0.02em]">{lesson.title}</h3>
        <p className="mt-3 text-sm leading-6 text-muted">{lesson.shortDescription}</p>
      </div>
      <div className="mt-auto flex items-center justify-between gap-3 text-sm">
        <span className="inline-flex items-center gap-2 text-muted">
          <Clock size={16} aria-hidden />
          {lesson.estimatedMinutes} min
        </span>
        <Link
          href={`/visualizers/${lesson.slug}`}
          className="inline-flex items-center gap-2 font-semibold text-primary"
        >
          Open
          <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>
    </Card>
  );
}
