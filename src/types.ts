export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  responsibilities: string[];
  achievements?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnail: string;
  tags: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: 'ai' | 'web' | 'other';
}

export interface Skill {
  name: string;
  proficiency: number; // 0 to 100
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
  credentialId?: string;
  description?: string;
  image?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  location?: string;
}

export interface StatItem {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}
