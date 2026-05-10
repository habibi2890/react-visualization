import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-surface/80 p-6 shadow-sm shadow-slate-900/5 backdrop-blur",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "text-left",
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold tracking-[-0.03em] text-foreground md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-muted md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
