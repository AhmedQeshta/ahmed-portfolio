import { BlogPostResponse } from '@/sanity/lib/types';

export interface IBlogsPage {
  searchParams?: Promise<{ q?: string }>;
}

export interface IBlogPage {
  params: Promise<{ slug: string }>;
}

export interface IBlogGrid {
  readMore?: boolean;
  query?: string;
}

export interface IRelatedBlogs {
  relatedBlogs: BlogPostResponse[];
}

export interface ILatestBlogs {
  latestBlogs: BlogPostResponse[];
}
export interface IBlogPostResponse {
  blog: BlogPostResponse;
}

export interface IBlog extends IRelatedBlogs, ILatestBlogs, IBlogPostResponse {}

export interface ISeeBlogButton {
  slug: string;
}
