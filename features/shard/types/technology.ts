import { Technology, TechnologyResponse } from '@/sanity/lib/types';

export interface ITechnologiesResponse {
  technologies: TechnologyResponse[];
}

export interface ITechnologies extends ITechnologiesResponse {
  link: string;
}

export interface ITechnologiesDisplay {
  technologies?: Technology[];
}
