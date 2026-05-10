"use client";

import Link from "next/link";
import {
  BookMarked,
  BookOpen,
  FlaskConical,
  GitCompareArrows,
  Home,
  LayoutDashboard,
  Library,
  Map,
  MonitorPlay,
  PlayCircle,
  Puzzle,
  Route,
  Search,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { concepts, learningPaths } from "@/content/lessons";
import { cn } from "@/lib/utils";

type CommandItem = {
  href: string;
  title: string;
  eyebrow: string;
  description: string;
  keywords: string;
  icon: typeof Search;
};

const coreItems: CommandItem[] = [
  {
    href: "/",
    title: "Home",
    eyebrow: "Overview",
    description: "Return to the landing page and product preview.",
    keywords: "landing hero home overview",
    icon: Home,
  },
  {
    href: "/start",
    title: "Start Here",
    eyebrow: "Onboarding",
    description: "Follow the recommended first learning path.",
    keywords: "start onboarding beginner first path",
    icon: Sparkles,
  },
  {
    href: "/dashboard",
    title: "Dashboard",
    eyebrow: "Learning hub",
    description: "Continue learning and review progress shortcuts.",
    keywords: "dashboard continue progress overview",
    icon: LayoutDashboard,
  },
  {
    href: "/concepts",
    title: "Concept Library",
    eyebrow: "Explore",
    description: "Browse all React and Next.js concept lessons.",
    keywords: "concepts library lessons search",
    icon: Library,
  },
  {
    href: "/visualizers",
    title: "Visualizer Gallery",
    eyebrow: "Interactive",
    description: "Open code-connected visual lessons.",
    keywords: "visualizers animations diagrams interactive",
    icon: PlayCircle,
  },
  {
    href: "/compare",
    title: "Concept Comparison Cards",
    eyebrow: "Compare",
    description: "Compare confusing frontend concepts side by side.",
    keywords: "compare props state server client effect event",
    icon: GitCompareArrows,
  },
  {
    href: "/glossary",
    title: "Glossary",
    eyebrow: "Reference",
    description: "Decode React and Next.js terms in plain language.",
    keywords: "glossary terms definitions reference",
    icon: BookMarked,
  },
  {
    href: "/route-map",
    title: "Next.js Route Map",
    eyebrow: "Next.js",
    description: "See how app directory files become routes and layouts.",
    keywords: "nextjs route app router layout loading error dynamic",
    icon: Route,
  },
  {
    href: "/playground",
    title: "Practice Playground",
    eyebrow: "Practice",
    description: "Fix guided code challenges and inspect feedback.",
    keywords: "playground practice code challenge solution",
    icon: Puzzle,
  },
  {
    href: "/mistake-lab",
    title: "Mistake Lab",
    eyebrow: "Debugging",
    description: "Trigger common bugs and learn how to fix them.",
    keywords: "mistake bug infinite effect key mutation hydration",
    icon: FlaskConical,
  },
  {
    href: "/roadmaps",
    title: "Visual Roadmaps",
    eyebrow: "Plan",
    description: "See what to learn next across React and Next.js.",
    keywords: "roadmap learning path plan",
    icon: Map,
  },
  {
    href: "/quiz",
    title: "Quiz",
    eyebrow: "Check",
    description: "Review concepts through short questions.",
    keywords: "quiz questions check understanding",
    icon: Trophy,
  },
  {
    href: "/demo-script",
    title: "Demo Script",
    eyebrow: "Presentation",
    description: "Use the 5-minute demo walkthrough.",
    keywords: "demo script portfolio presentation classroom",
    icon: MonitorPlay,
  },
];

function buildCommandItems(): CommandItem[] {
  const conceptItems = concepts.flatMap((concept) => [
    {
      href: `/concepts/${concept.slug}`,
      title: concept.title,
      eyebrow: `${concept.category} concept`,
      description: concept.shortDescription,
      keywords: `${concept.title} ${concept.category} ${concept.learningGoals.join(" ")}`,
      icon: BookOpen,
    },
    {
      href: `/visualizers/${concept.slug}`,
      title: `${concept.title} Visualizer`,
      eyebrow: "Visualizer",
      description: `Step through ${concept.title} with code and diagrams.`,
      keywords: `${concept.title} visualizer ${concept.visualizationType} ${concept.shortDescription}`,
      icon: PlayCircle,
    },
  ]);

  const pathItems = learningPaths.map((path) => ({
    href: `/paths/${path.slug}`,
    title: path.title,
    eyebrow: "Learning path",
    description: path.description,
    keywords: `${path.title} ${path.description} ${path.lessonSlugs.join(" ")}`,
    icon: Map,
  }));

  return [...coreItems, ...pathItems, ...conceptItems];
}

export function CommandMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const items = useMemo(() => buildCommandItems(), []);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return items.slice(0, 8);
    }

    const tokens = normalizedQuery.split(/\s+/).filter(Boolean);

    return items
      .filter((item) => {
        const searchableText = `${item.title} ${item.eyebrow} ${item.description} ${item.keywords}`.toLowerCase();

        return tokens.every((token) => searchableText.includes(token));
      })
      .slice(0, 10);
  }, [items, query]);

  useEffect(() => {
    if (!open) return;

    const id = window.setTimeout(() => inputRef.current?.focus(), 0);

    return () => window.clearTimeout(id);
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/45 px-4 py-8 backdrop-blur-sm" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="command-menu-title"
        className="mx-auto max-w-2xl overflow-hidden rounded-[2rem] border border-border bg-background shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search className="text-muted" size={20} aria-hidden />
          <label htmlFor="command-search" className="sr-only">
            Search pages, concepts, and visualizers
          </label>
          <input
            ref={inputRef}
            id="command-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search pages, concepts, visualizers..."
            className="min-h-11 flex-1 bg-transparent text-base font-semibold outline-none placeholder:text-muted"
          />
          <Button
            type="button"
            variant="ghost"
            className="px-3"
            onClick={() => onOpenChange(false)}
            aria-label="Close command menu"
          >
            <X size={18} aria-hidden />
          </Button>
        </div>
        <div className="px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 id="command-menu-title" className="font-bold">
                Command menu
              </h2>
              <p className="mt-1 text-sm text-muted">Jump quickly with Ctrl/⌘+K.</p>
            </div>
            <kbd className="rounded-xl border border-border bg-surface-muted px-3 py-1 text-xs font-bold text-muted">
              Esc
            </kbd>
          </div>
          <div className="mt-4 max-h-[60vh] overflow-y-auto pr-1">
            {filteredItems.length > 0 ? (
              <div className="grid gap-2">
                {filteredItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => {
                        onOpenChange(false);
                        setQuery("");
                      }}
                      className={cn(
                        "group flex items-start gap-4 rounded-3xl border border-transparent p-4 transition",
                        "hover:border-primary/30 hover:bg-primary-soft/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
                      )}
                    >
                      <span className="mt-1 grid size-11 shrink-0 place-items-center rounded-2xl bg-surface-muted text-primary transition group-hover:bg-primary group-hover:text-white dark:group-hover:text-slate-950">
                        <Icon size={20} aria-hidden />
                      </span>
                      <span>
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                          {item.eyebrow}
                        </span>
                        <span className="mt-1 block font-bold">{item.title}</span>
                        <span className="mt-1 block text-sm leading-6 text-muted">{item.description}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-border bg-surface-muted p-8 text-center">
                <p className="font-bold">No results found</p>
                <p className="mt-2 text-sm text-muted">Try “props”, “route”, “effect”, “playground”, or “mistake”.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommandMenuButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }

      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-surface/70 px-4 text-sm font-semibold text-muted transition hover:border-primary/50 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          className,
        )}
      >
        <Search size={16} aria-hidden />
        <span>Search</span>
        <kbd className="hidden rounded-lg border border-border bg-background px-2 py-0.5 text-[0.68rem] font-bold sm:inline">
          Ctrl K
        </kbd>
      </button>
      <CommandMenu open={open} onOpenChange={setOpen} />
    </>
  );
}
