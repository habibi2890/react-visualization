import { Blocks, Eye, GraduationCap, HeartHandshake, Sparkles } from "lucide-react";
import { AppShell } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const principles = [
  {
    title: "Learning clarity first",
    description:
      "Every diagram, highlight, and animation must make a concept easier to understand.",
    icon: Eye,
  },
  {
    title: "Beginners should feel capable",
    description:
      "Microcopy stays simple, mistakes are explained kindly, and lessons reveal complexity step by step.",
    icon: HeartHandshake,
  },
  {
    title: "Code and concept stay connected",
    description:
      "Visual models always point back to the exact code that caused the behavior.",
    icon: Blocks,
  },
  {
    title: "Practice makes mental models stick",
    description:
      "Playgrounds and quizzes convert passive understanding into active recall.",
    icon: GraduationCap,
  },
];

export default function AboutPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="primary">Product vision</Badge>
        <section className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-[-0.04em] md:text-6xl">
              Make invisible frontend mechanisms visible.
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              React Visual Lab helps students, interns, junior developers, and mentors understand React and Next.js through interactive diagrams, render timelines, route maps, code-connected explanations, and guided practice.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/concepts">Browse concepts</ButtonLink>
              <ButtonLink href="/compare" variant="outline">Compare concepts</ButtonLink>
              <ButtonLink href="/glossary" variant="outline">Open glossary</ButtonLink>
              <ButtonLink href="/demo-script" variant="outline">Demo script</ButtonLink>
              <ButtonLink href="/roadmaps" variant="outline">View roadmaps</ButtonLink>
              <ButtonLink href="/playground" variant="outline">Try playground</ButtonLink>
            </div>
          </div>
          <Card className="overflow-hidden p-8">
            <Sparkles className="text-primary" size={36} aria-hidden />
            <h2 className="mt-5 text-2xl font-bold">Not a docs clone.</h2>
            <p className="mt-3 leading-7 text-muted">
              The platform is designed as a learning lab: short explanations, inspectable code, meaningful visuals, common mistakes, quizzes, and progress feedback in one focused flow.
            </p>
          </Card>
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <Card key={principle.title}>
                <div className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <Icon size={22} aria-hidden />
                </div>
                <h2 className="mt-5 text-xl font-bold">{principle.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{principle.description}</p>
              </Card>
            );
          })}
        </section>

        <Card className="mt-12">
          <h2 className="text-2xl font-bold">MVP scope</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              "Landing page and dashboard",
              "React and Next.js learning paths",
              "Three complete concept visualizers",
              "Practice playground",
              "Quiz challenges",
              "Bookmarks and progress tracking",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-surface-muted p-4 text-sm font-semibold">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
