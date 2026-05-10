import Link from "next/link";
import { BookOpen, FlaskConical, LayoutDashboard, Library, Map, PlayCircle, Star } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/concepts", label: "Concepts", icon: Library },
  { href: "/paths/react-beginner", label: "Learn React", icon: BookOpen },
  { href: "/paths/nextjs-beginner", label: "Learn Next.js", icon: Map },
  { href: "/visualizers/props-vs-state", label: "Visualizers", icon: PlayCircle },
  { href: "/mistake-lab", label: "Mistake Lab", icon: FlaskConical },
  { href: "/bookmarks", label: "Bookmarks", icon: Star },
];

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="flex items-center gap-3 font-bold">
          <span className="grid size-10 place-items-center rounded-2xl bg-primary text-white shadow-lg shadow-blue-500/25 dark:text-slate-950">
            R
          </span>
          <span>React Visual Lab</span>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-muted lg:flex">
          <Link href="/paths/react-beginner" className="hover:text-foreground">
            Learn React
          </Link>
          <Link href="/paths/nextjs-beginner" className="hover:text-foreground">
            Learn Next.js
          </Link>
          <Link href="/visualizers/props-vs-state" className="hover:text-foreground">
            Visualizers
          </Link>
          <Link href="/dashboard" className="hover:text-foreground">
            Dashboard
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <ButtonLink href="/dashboard" className="hidden sm:inline-flex">
            Start learning
          </ButtonLink>
        </div>
      </nav>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r border-border bg-surface/70 p-5 backdrop-blur lg:block">
        <Link href="/" className="mb-8 flex items-center gap-3 font-bold">
          <span className="grid size-10 place-items-center rounded-2xl bg-primary text-white dark:text-slate-950">
            R
          </span>
          <span>React Visual Lab</span>
        </Link>
        <nav aria-label="App navigation" className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-muted transition hover:bg-surface-muted hover:text-foreground",
                )}
              >
                <Icon size={18} aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div>
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/85 px-4 py-3 backdrop-blur lg:px-8">
          <Link href="/" className="font-bold lg:hidden">
            React Visual Lab
          </Link>
          <div className="hidden text-sm text-muted lg:block">
            Make invisible frontend concepts visible.
          </div>
          <ThemeToggle />
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
