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

export const concepts: ConceptLesson[] = [
  propsVsStateLesson,
  {
    ...propsVsStateLesson,
    id: "react-use-effect-dependencies",
    slug: "use-effect-dependency-array",
    title: "useEffect Dependency Array",
    category: "hooks",
    estimatedMinutes: 14,
    shortDescription:
      "Watch React compare dependencies and decide whether an effect should run again.",
    visualizationType: "timeline",
    relatedConcepts: ["Stale closures", "Effect cleanup", "Event handlers"],
  },
  {
    ...propsVsStateLesson,
    id: "next-server-client-components",
    slug: "server-vs-client-components",
    title: "Server Components vs Client Components",
    category: "nextjs",
    estimatedMinutes: 16,
    shortDescription:
      "See where components render, what hydrates in the browser, and where the use client boundary begins.",
    visualizationType: "route-map",
    relatedConcepts: ["App Router", "Hydration", "Serializable props"],
  },
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
