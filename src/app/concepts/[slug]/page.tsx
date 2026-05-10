import { notFound } from "next/navigation";
import { BookmarkButton, CompleteLessonButton } from "@/components/bookmark-button";
import { AppShell } from "@/components/navigation";
import { CodeBlock } from "@/components/code-block";
import { LessonCompletionPanel } from "@/components/lesson-completion-panel";
import { LessonNotes } from "@/components/lesson-notes";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { concepts } from "@/content/lessons";

export default async function ConceptDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = concepts.find((item) => item.slug === slug);

  if (!concept) {
    notFound();
  }

  const example = concept.codeExamples[0];

  return (
    <AppShell>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <main>
          <Badge variant="primary">{concept.category}</Badge>
          <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] md:text-6xl">
            {concept.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            {concept.shortDescription}
          </p>

          <Card className="mt-8">
            <h2 className="text-2xl font-bold">Mental model</h2>
            <p className="mt-4 leading-8 text-muted">{concept.mentalModel}</p>
          </Card>

          <section className="mt-8">
            <h2 className="mb-4 text-2xl font-bold">Code example</h2>
            <CodeBlock code={example.code} activeLines={example.highlightedLines ?? []} />
          </section>

          <Card className="mt-8">
            <h2 className="text-2xl font-bold">Step-by-step explanation</h2>
            <div className="mt-5 space-y-3">
              {concept.steps.map((step, index) => (
                <div key={step.id} className="rounded-2xl bg-surface-muted p-4">
                  <p className="text-sm font-semibold text-primary">
                    Step {index + 1}: {step.title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">{step.description}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="mt-8">
            <h2 className="text-2xl font-bold">Common mistake</h2>
            <p className="mt-4 font-semibold">{concept.commonMistakes[0].title}</p>
            <p className="mt-2 leading-7 text-muted">{concept.commonMistakes[0].explanation}</p>
          </Card>

          <div className="mt-8">
            <LessonNotes slug={concept.slug} title={concept.title} />
          </div>

          <div className="mt-8">
            <LessonCompletionPanel slug={concept.slug} mode="concept" />
          </div>
        </main>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <h2 className="text-xl font-bold">Learning goals</h2>
            <ul className="mt-4 space-y-3">
              {concept.learningGoals.map((goal) => (
                <li key={goal} className="rounded-2xl bg-surface-muted px-4 py-3 text-sm text-muted">
                  {goal}
                </li>
              ))}
            </ul>
            <ButtonLink href={`/visualizers/${concept.slug}`} className="mt-6 w-full">
              Open visualizer
            </ButtonLink>
            <div className="mt-3 flex flex-wrap gap-3">
              <BookmarkButton slug={concept.slug} />
              <CompleteLessonButton slug={concept.slug} />
            </div>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Related concepts</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {concept.relatedConcepts.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </AppShell>
  );
}

export function generateStaticParams() {
  return concepts.map((concept) => ({ slug: concept.slug }));
}
