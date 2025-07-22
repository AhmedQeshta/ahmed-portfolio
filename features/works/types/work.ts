import { WorkExperienceResponse } from '@/sanity/lib/types';

export interface IWorkLayout {
  readonly children: React.ReactNode;
  readonly modal: React.ReactNode;
}

export interface IWorkPage {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export interface IWorkSlider {
  works: WorkExperienceResponse[];
  readMore?: boolean;
}

export interface IWorkResponse {
  work: WorkExperienceResponse;
}

export interface IWorksResponse {
  works: WorkExperienceResponse[];
}
