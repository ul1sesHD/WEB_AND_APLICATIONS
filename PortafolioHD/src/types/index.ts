export type Proficiency = "Expert" | "Advanced" | "Intermediate" | "Learning";

export type SkillCategory =
  | "Backend"
  | "Frontend"
  | "Cloud & DevOps"
  | "AI & Data"
  | "Project Management"
  | "Design & Production"
  | "Leadership";

export type ProjectCategory = "Backend" | "Frontend" | "Full-Stack" | "AI" | "Design";

export interface Skill {
  name: string;
  proficiency: Proficiency;
  years?: number;
  description?: string;
}

export interface SkillGroup {
  name: SkillCategory;
  description?: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  thumbnail?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  fullDescription?: string;
  challenges?: string[];
  solutions?: string[];
  learnings?: string[];
  featured?: boolean;
}

export interface SectionContent {
  title: string;
  subtitle?: string;
  description?: string;
}
