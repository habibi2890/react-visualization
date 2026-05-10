"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProgressState = {
  completedLessons: string[];
  bookmarks: string[];
  quizScores: Record<string, number>;
  playgroundAttempts: Record<string, number>;
  lessonNotes: Record<string, string>;
  preferences: {
    reducedMotion: boolean;
    showHintsByDefault: boolean;
    dailyGoalMinutes: number;
  };
  toggleBookmark: (slug: string) => void;
  markComplete: (slug: string) => void;
  saveQuizScore: (slug: string, score: number) => void;
  recordPlaygroundAttempt: (slug: string) => void;
  saveLessonNote: (slug: string, note: string) => void;
  updatePreferences: (preferences: Partial<ProgressState["preferences"]>) => void;
  resetProgress: () => void;
};

const initialProgress = {
  completedLessons: ["props-vs-state"],
  bookmarks: ["props-vs-state"],
  quizScores: {},
  playgroundAttempts: {},
  lessonNotes: {},
  preferences: {
    reducedMotion: false,
    showHintsByDefault: false,
    dailyGoalMinutes: 20,
  },
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      ...initialProgress,
      toggleBookmark: (slug) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(slug)
            ? state.bookmarks.filter((item) => item !== slug)
            : [...state.bookmarks, slug],
        })),
      markComplete: (slug) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(slug)
            ? state.completedLessons
            : [...state.completedLessons, slug],
        })),
      saveQuizScore: (slug, score) =>
        set((state) => ({
          quizScores: {
            ...state.quizScores,
            [slug]: Math.max(state.quizScores[slug] ?? 0, score),
          },
        })),
      recordPlaygroundAttempt: (slug) =>
        set((state) => ({
          playgroundAttempts: {
            ...state.playgroundAttempts,
            [slug]: (state.playgroundAttempts[slug] ?? 0) + 1,
          },
        })),
      saveLessonNote: (slug, note) =>
        set((state) => ({
          lessonNotes: {
            ...state.lessonNotes,
            [slug]: note,
          },
        })),
      updatePreferences: (preferences) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            ...preferences,
          },
        })),
      resetProgress: () => set(initialProgress),
    }),
    { name: "react-visual-lab-progress" },
  ),
);
