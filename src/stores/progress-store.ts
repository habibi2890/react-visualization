"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProgressState = {
  completedLessons: string[];
  bookmarks: string[];
  toggleBookmark: (slug: string) => void;
  markComplete: (slug: string) => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completedLessons: ["props-vs-state"],
      bookmarks: ["props-vs-state"],
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
    }),
    { name: "react-visual-lab-progress" },
  ),
);
