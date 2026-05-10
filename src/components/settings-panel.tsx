"use client";

import { RotateCcw, Target } from "lucide-react";
import { useProgressStore } from "@/stores/progress-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function SettingsPanel() {
  const preferences = useProgressStore((state) => state.preferences);
  const updatePreferences = useProgressStore((state) => state.updatePreferences);
  const resetProgress = useProgressStore((state) => state.resetProgress);

  return (
    <div className="grid gap-6">
      <Card>
        <div className="flex items-center gap-3">
          <Target className="text-primary" aria-hidden />
          <h2 className="text-xl font-bold">Learning preferences</h2>
        </div>
        <div className="mt-5 space-y-4">
          <label className="flex items-center justify-between gap-4 rounded-2xl bg-surface-muted p-4">
            <span>
              <span className="block font-semibold">Reduce motion</span>
              <span className="text-sm text-muted">Prefer calmer visual feedback while learning.</span>
            </span>
            <input
              type="checkbox"
              checked={preferences.reducedMotion}
              onChange={(event) => updatePreferences({ reducedMotion: event.target.checked })}
              className="size-5 accent-[var(--primary)]"
            />
          </label>
          <label className="flex items-center justify-between gap-4 rounded-2xl bg-surface-muted p-4">
            <span>
              <span className="block font-semibold">Show hints by default</span>
              <span className="text-sm text-muted">Useful when practicing new concepts for the first time.</span>
            </span>
            <input
              type="checkbox"
              checked={preferences.showHintsByDefault}
              onChange={(event) => updatePreferences({ showHintsByDefault: event.target.checked })}
              className="size-5 accent-[var(--primary)]"
            />
          </label>
          <label className="block rounded-2xl bg-surface-muted p-4">
            <span className="font-semibold">Daily learning goal</span>
            <span className="mt-1 block text-sm text-muted">Minutes per day</span>
            <input
              aria-label="Daily learning goal minutes"
              type="range"
              min="5"
              max="60"
              step="5"
              value={preferences.dailyGoalMinutes}
              onChange={(event) =>
                updatePreferences({ dailyGoalMinutes: Number(event.target.value) })
              }
              className="mt-4 w-full accent-[var(--primary)]"
            />
            <span className="mt-2 block text-sm font-bold text-primary">
              {preferences.dailyGoalMinutes} minutes
            </span>
          </label>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold">Reset local learning data</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Clears local progress, bookmarks, quiz scores, playground attempts, and preferences in this browser.
        </p>
        <Button type="button" variant="danger" className="mt-5" onClick={resetProgress}>
          <RotateCcw size={16} aria-hidden />
          Reset demo data
        </Button>
      </Card>
    </div>
  );
}
