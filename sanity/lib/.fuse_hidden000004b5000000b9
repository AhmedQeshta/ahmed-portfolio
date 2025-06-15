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
      website,
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
    "slug": slug.current,
    technologies[]->{
      _id,
      name,
      website,
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

// Project Queries - Updated to include drafts
export const projectsQuery = groq`
  *[_type == "project" && !(_id in path("drafts.**"))] | order(featured desc, startDate desc) {
    _id,
    title,
    "slug": slug.current,
    description,
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
    "screenshot": screenshot.asset->url
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    "slug": slug.current,
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

// Blog Post Queries
export const blogPostsQuery = groq`
  *[_type == "blogPost" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    technologies[]->{
      _id,
      name,
      website,
      "logo": logo.asset->url
    },
    description,
    tags,
    categories[]->{
      _id,
      name,
    },
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
    "slug": slug.current,
    technologies[]->{
      _id,
      name,
      website,
      "logo": logo.asset->url
    },
    description,
    content,
    tags,
    categories[]->{
      _id,
      name,
    },
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
    "slug": slug.current,
    description,
    tags,
    categories[]->{
      _id,
      name,
    },
    publishedAt,
    readingTime,
    "thumbnail": thumbnail.asset->url
  }
`;

export const baseInfoQuery = groq`
  *[_type == "baseInfo"][0] {
    _id,
    name,
    bio,
    technologies[]->{
      _id,
      name,
      "logo": logo.asset->url
    },
    "profilePicture": profilePicture.asset->url,
    email,
    phone,
    address
  }
`;
