export interface Action {
  icon: string;
  label: string;
  to?: string;
}

export interface Step {
  title: string;
  description: string;
  status: "available" | "current" | "locked";
  mediaType?: string;
  actions?: Action[];
}

export interface Recommendation {
  icon: string;
  title: string;
  description: string;
  href: string;
  color: string;
}

export interface LearningPath {
  id: string;
  icon: string;
  title: string;
  level: string;
  levelVariant: string;
  topics: string[];
  actionIcon: string;
  prerequisites: string[];
  steps: Step[];
  recommendations: Recommendation[];
  DomainId: string | null;
}

export interface ExternalResource {
  icon: string;
  title: string;
  description: string;
  href: string;
  color: string;
}

export interface Domain {
  id: string;
  name: string;
  slug: string;
  learningPaths?: LearningPath[];
}
