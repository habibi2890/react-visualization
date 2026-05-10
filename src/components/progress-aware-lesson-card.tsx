"use client";

import { LessonCard } from "@/components/lesson-card";
import { useProgressStore } from "@/stores/progress-store";
import type { ConceptLesson } from "@/types/lesson";

export function ProgressAwareLessonCard({ lesson }: { lesson: ConceptLesson }) {
  const completedLessons = useProgressStore((state) => state.completedLessons);

  return <LessonCard lesson={lesson} completed={completedLessons.includes(lesson.slug)} />;
}
