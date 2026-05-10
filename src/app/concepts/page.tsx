import { AppShell } from "@/components/navigation";
import { ConceptBrowser } from "@/components/concept-browser";
import { Badge } from "@/components/ui/badge";

export default function ConceptsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="primary">Concept library</Badge>
        <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          Learn one invisible concept at a time.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          Search and filter concept visualizers by topic, category, and mental model.
        </p>
        <ConceptBrowser />
      </div>
    </AppShell>
  );
}
