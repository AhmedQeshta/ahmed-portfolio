import { ProjectResponse } from '@/sanity/lib/types';

export interface IProjectLayout {
  readonly children: React.ReactNode;
  readonly modal: React.ReactNode;
}

export interface IProjectPage {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export interface IProjectPageModal {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export interface IProjectGrid {
  readMore?: boolean;
}

// refactor that
export interface IProjectResponse {
  project: ProjectResponse;
}
