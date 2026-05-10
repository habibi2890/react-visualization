import { AppShell } from "@/components/navigation";
import { RouteMapExplorer } from "@/components/nextjs/route-map-explorer";
import { Badge } from "@/components/ui/badge";

export default function RouteMapPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="primary">Next.js Route Map</Badge>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          See how App Router files become routes, layouts, and loading states.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          Explore a realistic product route and watch how folders, dynamic segments, file conventions, Server Components, and Client Components fit together.
        </p>
        <div className="mt-8">
          <RouteMapExplorer />
        </div>
      </div>
    </AppShell>
  );
}
