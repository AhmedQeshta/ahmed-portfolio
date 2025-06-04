// Technology interface
export interface Technology {
  _id: string;
  name: string;
  website?: string;
  order: number;
  logo: string;
}

export interface WorkExperience {
  _id: string;
  title: string;
  company: string;
  companyUrl?: string;
  location?: string;
  locationType: 'remote' | 'on-site' | 'hybrid';
  slug: {
    current: string;
  };
  employmentType:
    | 'full-time'
    | 'part-time'
    | 'freelance'
    | 'contract'
    | 'internship'
    | 'volunteer'
    | 'other';
  technologies: TechnologyResponse[];
  categories: CategoryResponse[];
  startDate: string;
  endDate?: string;
  current: boolean;
  logo?: string;
  description?: string;
  achievements?: string[];
  skills?: string;
  order: number;
}

export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  fullDescription?: any[]; // Rich text blocks
  technologies: TechnologyResponse[];
  categories: CategoryResponse[];
  screenshot: string;
  gallery?: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  startDate?: string;
  endDate?: string;
  status: 'in-progress' | 'completed' | 'on-hold';
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  content: any[]; // Rich text blocks
  thumbnail: string;
  tags?: string[];
  categories: CategoryResponse[];
  technologies: TechnologyResponse[];
  featured: boolean;
  publishedAt: string;
  readingTime?: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

// Technology interface
export interface Category {
  _id: string;
  name: string;
  order: number;
  slug: {
    current: string;
  };
}

// Query response types (flattened slug)
export interface WorkExperienceResponse extends Omit<WorkExperience, 'slug'> {
  slug: string;
}

export interface ProjectResponse extends Omit<Project, 'slug'> {
  slug: string;
}

export interface BlogPostResponse extends Omit<BlogPost, 'slug'> {
  slug: string;
}

// Technology response type
export interface TechnologyResponse extends Technology {}

export interface CategoryResponse extends Omit<Category, 'slug'> {
  slug: string;
}
