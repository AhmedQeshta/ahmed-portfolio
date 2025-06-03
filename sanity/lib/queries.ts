import { groq } from 'next-sanity';

// Work Experience Queries
export const workExperienceQuery = groq`
  *[_type == "workExperience"] | order(startDate desc) {
    _id,
    title,
    company,
    slug,
    technologies,
    period,
    startDate,
    endDate,
    current,
    description,
    achievements,
    order,
    "logo": logo.asset->url
  }
`;

export const workExperienceBySlugQuery = groq`
  *[_type == "workExperience" && slug.current == $slug][0] {
    _id,
    title,
    company,
    slug,
    technologies,
    period,
    startDate,
    endDate,
    current,
    description,
    achievements,
    order,
    "logo": logo.asset->url
  }
`;

// Project Queries
export const projectsQuery = groq`
  *[_type == "project"] | order(featured desc, startDate desc) {
    _id,
    title,
    slug,
    description,
    technologies,
    repoUrl,
    liveUrl,
    featured,
    order,
    startDate,
    endDate,
    status,
    "screenshot": screenshot.asset->url
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    fullDescription,
    technologies,
    repoUrl,
    liveUrl,
    featured,
    order,
    startDate,
    endDate,
    status,
    "screenshot": screenshot.asset->url,
    "gallery": gallery[].asset->url
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc) [0...6] {
    _id,
    title,
    slug,
    description,
    technologies,
    repoUrl,
    liveUrl,
    "screenshot": screenshot.asset->url
  }
`;

// Blog Post Queries
export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    tags,
    category,
    featured,
    publishedAt,
    readingTime,
    "thumbnail": thumbnail.asset->url
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    content,
    tags,
    category,
    featured,
    publishedAt,
    readingTime,
    seo,
    "thumbnail": thumbnail.asset->url
  }
`;

export const featuredBlogPostsQuery = groq`
  *[_type == "blogPost" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    description,
    tags,
    category,
    publishedAt,
    readingTime,
    "thumbnail": thumbnail.asset->url
  }
`;

export const blogPostsByCategoryQuery = groq`
  *[_type == "blogPost" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    tags,
    category,
    featured,
    publishedAt,
    readingTime,
    "thumbnail": thumbnail.asset->url
  }
`;
