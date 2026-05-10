import { AppShell } from "@/components/navigation";
import { ProgressRing } from "@/components/progress-ring";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function ProgressPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="success">Progress</Badge>
        <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          Track what you understand.
        </h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <ProgressRing value={34} label="React Beginner" />
          </Card>
          <Card>
            <ProgressRing value={18} label="Next.js Beginner" />
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Weak areas</h2>
            <p className="mt-3 text-muted">
              Review effect dependencies and server/client boundaries next.
            </p>
          </Card>
          <Card>
            <h2 className="text-xl font-bold">Suggested next lessons</h2>
            <p className="mt-3 text-muted">
              Continue with useEffect Dependency Array after Props vs State.
            </p>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
