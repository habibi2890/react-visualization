import { AppShell } from "@/components/navigation";
import { QuizRunner } from "@/components/quiz/quiz-runner";
import { Badge } from "@/components/ui/badge";

export default function QuizPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="warning">Quiz</Badge>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          Check your mental model with short visual challenges.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          Choose an answer, get instant feedback, and save your best score locally.
        </p>
        <div className="mt-8">
          <QuizRunner />
        </div>
      </div>
    </AppShell>
  );
}
