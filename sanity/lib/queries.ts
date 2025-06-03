import { groq } from 'next-sanity';

// Technology Queries
export const technologiesQuery = groq`
  *[_type == "technology"] | order(order asc, name asc) {
    _id,
    name,
    website,
    order,
    "logo": logo.asset->url
  }
`;

export const technologyBySlugQuery = groq`
  *[_type == "technology" && slug.current == $slug][0] {
    _id,
    name,
    website,
    order,
    "logo": logo.asset->url
  }
`;

// Work Experience Queries
export const workExperienceQuery = groq`
  *[_type == "workExperience"] | order(startDate desc) {
    _id,
    title,
    company,
    "slug": slug.current ,
    technologies[]->{
      _id,
      name,
      "logo": logo.asset->url
    },
    companyUrl,
    location,
    locationType,
    employmentType,
    startDate,
    endDate,
    current,
    description,
    achievements,
    skills,
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
    technologies[]->{
      _id,
      name,
      "logo": logo.asset->url
    },
    period,
    startDate,
    endDate,
    current,
    description,
    achievements,
    skills,
    order,
    "logo": logo.asset->url
  }
`;

// Project Queries - Updated to include drafts
export const projectsQuery = groq`
  *[_type == "project" && !(_id in path("drafts.**"))] | order(featured desc, startDate desc) {
    _id,
    title,
    slug,
    description,
    technologies[]->{
      _id,
      name,
      "logo": logo.asset->url
    },
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

// Query that includes both drafts and published (for debugging)
export const allProjectsQuery = groq`
  *[_type == "project"] | order(_updatedAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    technologies[]->{
      _id,
      name,
      "logo": logo.asset->url
    },
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
  *[_type == "project" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    slug,
    description,
    fullDescription,
    technologies[]->{
      _id,
      name,
      website,
      "logo": logo.asset->url
    },
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
  *[_type == "project" && featured == true && !(_id in path("drafts.**"))] | order(order asc) [0...6] {
    _id,
    title,
    slug,
    description,
    technologies[]->{
      _id,
      name,
      "logo": logo.asset->url
    },
    repoUrl,
    liveUrl,
    "screenshot": screenshot.asset->url
  }
`;

// Blog Post Queries
export const blogPostsQuery = groq`
  *[_type == "blogPost" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
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
  *[_type == "blogPost" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
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
  *[_type == "blogPost" && featured == true && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...3] {
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
  *[_type == "blogPost" && category == $category && !(_id in path("drafts.**"))] | order(publishedAt desc) {
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
