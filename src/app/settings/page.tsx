import { AppShell } from "@/components/navigation";
import { SettingsPanel } from "@/components/settings-panel";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="primary">Settings</Badge>
        <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          Personalize your learning lab.
        </h1>
        <Card className="mt-8">
          <h2 className="text-xl font-bold">Appearance</h2>
          <p className="mt-2 text-muted">
            Toggle between light and dark mode. The app also respects your system preference.
          </p>
          <div className="mt-5">
            <ThemeToggle />
          </div>
        </Card>
        <div className="mt-6">
          <SettingsPanel />
        </div>
      </div>
    </AppShell>
  );
}
