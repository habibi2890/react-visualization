import { AppShell } from "@/components/navigation";
import { PracticePlayground } from "@/components/playground/practice-playground";
import { Badge } from "@/components/ui/badge";

export default function PlaygroundPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="primary">Playground</Badge>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          Practice by fixing code, then connect it back to the visual model.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          Edit beginner-friendly broken examples, request hints, compare with the solution, and track attempts locally.
        </p>
        <div className="mt-8">
          <PracticePlayground />
        </div>
      </div>
    </AppShell>
  );
}
