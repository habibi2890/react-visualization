import type { ConceptLesson, LearningPath } from "@/types/lesson";

export const propsVsStateLesson: ConceptLesson = {
  id: "react-props-vs-state",
  slug: "props-vs-state",
  title: "React Props vs State",
  category: "react",
  difficulty: "beginner",
  estimatedMinutes: 12,
  prerequisites: ["Components and JSX"],
  shortDescription:
    "See how props flow from parent to child while state lives inside the component that owns it.",
  learningGoals: [
    "Explain the difference between props and state",
    "Identify which component owns a value",
    "Describe why props are read-only",
    "Predict which components re-render after a state change",
  ],
  explanation:
    "Props are information a parent gives to a child. State is memory a component owns and can update.",
  mentalModel:
    "Think of props like arguments passed into a function. Think of state like a component notebook: it remembers values between renders.",
  codeExamples: [
    {
      id: "product-card",
      title: "Product quantity example",
      language: "tsx",
      highlightedLines: [2, 6, 8, 9],
      code: `function ProductPage() {
  const [quantity, setQuantity] = useState(1);

  return (
    <ProductCard
      name="React Sticker"
      price={5}
      quantity={quantity}
      onAdd={() => setQuantity(quantity + 1)}
    />
  );
}

function ProductCard({ name, price, quantity, onAdd }) {
  return (
    <article>
      <h2>{name}</h2>
      <p>$ {price}</p>
      <p>Quantity: {quantity}</p>
      <button onClick={onAdd}>Add one</button>
    </article>
  );
}`,
    },
  ],
  visualizationType: "tree",
  steps: [
    {
      id: "initial-render",
      title: "Initial render",
      description:
        "ProductPage creates quantity state and renders ProductCard with the current value.",
      activeCodeLines: [1, 2, 5],
      timelineEvent: "Initial render",
      inspectorNotes: ["ProductPage owns quantity.", "ProductCard is created as a child."],
      stateValue: 1,
      previousStateValue: undefined,
      propValue: 1,
      activeComponents: ["ProductPage", "ProductCard"],
    },
    {
      id: "props-flow",
      title: "Props flow down",
      description:
        "The parent sends name, price, quantity, and onAdd to ProductCard as read-only props.",
      activeCodeLines: [6, 7, 8, 9],
      timelineEvent: "Props sent to child",
      inspectorNotes: ["Props move in one direction: parent to child."],
      stateValue: 1,
      propValue: 1,
      activeComponents: ["ProductCard"],
      showPropFlow: true,
    },
    {
      id: "child-reads-props",
      title: "Child reads props",
      description:
        "ProductCard displays the value, but it does not own quantity.",
      activeCodeLines: [14, 18, 19],
      timelineEvent: "Child renders props",
      inspectorNotes: ["Reading props is safe.", "Changing props directly is not."],
      stateValue: 1,
      propValue: 1,
      activeComponents: ["ProductCard"],
    },
    {
      id: "click-event",
      title: "User clicks Add one",
      description:
        "The child calls onAdd, a function it received from the parent.",
      activeCodeLines: [9, 20],
      timelineEvent: "Click event",
      inspectorNotes: ["The child asks the parent to update state."],
      stateValue: 1,
      propValue: 1,
      activeComponents: ["ProductCard"],
    },
    {
      id: "state-update",
      title: "State updates",
      description:
        "setQuantity changes ProductPage memory from 1 to 2 and asks React to render again.",
      activeCodeLines: [2, 9],
      timelineEvent: "State update queued",
      inspectorNotes: ["State changes in the component that owns it."],
      stateValue: 2,
      previousStateValue: 1,
      propValue: 1,
      activeComponents: ["ProductPage"],
    },
    {
      id: "rerender",
      title: "Re-render happens",
      description:
        "React runs ProductPage again with the new state, then ProductCard receives updated props.",
      activeCodeLines: [1, 5, 8],
      timelineEvent: "Parent and child re-render",
      inspectorNotes: ["The new state value becomes the next prop value."],
      stateValue: 2,
      previousStateValue: 1,
      propValue: 2,
      activeComponents: ["ProductPage", "ProductCard"],
      showPropFlow: true,
    },
    {
      id: "ui-updates",
      title: "UI updates",
      description:
        "The screen now shows Quantity: 2 because the UI matches the latest state.",
      activeCodeLines: [19],
      timelineEvent: "DOM update",
      inspectorNotes: ["The UI is a result of the latest render."],
      stateValue: 2,
      previousStateValue: 1,
      propValue: 2,
      activeComponents: ["ProductCard"],
    },
    {
      id: "mutating-props",
      title: "Common mistake",
      description:
        "A child should not mutate props. Ask the owner to change state instead.",
      activeCodeLines: [],
      timelineEvent: "Mistake explained",
      inspectorNotes: ["Props are read-only from the child point of view."],
      stateValue: 2,
      propValue: 2,
      activeComponents: ["ProductCard"],
      showMistake: true,
    },
  ],
  commonMistakes: [
    {
      id: "mutating-props",
      title: "Trying to change props directly",
      brokenCode: `function ProductCard(props) {
  props.quantity = props.quantity + 1;
}`,
      explanation:
        "Props are read-only for the child. The child did not create this value, so it should not change it directly.",
      fix:
        "Pass an event handler from the parent. The child calls it, and the parent updates its own state.",
      preventionTip:
        "When a value must change, ask: which component owns this value?",
    },
  ],
  quiz: [
    {
      id: "quantity-owner",
      question: "Where does quantity live in this example?",
      options: [
        "Inside ProductCard because it displays the value",
        "Inside ProductPage because it uses useState",
        "Inside the button because the button changes it",
        "Inside React automatically with no owner",
      ],
      correctOptionIndex: 1,
      explanation:
        "ProductPage owns quantity because it created the state with useState.",
    },
  ],
  relatedConcepts: ["State as memory", "Lifting state up", "Rendering basics"],
};

export const useEffectDependencyLesson: ConceptLesson = {
  id: "react-use-effect-dependencies",
  slug: "use-effect-dependency-array",
  title: "useEffect Dependency Array",
  category: "hooks",
  difficulty: "beginner",
  estimatedMinutes: 14,
  prerequisites: ["Props vs State", "Basic event handling"],
  shortDescription:
    "Watch React compare dependencies and decide whether an effect should run again.",
  learningGoals: [
    "Explain when useEffect runs",
    "Understand why dependency arrays matter",
    "See cleanup timing before the next effect",
    "Avoid missing dependency and infinite loop mistakes",
  ],
  explanation:
    "The dependency array is a list of values React compares after each render. If one value changed, React runs the effect again.",
  mentalModel:
    "Think of the dependency array like a watch list. React checks the list after render and only re-runs the effect when something on the list changed.",
  codeExamples: [
    {
      id: "profile-effect",
      title: "Profile synchronization effect",
      language: "tsx",
      highlightedLines: [4, 7, 8],
      code: `function ProfilePanel({ userId }) {
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    setStatus("loading");
    const connection = connectToUser(userId);

    return () => connection.disconnect();
  }, [userId]);

  return <p>Status: {status}</p>;
}`,
    },
  ],
  visualizationType: "timeline",
  steps: [
    {
      id: "render-one",
      title: "Render with userId 42",
      description:
        "ProfilePanel renders. After the screen updates, React checks the dependency array.",
      activeCodeLines: [1, 4, 9],
      timelineEvent: "Render #1",
      inspectorNotes: ["userId is 42", "No previous dependencies exist yet."],
      activeComponents: ["Render", "Dependency check"],
    },
    {
      id: "effect-runs",
      title: "Effect runs after render",
      description:
        "Because this is the first render, React runs the effect and creates a connection for user 42.",
      activeCodeLines: [4, 5, 6],
      timelineEvent: "Run effect",
      inspectorNotes: ["Effect runs after paint.", "Cleanup is saved for later."],
      activeComponents: ["Effect", "Connection"],
    },
    {
      id: "same-dependency",
      title: "Render again with same userId",
      description:
        "React compares [42] to [42]. Nothing changed, so the effect does not run again.",
      activeCodeLines: [9],
      timelineEvent: "Effect skipped",
      inspectorNotes: ["Previous: [42]", "Current: [42]", "No dependency changed."],
      activeComponents: ["Dependency check"],
    },
    {
      id: "changed-dependency",
      title: "userId changes to 99",
      description:
        "React compares [42] to [99]. The dependency changed, so the old effect must clean up.",
      activeCodeLines: [1, 8, 9],
      timelineEvent: "Dependency changed",
      inspectorNotes: ["Previous: [42]", "Current: [99]", "Cleanup runs first."],
      activeComponents: ["Cleanup", "Dependency check"],
    },
    {
      id: "new-effect",
      title: "New effect runs",
      description:
        "After cleanup, React runs the effect again and connects to user 99.",
      activeCodeLines: [4, 6],
      timelineEvent: "Run new effect",
      inspectorNotes: ["The effect now uses the latest userId.", "Connection is fresh."],
      activeComponents: ["Effect", "Connection"],
    },
    {
      id: "missing-dependency",
      title: "Common mistake",
      description:
        "If userId is used inside the effect but missing from the dependency array, the effect can keep using an old value.",
      activeCodeLines: [4, 6, 9],
      timelineEvent: "Stale value risk",
      inspectorNotes: ["Missing dependencies create stale closures."],
      activeComponents: ["Mistake"],
      showMistake: true,
    },
  ],
  commonMistakes: [
    {
      id: "missing-user-id",
      title: "Leaving userId out of the dependency array",
      brokenCode: `useEffect(() => {
  connectToUser(userId);
}, []);`,
      explanation:
        "The effect reads userId, but the empty dependency array tells React it never needs to run again.",
      fix: "Include userId in the dependency array: }, [userId]);",
      preventionTip:
        "If an effect reads a reactive value, include it or restructure the code so the effect no longer needs it.",
    },
  ],
  quiz: [
    {
      id: "effect-run-reason",
      question: "Why does the effect run again when userId changes?",
      options: [
        "Because every render always runs every effect",
        "Because React compared the dependency array and found a changed value",
        "Because setStatus is inside the effect",
        "Because cleanup always triggers a new render",
      ],
      correctOptionIndex: 1,
      explanation:
        "React compares the previous and current dependency values. The effect runs again when at least one dependency changed.",
    },
  ],
  relatedConcepts: ["Effect cleanup", "Stale closures", "Event handlers"],
};

export const serverClientComponentsLesson: ConceptLesson = {
  id: "next-server-client-components",
  slug: "server-vs-client-components",
  title: "Server Components vs Client Components",
  category: "nextjs",
  difficulty: "beginner",
  estimatedMinutes: 16,
  prerequisites: ["React components", "Props vs State", "Basic routing"],
  shortDescription:
    "See where components render, what hydrates in the browser, and where the use client boundary begins.",
  learningGoals: [
    "Identify Server and Client Components",
    "Explain what the use client boundary means",
    "Understand hydration at a beginner level",
    "Avoid making everything a Client Component",
  ],
  explanation:
    "Server Components render on the server by default. Client Components are used when you need state, event handlers, effects, or browser APIs.",
  mentalModel:
    "Think of Server Components as preparation work in the kitchen and Client Components as interactive controls at the table.",
  codeExamples: [
    {
      id: "product-page-boundary",
      title: "Next.js product page with client boundary",
      language: "tsx",
      highlightedLines: [1, 6, 11],
      code: `// app/products/[id]/page.tsx
import AddToCartButton from "./add-to-cart-button";

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  return <AddToCartButton product={product} />;
}

// app/products/[id]/add-to-cart-button.tsx
"use client";

export default function AddToCartButton({ product }) {
  return <button onClick={() => addToCart(product)}>Add to cart</button>;
}`,
    },
  ],
  visualizationType: "route-map",
  steps: [
    {
      id: "request",
      title: "Request reaches the server",
      description:
        "The user opens /products/42. Next.js starts rendering the route on the server.",
      activeCodeLines: [1, 4],
      timelineEvent: "Request /products/42",
      inspectorNotes: ["The route starts as server-rendered work."],
      activeComponents: ["Browser", "Server"],
    },
    {
      id: "server-component",
      title: "Server Component fetches data",
      description:
        "ProductPage can fetch data close to the source without sending that data-fetching code to the browser.",
      activeCodeLines: [4, 5],
      timelineEvent: "Server render",
      inspectorNotes: ["No use client directive here.", "This component can be async."],
      activeComponents: ["Server Component"],
    },
    {
      id: "client-boundary",
      title: "use client creates a boundary",
      description:
        "AddToCartButton needs an onClick handler, so it becomes a Client Component.",
      activeCodeLines: [10, 11, 14],
      timelineEvent: "Client boundary",
      inspectorNotes: ["Client Components can use events and state."],
      activeComponents: ["Client Component"],
    },
    {
      id: "payload",
      title: "Server sends HTML and RSC payload",
      description:
        "The browser receives a fast preview plus instructions for where the Client Component belongs.",
      activeCodeLines: [7, 14],
      timelineEvent: "HTML + RSC payload",
      inspectorNotes: ["Props crossing the boundary must be serializable."],
      activeComponents: ["RSC Payload", "Browser"],
    },
    {
      id: "hydrate",
      title: "Client hydrates interactive UI",
      description:
        "JavaScript loads for AddToCartButton, then React attaches the click handler.",
      activeCodeLines: [14],
      timelineEvent: "Hydration",
      inspectorNotes: ["The button becomes interactive in the browser."],
      activeComponents: ["Hydration", "Client Component"],
    },
    {
      id: "over-client",
      title: "Common mistake",
      description:
        "Adding use client too high in the tree sends more JavaScript than needed and can hide useful server-first benefits.",
      activeCodeLines: [10, 11],
      timelineEvent: "Boundary too high",
      inspectorNotes: ["Keep client boundaries as small as practical."],
      activeComponents: ["Mistake"],
      showMistake: true,
    },
  ],
  commonMistakes: [
    {
      id: "use-client-everywhere",
      title: "Putting use client on every component",
      brokenCode: `"use client";

export default async function ProductPage() {
  const product = await getProduct();
  return <ProductView product={product} />;
}`,
      explanation:
        "Client Components are useful for interactivity, but marking everything as client-side can send unnecessary JavaScript and remove server-first benefits.",
      fix: "Keep the page as a Server Component and move use client to the smallest interactive child.",
      preventionTip:
        "Ask: does this component need state, effects, event handlers, or browser APIs?",
    },
  ],
  quiz: [
    {
      id: "client-component-need",
      question: "Which feature usually requires a Client Component?",
      options: [
        "Fetching data on the server",
        "Rendering static text",
        "Handling a button click with onClick",
        "Reading route params in a Server Component",
      ],
      correctOptionIndex: 2,
      explanation:
        "Event handlers like onClick run in the browser, so that interactive part needs to be a Client Component.",
    },
  ],
  relatedConcepts: ["App Router", "Hydration", "Serializable props"],
};

export const concepts: ConceptLesson[] = [
  propsVsStateLesson,
  useEffectDependencyLesson,
  serverClientComponentsLesson,
];

export const learningPaths: LearningPath[] = [
  {
    id: "react-beginner",
    slug: "react-beginner",
    title: "React Beginner",
    description:
      "Build a visual mental model for components, props, state, events, lists, and rendering.",
    audience: "Students, interns, and new React learners",
    difficulty: "beginner",
    estimatedHours: 4,
    prerequisites: ["HTML", "CSS", "JavaScript functions", "Arrays"],
    outcomes: [
      "Explain how components communicate",
      "Know where state should live",
      "Predict simple re-renders",
      "Avoid common beginner mistakes",
    ],
    lessonSlugs: ["props-vs-state", "use-effect-dependency-array"],
  },
  {
    id: "nextjs-beginner",
    slug: "nextjs-beginner",
    title: "Next.js Beginner",
    description:
      "Understand App Router, layouts, pages, loading states, and server/client component boundaries.",
    audience: "React learners moving into production apps",
    difficulty: "beginner",
    estimatedHours: 5,
    prerequisites: ["React components", "Props and state", "Basic routing"],
    outcomes: [
      "Read an app directory structure",
      "Explain nested layouts",
      "Separate server and client concerns",
      "Choose a data-fetching location",
    ],
    lessonSlugs: ["server-vs-client-components"],
  },
];
