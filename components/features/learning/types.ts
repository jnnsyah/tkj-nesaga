// Schema: types aligned with Prisma schema
// - Domain: id, name, slug, icon only
// - LearningLevel: added icon field
// - Action/Recommendation: icon/color from ResourceCategory relation

export interface ResourceCategory {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export interface Action {
  label: string;
  to?: string;
  category: ResourceCategory;
}

export interface Step {
  title: string;
  description: string;
  mediaType?: string;
  actions?: Action[];
}

export interface Recommendation {
  title: string;
  description: string;
  href: string;
  category: ResourceCategory;
}

export interface LearningLevel {
  id: number;
  name: string;
  color: string;
  icon: string;
}

export interface LearningPathTopic {
  id: number;
  topic: string;
}

export interface LearningPathPrerequisite {
  id: number;
  prerequisite: string;
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  level: LearningLevel;
  topics: LearningPathTopic[];
  prerequisites: LearningPathPrerequisite[];
  steps: Step[];
  recommendations: Recommendation[];
  domain?: Domain;
  domainId?: string | null;
}

export interface ExternalResource {
  title: string;
  description: string;
  href: string;
  category: ResourceCategory;
}

export interface Domain {
  id: string;
  name: string;
  slug: string;
  icon: string;
  learningPaths?: LearningPath[];
}
