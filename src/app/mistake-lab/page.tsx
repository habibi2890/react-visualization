import { AppShell } from "@/components/navigation";
import { MistakeExplorer } from "@/components/mistake-lab/mistake-explorer";
import { Badge } from "@/components/ui/badge";

export default function MistakeLabPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="danger">Mistake Lab</Badge>
        <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          Break React safely, then learn why it broke.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          Pick a common React or Next.js mistake, inspect the broken code, reveal the mental model, then jump back into the matching visualizer.
        </p>

        <div className="mt-8">
          <MistakeExplorer />
        </div>
      </div>
    </AppShell>
  );
}
