import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/25 dark:text-slate-950",
  secondary:
    "bg-foreground text-background hover:-translate-y-0.5 hover:opacity-90",
  outline:
    "border border-border bg-surface/70 text-foreground hover:border-primary/50 hover:bg-primary-soft/50",
  ghost: "text-muted hover:bg-surface-muted hover:text-foreground",
  danger: "bg-danger text-white hover:opacity-90",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-50";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props} />
  );
}

export function ButtonLink({
  className,
  variant = "primary",
  href,
  children,
}: {
  className?: string;
  variant?: ButtonVariant;
  href: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
