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

export interface IBlogCard {
  blog: BlogPostResponse;
}

export interface IBlog {
  blog: BlogPostResponse;
  latestBlogs: BlogPostResponse[];
  relatedBlogs: BlogPostResponse[];
}

export interface ISeeBlogButton {
  slug: string;
}

export interface IRelatedBlogs {
  relatedBlogs: BlogPostResponse[];
}

export interface IPostDetails {
  blog: BlogPostResponse;
}

export interface ILatestBlogs {
  latestBlogs: BlogPostResponse[];
}

export interface IHeroBlog {
  blog: BlogPostResponse;
}

export interface IBlogContent {
  blog: BlogPostResponse;
}
