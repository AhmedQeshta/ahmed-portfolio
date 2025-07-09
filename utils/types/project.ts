import { ProjectResponse } from '@/sanity/lib/types';

export interface IProjectLayout {
  readonly children: React.ReactNode;
  readonly modal: React.ReactNode;
}

export interface IProjectPage {
  params: Promise<{ slug: string }>;
}

export interface IProjectPageModal {
  params: Promise<{ slug: string }>;
}

export interface IProjectGrid {
  readMore?: boolean;
}

// refactor that
export interface IProjectResponse {
  project: ProjectResponse;
}
