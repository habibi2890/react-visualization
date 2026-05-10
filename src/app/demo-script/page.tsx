import { Clock, MonitorPlay } from "lucide-react";
import { AppShell } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const demoSteps = [
  {
    time: "0:00",
    title: "Open with the pain point",
    talk: "React feels hard because important things are invisible: state, renders, effects, keys, and server/client boundaries.",
    href: "/",
  },
  {
    time: "0:45",
    title: "Show the beginner path",
    talk: "Start Here gives a simple first route instead of overwhelming learners with every feature at once.",
    href: "/start",
  },
  {
    time: "1:30",
    title: "Demo a visualizer",
    talk: "Use React Render Cycle to step through click, setState, render, commit, and effects.",
    href: "/visualizers/react-render-cycle",
  },
  {
    time: "2:45",
    title: "Show mistakes and practice",
    talk: "Mistake Lab and Playground turn common bugs into safe practice moments.",
    href: "/mistake-lab",
  },
  {
    time: "3:45",
    title: "Show support tools",
    talk: "Compare and Glossary help learners recover quickly when terms or similar concepts become confusing.",
    href: "/compare",
  },
  {
    time: "4:30",
    title: "Close with product value",
    talk: "The platform is a polished learning lab: visual, practical, structured, and demo-ready.",
    href: "/roadmaps",
  },
];

export default function DemoScriptPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="primary">Demo script</Badge>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          A 5-minute walkthrough for presenting React Visual Lab.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          Use this as a portfolio, classroom, school project, or startup prototype pitch flow.
        </p>

        <div className="mt-8 grid gap-5">
          {demoSteps.map((step) => (
            <Card key={step.time}>
              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-4">
                  <span className="inline-flex h-12 min-w-20 items-center justify-center gap-2 rounded-2xl bg-primary-soft px-4 text-sm font-bold text-primary">
                    <Clock size={16} aria-hidden />
                    {step.time}
                  </span>
                  <div>
                    <div className="flex items-center gap-3">
                      <MonitorPlay className="text-primary" aria-hidden />
                      <h2 className="text-2xl font-bold">{step.title}</h2>
                    </div>
                    <p className="mt-3 leading-7 text-muted">{step.talk}</p>
                  </div>
                </div>
                <ButtonLink href={step.href} variant="outline">
                  Open page
                </ButtonLink>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
