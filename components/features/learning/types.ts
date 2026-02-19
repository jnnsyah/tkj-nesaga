// Schema migration: Updated all types to match refactored Prisma schema.
// - Action: icon/color now from ResourceCategory relation
// - Step: removed 'status' field (no longer in schema)
// - Recommendation: icon/color now from ResourceCategory relation
// - LearningPath: icon/levelVariant/actionIcon moved to Domain, level is now a relation,
//   topics/prerequisites are now relational tables
// - ExternalResource: icon/color now from ResourceCategory relation
// - Domain: added icon, levelVariant, actionIcon, isPublished fields

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
  levelVariant: string;
  actionIcon?: string;
  isPublished?: boolean;
  learningPaths?: LearningPath[];
}
