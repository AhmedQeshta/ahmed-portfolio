import { BlogPostResponse, CategoryResponse } from '@/sanity/lib/types';

export interface IBlogsPage {
  searchParams: { q?: string };
}

// Note: We're not using this interface anymore, but keeping it for reference
// export interface IBlogPage {
//   params: { slug: string };
//   searchParams: Record<string, string | string[] | undefined>;
// }

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

export interface IBlogCardProps {
  blogs: BlogPostResponse[];
  categories: CategoryResponse[];
  readMore: boolean;
}

export interface IMetaInfoProps {
  publishedAt: string;
  readingTime?: number;
}

export interface ICardProps {
  blog: BlogPostResponse & { viewCount?: number };
}
export interface IBlog extends IRelatedBlogs, ILatestBlogs, IBlogPostResponse {
  viewCount?: number;
}

export interface ISeeBlogButton {
  slug: string;
}
