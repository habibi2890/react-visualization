import { AppShell } from "@/components/navigation";
import { ProgressSummary } from "@/components/progress-summary";
import { Badge } from "@/components/ui/badge";

export default function ProgressPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="success">Progress</Badge>
        <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          Track what you understand.
        </h1>
        <div className="mt-8">
          <ProgressSummary />
        </div>
      </div>
    </AppShell>
  );
}
