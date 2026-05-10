"use client";

import { CheckCircle2, Lightbulb, RotateCcw, WandSparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { concepts } from "@/content/lessons";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/stores/progress-store";

const challenges = [
  {
    slug: "react-render-cycle",
    title: "Avoid stale state logs",
    prompt: "Update count safely and avoid assuming console.log sees the next render value.",
    starter: `function addItem() {
  setCount(count + 1);
  console.log(count);
}`,
    solution: `function addItem() {
  setCount((current) => current + 1);
}

useEffect(() => {
  console.log(count);
}, [count]);`,
    hint: "State variables are snapshots. The next value appears after React renders again.",
    visual: "setCount queues work. React renders the next UI, commits it, then effects can read the latest committed value.",
    keyword: "(current)",
  },
  {
    slug: "props-vs-state",
    title: "Fix state ownership",
    prompt: "Move the changing value into ProductPage state and pass it down as props.",
    starter: `function ProductCard({ quantity }) {
  quantity = quantity + 1;
  return <p>Quantity: {quantity}</p>;
}`,
    solution: `function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  return <ProductCard quantity={quantity} onAdd={() => setQuantity(quantity + 1)} />;
}`,
    hint: "The component that creates state should be the one that changes it.",
    visual: "State lives in ProductPage. ProductCard receives quantity and onAdd as props.",
    keyword: "useState",
  },
  {
    slug: "use-effect-dependency-array",
    title: "Add the missing dependency",
    prompt: "The effect reads userId. Update the dependency array so the effect stays fresh.",
    starter: `useEffect(() => {
  connectToUser(userId);
}, []);`,
    solution: `useEffect(() => {
  const connection = connectToUser(userId);
  return () => connection.disconnect();
}, [userId]);`,
    hint: "If an effect reads a reactive value, that value belongs in the dependency list.",
    visual: "React compares previous userId with current userId before running the effect again.",
    keyword: "[userId]",
  },
  {
    slug: "server-vs-client-components",
    title: "Shrink the client boundary",
    prompt: "Keep data fetching on the server and move use client to the interactive button.",
    starter: `"use client";

export default async function ProductPage() {
  const product = await getProduct();
  return <button onClick={() => addToCart(product)}>Add</button>;
}`,
    solution: `export default async function ProductPage() {
  const product = await getProduct();
  return <AddToCartButton product={product} />;
}

"use client";
function AddToCartButton({ product }) {
  return <button onClick={() => addToCart(product)}>Add</button>;
}`,
    hint: "Only the component with browser interaction needs the client boundary.",
    visual: "ProductPage stays on the server. AddToCartButton hydrates in the browser.",
    keyword: "AddToCartButton",
  },
];

export function PracticePlayground() {
  const [selectedSlug, setSelectedSlug] = useState(challenges[0].slug);
  const challenge = challenges.find((item) => item.slug === selectedSlug) ?? challenges[0];
  const [code, setCode] = useState(challenge.starter);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const recordPlaygroundAttempt = useProgressStore((state) => state.recordPlaygroundAttempt);

  const status = useMemo(() => {
    if (code.includes(challenge.keyword)) {
      return "Looks close";
    }

    return "Keep iterating";
  }, [challenge.keyword, code]);

  const relatedConcept = concepts.find((concept) => concept.slug === selectedSlug);

  function selectChallenge(slug: string) {
    const next = challenges.find((item) => item.slug === slug) ?? challenges[0];
    setSelectedSlug(slug);
    setCode(next.starter);
    setShowHint(false);
    setShowSolution(false);
  }

  function submitAttempt() {
    recordPlaygroundAttempt(challenge.slug);
    setShowSolution(true);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
      <aside className="space-y-3">
        {challenges.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => selectChallenge(item.slug)}
            className={cn(
              "w-full rounded-3xl border p-5 text-left transition",
              item.slug === challenge.slug
                ? "border-primary bg-primary-soft/50"
                : "border-border bg-surface hover:border-primary/40",
            )}
          >
            <p className="font-bold">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{item.prompt}</p>
          </button>
        ))}
      </aside>

      <div className="grid gap-6">
        <Card>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <Badge variant="primary">Practice playground</Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em]">{challenge.title}</h2>
              <p className="mt-3 max-w-2xl text-muted">{challenge.prompt}</p>
            </div>
            <Badge variant={status === "Looks close" ? "success" : "warning"}>{status}</Badge>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <Card className="p-0">
            <label htmlFor="practice-code" className="sr-only">
              Practice code
            </label>
            <textarea
              id="practice-code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              spellCheck={false}
              className="min-h-[420px] w-full resize-y rounded-3xl border-0 bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-100 outline-none focus:ring-2 focus:ring-primary"
            />
          </Card>

          <div className="space-y-6">
            <Card>
              <h3 className="text-xl font-bold">Visual feedback</h3>
              <div className="mt-5 rounded-3xl border border-border bg-surface-muted p-5">
                <div className="flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                    <WandSparkles size={20} aria-hidden />
                  </div>
                  <p className="font-semibold">{challenge.visual}</p>
                </div>
                <div className="mt-5 h-2 rounded-full bg-border">
                  <div
                    className={cn(
                      "h-2 rounded-full transition-all",
                      status === "Looks close" ? "w-full bg-success" : "w-1/2 bg-warning",
                    )}
                  />
                </div>
              </div>
              {relatedConcept ? (
                <a
                  href={`/visualizers/${relatedConcept.slug}`}
                  className="mt-5 inline-flex font-semibold text-primary"
                >
                  Review {relatedConcept.title}
                </a>
              ) : null}
            </Card>

            <Card>
              <h3 className="text-xl font-bold">Actions</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button type="button" onClick={submitAttempt}>
                  <CheckCircle2 size={16} aria-hidden />
                  Check answer
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowHint((value) => !value)}>
                  <Lightbulb size={16} aria-hidden />
                  Hint
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setCode(challenge.starter);
                    setShowSolution(false);
                  }}
                >
                  <RotateCcw size={16} aria-hidden />
                  Reset
                </Button>
              </div>
              {showHint ? <p className="mt-4 rounded-2xl bg-warning/10 p-4 text-sm text-muted">{challenge.hint}</p> : null}
              {showSolution ? (
                <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-sm leading-7 text-slate-100">
                  <code>{challenge.solution}</code>
                </pre>
              ) : null}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
