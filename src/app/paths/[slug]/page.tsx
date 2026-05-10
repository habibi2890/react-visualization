import { notFound } from "next/navigation";
import { LearningPathProgress } from "@/components/learning-path-progress";
import { AppShell } from "@/components/navigation";
import { ProgressRing } from "@/components/progress-ring";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { concepts, learningPaths } from "@/content/lessons";

export default async function LearningPathPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = learningPaths.find((item) => item.slug === slug);

  if (!path) {
    notFound();
  }

  const lessons = path.lessonSlugs
    .map((lessonSlug) => concepts.find((concept) => concept.slug === lessonSlug))
    .filter((lesson) => lesson !== undefined);

  return (
    <AppShell>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div>
          <Card className="p-8">
            <Badge variant="primary">{path.difficulty}</Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] md:text-6xl">
              {path.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              {path.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`/visualizers/${lessons[0]?.slug ?? "props-vs-state"}`}>
                Start path
              </ButtonLink>
              <ButtonLink href="/dashboard" variant="outline">
                Back to dashboard
              </ButtonLink>
            </div>
          </Card>

          <div className="mt-8">
            <LearningPathProgress path={path} lessons={lessons} />
          </div>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <ProgressRing value={path.slug === "react-beginner" ? 34 : 18} label={path.title} />
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Prerequisites</h2>
            <ul className="mt-4 space-y-3">
              {path.prerequisites.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-muted">
                  <span className="size-2 rounded-full bg-success" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">You will learn</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {path.outcomes.map((outcome) => (
                <Badge key={outcome}>{outcome}</Badge>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}

export function generateStaticParams() {
  return learningPaths.map((path) => ({ slug: path.slug }));
}
