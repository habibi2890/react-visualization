import { BookMarked, Search } from "lucide-react";
import { AppShell } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const terms = [
  {
    term: "Props",
    category: "React",
    definition: "Read-only values a parent component passes to a child.",
    example: "<ProductCard quantity={2} />",
    href: "/visualizers/props-vs-state",
  },
  {
    term: "State",
    category: "React",
    definition: "Component memory that can change over time and trigger a new render.",
    example: "const [count, setCount] = useState(0)",
    href: "/visualizers/props-vs-state",
  },
  {
    term: "Render",
    category: "React",
    definition: "React calls your component to calculate what the UI should look like next.",
    example: "state changes → React renders again",
    href: "/visualizers/react-render-cycle",
  },
  {
    term: "Commit",
    category: "React",
    definition: "The phase where React applies the prepared UI changes to the DOM.",
    example: "Button text changes from Items: 0 to Items: 1",
    href: "/visualizers/react-render-cycle",
  },
  {
    term: "Key",
    category: "React",
    definition: "A stable identity label React uses to match list items between renders.",
    example: "<TodoRow key={todo.id} />",
    href: "/visualizers/keys-list-diffing",
  },
  {
    term: "Dependency array",
    category: "Hooks",
    definition: "The watch list that tells React when an effect should run again.",
    example: "useEffect(syncUser, [userId])",
    href: "/visualizers/use-effect-dependency-array",
  },
  {
    term: "Server Component",
    category: "Next.js",
    definition: "A component that renders on the server and can fetch data without shipping component JS.",
    example: "async function ProductPage() { await getProduct() }",
    href: "/visualizers/server-vs-client-components",
  },
  {
    term: "Client Component",
    category: "Next.js",
    definition: "A component that runs in the browser for state, effects, events, or DOM APIs.",
    example: "\"use client\" + onClick",
    href: "/visualizers/server-vs-client-components",
  },
  {
    term: "Route segment",
    category: "Next.js",
    definition: "A folder in the app directory that maps to part of the URL.",
    example: "app/products/[id] → /products/42",
    href: "/route-map",
  },
];

export default function GlossaryPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Badge variant="primary">Glossary</Badge>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-[-0.04em] md:text-6xl">
          Simple words for confusing React and Next.js ideas.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          Short beginner-friendly definitions, tiny code examples, and direct links to visual lessons.
        </p>

        <div className="mt-8 rounded-3xl border border-border bg-surface-muted p-4 text-sm text-muted">
          <Search className="mr-2 inline size-4 text-primary" aria-hidden />
          Tip: use browser find to jump to a term quickly.
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {terms.map((item) => (
            <Card key={item.term}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <BookMarked className="text-primary" aria-hidden />
                  <h2 className="text-xl font-bold">{item.term}</h2>
                </div>
                <Badge>{item.category}</Badge>
              </div>
              <p className="mt-4 leading-7 text-muted">{item.definition}</p>
              <div className="mt-4 rounded-2xl bg-surface-muted p-4 font-mono text-sm text-muted">
                {item.example}
              </div>
              <ButtonLink href={item.href} variant="outline" className="mt-5">
                See visually
              </ButtonLink>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
