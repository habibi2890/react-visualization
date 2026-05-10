"use client";

import {
  AlertTriangle,
  ArrowRight,
  Braces,
  FileCode2,
  FolderTree,
  Loader2,
  MousePointerClick,
  PanelTop,
  Server,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type RouteNode = {
  id: string;
  label: string;
  path: string;
  file: string;
  kind: "page" | "layout" | "loading" | "error" | "not-found" | "client" | "dynamic";
  description: string;
  url: string;
  parentId?: string;
};

const routeNodes: RouteNode[] = [
  {
    id: "root-layout",
    label: "Root layout",
    path: "app/layout.tsx",
    file: "layout.tsx",
    kind: "layout",
    description: "Wraps every route with shared shell, theme providers, and global UI.",
    url: "all routes",
  },
  {
    id: "products-layout",
    label: "Products layout",
    path: "app/products/layout.tsx",
    file: "layout.tsx",
    kind: "layout",
    description: "Adds product-specific navigation while keeping the root layout above it.",
    url: "/products/*",
    parentId: "root-layout",
  },
  {
    id: "products-page",
    label: "Products page",
    path: "app/products/page.tsx",
    file: "page.tsx",
    kind: "page",
    description: "Creates the /products URL. A route becomes public when a folder has page.tsx.",
    url: "/products",
    parentId: "products-layout",
  },
  {
    id: "product-detail",
    label: "Dynamic product page",
    path: "app/products/[id]/page.tsx",
    file: "[id]/page.tsx",
    kind: "dynamic",
    description: "The [id] segment captures values like /products/42 and passes them as params.",
    url: "/products/42",
    parentId: "products-layout",
  },
  {
    id: "loading",
    label: "Loading UI",
    path: "app/products/[id]/loading.tsx",
    file: "loading.tsx",
    kind: "loading",
    description: "Shows an instant fallback while the route segment streams or fetches data.",
    url: "/products/42",
    parentId: "product-detail",
  },
  {
    id: "error",
    label: "Error UI",
    path: "app/products/[id]/error.tsx",
    file: "error.tsx",
    kind: "error",
    description: "Handles recoverable errors for this segment without breaking the whole app.",
    url: "/products/42",
    parentId: "product-detail",
  },
  {
    id: "not-found",
    label: "Not found UI",
    path: "app/products/[id]/not-found.tsx",
    file: "not-found.tsx",
    kind: "not-found",
    description: "Renders when the product does not exist or notFound() is called.",
    url: "/products/missing",
    parentId: "product-detail",
  },
  {
    id: "client-island",
    label: "Client island",
    path: "app/products/[id]/add-to-cart-button.tsx",
    file: "add-to-cart-button.tsx",
    kind: "client",
    description: "Uses the browser for state, effects, events, or DOM APIs inside a small boundary.",
    url: "/products/42",
    parentId: "product-detail",
  },
];

const routeSteps = [
  {
    id: "match-url",
    title: "URL matches folders",
    description: "Next.js reads the app directory like a map. /products/42 matches products/[id].",
    activeIds: ["root-layout", "products-layout", "product-detail"],
  },
  {
    id: "compose-layouts",
    title: "Layouts wrap the page",
    description: "Root layout wraps products layout, then the page renders inside both shells.",
    activeIds: ["root-layout", "products-layout", "product-detail"],
  },
  {
    id: "fetch-server",
    title: "Server page fetches data",
    description: "page.tsx can be async and fetch product data before sending UI to the browser.",
    activeIds: ["product-detail"],
  },
  {
    id: "stream-loading",
    title: "Loading and error files protect UX",
    description: "loading.tsx, error.tsx, and not-found.tsx explain in-between or failure states.",
    activeIds: ["loading", "error", "not-found"],
  },
  {
    id: "hydrate-client",
    title: "Client island hydrates",
    description: "Only the Add to cart button needs browser JavaScript for onClick interaction.",
    activeIds: ["client-island"],
  },
];

const kindStyles: Record<RouteNode["kind"], string> = {
  page: "border-primary/30 bg-primary-soft text-primary",
  layout: "border-success/30 bg-success/10 text-success",
  loading: "border-warning/30 bg-warning/10 text-warning",
  error: "border-danger/30 bg-danger/10 text-danger",
  "not-found": "border-danger/30 bg-danger/10 text-danger",
  client: "border-accent/30 bg-accent/10 text-accent",
  dynamic: "border-primary/30 bg-primary-soft text-primary",
};

export function RouteMapExplorer() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedNodeId, setSelectedNodeId] = useState("product-detail");
  const activeStep = routeSteps[activeStepIndex];
  const selectedNode = useMemo(
    () => routeNodes.find((node) => node.id === selectedNodeId) ?? routeNodes[0],
    [selectedNodeId],
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <Card>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <Badge variant="primary">App Router map</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em]">
                From folders to URL, layout stack, and client boundary.
              </h2>
              <p className="mt-3 max-w-3xl text-muted">
                Click files or step through the route lifecycle to see how Next.js turns app directory files into a page.
              </p>
            </div>
            <Badge variant="success">{activeStep.title}</Badge>
          </div>
        </Card>

        <Card>
          <div className="grid gap-3">
            {routeNodes.map((node) => {
              const active = activeStep.activeIds.includes(node.id);

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNodeId(node.id)}
                  className={cn(
                    "flex flex-col gap-3 rounded-2xl border p-4 text-left transition md:flex-row md:items-center md:justify-between",
                    selectedNode.id === node.id
                      ? "border-primary bg-primary-soft/50"
                      : active
                        ? "border-success/40 bg-success/10"
                        : "border-border bg-surface-muted hover:border-primary/40",
                  )}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <RouteIcon kind={node.kind} />
                    <div className="min-w-0">
                      <p className="font-mono text-sm font-bold">{node.path}</p>
                      <p className="mt-1 text-xs text-muted">{node.label}</p>
                    </div>
                  </div>
                  <span className={cn("shrink-0 rounded-full border px-3 py-1 text-xs font-semibold", kindStyles[node.kind])}>
                    {node.file}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-bold">Route lifecycle</h3>
          <div className="mt-5 grid gap-3 md:grid-cols-5">
            {routeSteps.map((step, index) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStepIndex(index)}
                className={cn(
                  "rounded-2xl border p-4 text-left transition",
                  index === activeStepIndex
                    ? "border-primary bg-primary-soft/60"
                    : "border-border bg-surface-muted hover:border-primary/40",
                )}
              >
                <span className="grid size-8 place-items-center rounded-full bg-surface text-sm font-bold text-primary">
                  {index + 1}
                </span>
                <p className="mt-3 text-sm font-bold">{step.title}</p>
              </button>
            ))}
          </div>
          <p className="mt-5 rounded-2xl bg-surface-muted p-4 text-sm leading-6 text-muted">
            {activeStep.description}
          </p>
        </Card>
      </div>

      <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
        <Card>
          <div className="flex items-center gap-3">
            <FolderTree className="text-primary" aria-hidden />
            <h3 className="text-xl font-bold">Selected file</h3>
          </div>
          <div className="mt-5 rounded-3xl border border-border bg-surface-muted p-5">
            <p className="font-mono text-sm font-bold">{selectedNode.path}</p>
            <p className="mt-3 leading-7 text-muted">{selectedNode.description}</p>
          </div>
          <div className="mt-5 grid gap-3">
            <InspectorRow label="URL" value={selectedNode.url} />
            <InspectorRow label="File convention" value={selectedNode.file} />
            <InspectorRow label="Kind" value={selectedNode.kind} />
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-bold">Mental model</h3>
          <div className="mt-5 space-y-3">
            {[
              ["Folders define route segments", "app/products/[id] maps to /products/:id"],
              ["Layouts nest visually", "Each layout wraps the child route."],
              ["Client code is explicit", "Use small client islands for browser interaction."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl bg-surface-muted p-4">
                <p className="font-bold">{title}</p>
                <p className="mt-1 text-sm leading-6 text-muted">{body}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-bold">Request flow</h3>
          <div className="mt-5 flex items-center gap-3 rounded-2xl bg-surface-muted p-4 text-sm">
            <MousePointerClick className="text-primary" aria-hidden />
            <span>/products/42</span>
            <ArrowRight className="text-muted" aria-hidden />
            <Server className="text-success" aria-hidden />
          </div>
        </Card>
      </aside>
    </div>
  );
}

function RouteIcon({ kind }: { kind: RouteNode["kind"] }) {
  const iconClass = "shrink-0 text-primary";

  if (kind === "layout") return <PanelTop className={iconClass} aria-hidden />;
  if (kind === "loading") return <Loader2 className={iconClass} aria-hidden />;
  if (kind === "error" || kind === "not-found") return <AlertTriangle className={iconClass} aria-hidden />;
  if (kind === "client") return <MousePointerClick className={iconClass} aria-hidden />;
  if (kind === "dynamic") return <Braces className={iconClass} aria-hidden />;

  return <FileCode2 className={iconClass} aria-hidden />;
}

function InspectorRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-surface-muted px-4 py-3 text-sm">
      <span className="text-muted">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
