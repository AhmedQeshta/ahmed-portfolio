import { client } from '@/sanity/lib/client';

export interface SiteContent {
  baseInfo: {
    name: string;
    title: string;
    bio: string;
    skills: string[];
    availability: string;
  };
  projects: Array<{
    title: string;
    description: string;
    slug: string;
    technologies: string[];
    status: string;
    liveUrl?: string;
    repoUrl?: string;
  }>;
  blogPosts: Array<{
    title: string;
    description: string;
    slug: string;
    publishedAt: string;
    tags: string[];
  }>;
  workExperience: Array<{
    title: string;
    company: string;
    description: string;
    technologies: string[];
    startDate: string;
    endDate?: string;
  }>;
}

/**
 * Fetch all site content from Sanity CMS for AI context
 */
export async function fetchSiteContent(): Promise<SiteContent> {
  try {
    // Fetch base info
    const baseInfoQuery = `*[_type == "baseInfo"][0] {
      name,
      title,
      bio,
      "skills": technologies[]->name,
      availability
    }`;

    // Fetch projects
    const projectsQuery = `*[_type == "project"] | order(order asc) [0...10] {
      title,
      description,
      "slug": slug.current,
      "technologies": technologies[]->name,
      status,
      liveUrl,
      repoUrl
    }`;

    // Fetch blog posts
    const blogPostsQuery = `*[_type == "blog"] | order(publishedAt desc) [0...10] {
      title,
      description,
      "slug": slug.current,
      publishedAt,
      "tags": tags[]->name
    }`;

    // Fetch work experience
    const workExperienceQuery = `*[_type == "work"] | order(startDate desc) [0...5] {
      title,
      company,
      description,
      "technologies": technologies[]->name,
      startDate,
      endDate
    }`;

    // Execute all queries in parallel
    const [baseInfo, projects, blogPosts, workExperience] = await Promise.all([
      client.fetch(baseInfoQuery),
      client.fetch(projectsQuery),
      client.fetch(blogPostsQuery),
      client.fetch(workExperienceQuery),
    ]);

    return {
      baseInfo: baseInfo || {
        name: 'Ahmed',
        title: 'Full Stack Developer',
        bio: '',
        skills: [],
        availability: 'Available',
      },
      projects: projects || [],
      blogPosts: blogPosts || [],
      workExperience: workExperience || [],
    };
  } catch (error) {
    console.error('Error fetching site content:', error);

    // Return fallback content
    return {
      baseInfo: {
        name: 'Ahmed',
        title: 'Full Stack Developer',
        bio: 'Experienced developer specializing in modern web technologies.',
        skills: ['React', 'Next.js', 'TypeScript', 'Node.js'],
        availability: 'Available',
      },
      projects: [],
      blogPosts: [],
      workExperience: [],
    };
  }
}

/**
 * Convert site content to AI-friendly context string
 */
export function formatContentForAI(content: SiteContent): string {
  const { baseInfo, projects, blogPosts, workExperience } = content;

  let context = `
ABOUT AHMED:
Name: ${baseInfo.name}
Title: ${baseInfo.title}
Bio: ${baseInfo.bio}
Availability: ${baseInfo.availability}
Skills: ${baseInfo.skills.join(', ')}

`;

  // Add projects
  if (projects.length > 0) {
    context += `PROJECTS:\n`;
    projects.forEach((project) => {
      context += `- ${project.title} (/projects/${project.slug})
  Description: ${project.description}
  Technologies: ${project.technologies.join(', ')}
  Status: ${project.status}
  ${project.liveUrl ? `Live URL: ${project.liveUrl}` : ''}
  ${project.repoUrl ? `Repository: ${project.repoUrl}` : ''}

`;
    });
  }

  // Add blog posts
  if (blogPosts.length > 0) {
    context += `BLOG POSTS:\n`;
    blogPosts.forEach((post) => {
      context += `- ${post.title} (/blog/${post.slug})
  Description: ${post.description}
  Published: ${new Date(post.publishedAt).toLocaleDateString()}
  Tags: ${post.tags.join(', ')}

`;
    });
  }

  // Add work experience
  if (workExperience.length > 0) {
    context += `WORK EXPERIENCE:\n`;
    workExperience.forEach((work) => {
      const endDate = work.endDate ? new Date(work.endDate).getFullYear() : 'Present';
      context += `- ${work.title} at ${work.company} (${new Date(work.startDate).getFullYear()} - ${endDate})
  Description: ${work.description}
  Technologies: ${work.technologies.join(', ')}

`;
    });
  }

  context += `
SITE NAVIGATION:
- Home: / (includes bio section with Ahmed's background and skills)
- Projects: /projects (portfolio showcase)
- Blog: /blogs (articles and tutorials)
- Work Experience: /works (professional history)
- Contact: /contact (get in touch)

Always include relevant URLs in your responses to help users navigate to specific content.`;

  return context.trim();
}

/**
 * Cache for site content (simple in-memory cache)
 */
let contentCache: {
  data: SiteContent | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

/**
 * Get site content with caching
 */
export async function getCachedSiteContent(): Promise<SiteContent> {
  const now = Date.now();

  // Check if cache is valid
  if (contentCache.data && now - contentCache.timestamp < CACHE_DURATION) {
    return contentCache.data;
  }

  // Fetch fresh content
  const content = await fetchSiteContent();

  // Update cache
  contentCache = {
    data: content,
    timestamp: now,
  };

  return content;
}
