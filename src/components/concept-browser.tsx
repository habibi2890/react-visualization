"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ProgressAwareLessonCard } from "@/components/progress-aware-lesson-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { concepts } from "@/content/lessons";
import { cn } from "@/lib/utils";
import type { ConceptCategory } from "@/types/lesson";

const filters: Array<{ label: string; value: "all" | ConceptCategory }> = [
  { label: "All", value: "all" },
  { label: "React", value: "react" },
  { label: "Hooks", value: "hooks" },
  { label: "Next.js", value: "nextjs" },
];

export function ConceptBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | ConceptCategory>("all");

  const filteredConcepts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return concepts.filter((concept) => {
      const matchesCategory = category === "all" || concept.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        concept.title.toLowerCase().includes(normalizedQuery) ||
        concept.shortDescription.toLowerCase().includes(normalizedQuery) ||
        concept.relatedConcepts.some((item) => item.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="mt-8">
      <Card>
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="relative block">
            <span className="sr-only">Search concepts</span>
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
              aria-hidden
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by concept, mental model, or related topic..."
              className="min-h-12 w-full rounded-2xl border border-border bg-surface-muted pl-11 pr-4 text-sm outline-none focus:border-primary"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() => setCategory(filter.value)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition",
                  category === filter.value
                    ? "border-primary bg-primary text-white dark:text-slate-950"
                    : "border-border bg-surface-muted text-muted hover:text-foreground",
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {filteredConcepts.length > 0 ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredConcepts.map((concept) => (
            <ProgressAwareLessonCard key={concept.id} lesson={concept} />
          ))}
        </div>
      ) : (
        <Card className="mt-6 text-center">
          <Badge variant="warning">No matches</Badge>
          <h2 className="mt-4 text-xl font-bold">Try a broader search.</h2>
          <p className="mt-2 text-sm text-muted">
            Search for React, hooks, props, state, server, client, or rendering.
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-5"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
          >
            Clear filters
          </Button>
        </Card>
      )}
    </div>
  );
}
