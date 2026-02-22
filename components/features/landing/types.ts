export interface ProgramFeature {
  icon: string;
  title: string;
  description: string;
}

export interface LandingPartnerCategory {
  icon: string;
  title: string;
  subtitle: string;
}

export interface AchievementCategory {
  id: number;
  name: string;
  color: string;
}

export interface AchievementLevel {
  id: number;
  name: string;
  icon: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  year: number;
  imageUrl: string;
  order: number;
  isActive: boolean;
  category: AchievementCategory;
  level: AchievementLevel;
}
