"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type RecentActivityType = "completed" | "quiz" | "playground" | "note" | "bookmark";

export type RecentActivityItem = {
  id: string;
  type: RecentActivityType;
  slug: string;
  value?: number;
  createdAt: string;
};

type ProgressState = {
  completedLessons: string[];
  bookmarks: string[];
  quizScores: Record<string, number>;
  playgroundAttempts: Record<string, number>;
  lessonNotes: Record<string, string>;
  recentActivity: RecentActivityItem[];
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

function addRecentActivity(
  recentActivity: RecentActivityItem[],
  type: RecentActivityType,
  slug: string,
  value?: number,
) {
  return [
    {
      id: `${Date.now()}-${type}-${slug}`,
      type,
      slug,
      value,
      createdAt: new Date().toISOString(),
    },
    ...recentActivity.filter((activity) => !(activity.type === type && activity.slug === slug)),
  ].slice(0, 8);
}

const initialProgress = {
  completedLessons: ["props-vs-state"],
  bookmarks: ["props-vs-state"],
  quizScores: {},
  playgroundAttempts: {},
  lessonNotes: {
    "props-vs-state": "Props flow down. State lives where changes happen.",
  },
  recentActivity: [],
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
          recentActivity: state.bookmarks.includes(slug)
            ? state.recentActivity
            : addRecentActivity(state.recentActivity, "bookmark", slug),
        })),
      markComplete: (slug) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(slug)
            ? state.completedLessons
            : [...state.completedLessons, slug],
          recentActivity: state.completedLessons.includes(slug)
            ? state.recentActivity
            : addRecentActivity(state.recentActivity, "completed", slug),
        })),
      saveQuizScore: (slug, score) =>
        set((state) => ({
          quizScores: {
            ...state.quizScores,
            [slug]: Math.max(state.quizScores[slug] ?? 0, score),
          },
          recentActivity: addRecentActivity(state.recentActivity, "quiz", slug, score),
        })),
      recordPlaygroundAttempt: (slug) =>
        set((state) => ({
          playgroundAttempts: {
            ...state.playgroundAttempts,
            [slug]: (state.playgroundAttempts[slug] ?? 0) + 1,
          },
          recentActivity: addRecentActivity(state.recentActivity, "playground", slug),
        })),
      saveLessonNote: (slug, note) =>
        set((state) => ({
          lessonNotes: {
            ...state.lessonNotes,
            [slug]: note,
          },
          recentActivity:
            note.trim() && note !== state.lessonNotes[slug]
              ? addRecentActivity(state.recentActivity, "note", slug)
              : state.recentActivity,
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
