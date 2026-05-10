export type ConceptCategory =
  | "react"
  | "nextjs"
  | "hooks"
  | "state-management"
  | "performance"
  | "mistakes";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type VisualizationType =
  | "tree"
  | "timeline"
  | "flow"
  | "state-machine"
  | "comparison"
  | "route-map";

export type CodeExample = {
  id: string;
  title: string;
  language: "tsx" | "ts" | "jsx" | "js";
  code: string;
  highlightedLines?: number[];
  description?: string;
};

export type VisualizationStep = {
  id: string;
  title: string;
  description: string;
  activeCodeLines: number[];
  timelineEvent: string;
  inspectorNotes: string[];
  stateValue?: number;
  previousStateValue?: number;
  propValue?: number;
  activeComponents: string[];
  showPropFlow?: boolean;
  showMistake?: boolean;
};

export type CommonMistake = {
  id: string;
  title: string;
  brokenCode: string;
  explanation: string;
  fix: string;
  preventionTip: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
};

export type PracticeTask = {
  id: string;
  prompt: string;
  starterCode: string;
  hints: string[];
  solutionCode: string;
  explanation: string;
};

export type ConceptLesson = {
  id: string;
  slug: string;
  title: string;
  category: ConceptCategory;
  difficulty: Difficulty;
  estimatedMinutes: number;
  prerequisites: string[];
  shortDescription: string;
  learningGoals: string[];
  explanation: string;
  mentalModel: string;
  codeExamples: CodeExample[];
  visualizationType: VisualizationType;
  steps: VisualizationStep[];
  commonMistakes: CommonMistake[];
  quiz: QuizQuestion[];
  practiceTask?: PracticeTask;
  relatedConcepts: string[];
};

export type LearningPath = {
  id: string;
  slug: string;
  title: string;
  description: string;
  audience: string;
  difficulty: Difficulty;
  estimatedHours: number;
  prerequisites: string[];
  outcomes: string[];
  lessonSlugs: string[];
};
