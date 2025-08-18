import { client } from '@/sanity/lib/client';
import { IContentCache, SiteContent } from '@/features/chat/types/chat-system';
import { fallbackContentBaseInfo, siteNavigation } from '@/features/chat/lib/constant';
import {
  baseInfoQuery,
  blogPostsQuery,
  projectsQuery,
  workExperienceQuery,
} from '@/sanity/lib/queries';

let contentCache: IContentCache = {
  data: null,
  timestamp: 0,
};

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

/**
 * Fetch all site content from Sanity CMS for AI context
 */
export async function fetchSiteContent(): Promise<SiteContent> {
  try {
    // Execute all queries in parallel
    const [baseInfo, projects, blogPosts, workExperience] = await Promise.all([
      client.fetch(baseInfoQuery),
      client.fetch(projectsQuery),
      client.fetch(blogPostsQuery),
      client.fetch(workExperienceQuery),
    ]);

    return {
      baseInfo: baseInfo || fallbackContentBaseInfo,
      projects: projects || [],
      blogPosts: blogPosts || [],
      workExperience: workExperience || [],
    };
  } catch (error) {
    console.error('Error fetching site content:', error);

    // Return fallback content
    return {
      baseInfo: fallbackContentBaseInfo,
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
ABOUT AHMED:\n
Name: ${baseInfo.name}\n
Title: ${baseInfo.title}\n
Bio: ${baseInfo.bio}\n
Availability: ${baseInfo.availability}\n
Skills: ${baseInfo.skills.join(', ')}\n
${baseInfo.cvUrl && `\nCV: ${baseInfo.cvUrl}`}\n
`;

  // Add projects
  if (projects.length > 0) {
    context += `PROJECTS:\n`;
    projects.forEach((project) => {
      context += `- ${project.title} (/projects/${project.slug})\n
  Description: ${project.description}\n
  Technologies: ${project.technologies.join(', ')}\n
  Status: ${project.status}\n
  ${project.liveUrl && `Live URL: ${project.liveUrl}`}\n
  ${project.repoUrl && `Repository: ${project.repoUrl}`}\n
`;
    });
  }

  // Add blog posts
  if (blogPosts.length > 0) {
    context += `BLOG POSTS:\n`;
    blogPosts.forEach((post) => {
      context += `- ${post.title} (/blog/${post.slug})\n
  Description: ${post.description}\n
  Published: ${new Date(post.publishedAt).toLocaleDateString()}\n
  Tags: ${post.tags.join(', ')}\n
`;
    });
  }

  // Add work experience
  if (workExperience.length > 0) {
    context += `WORK EXPERIENCE:\n`;
    workExperience.forEach((work) => {
      const endDate = work.endDate ? new Date(work.endDate).getFullYear() : 'Present';
      context += `- ${work.title} at ${work.company} (${new Date(work.startDate).getFullYear()} - ${endDate})\n
  Description: ${work.description}\n
  Technologies: ${work.technologies.join(', ')}\n
`;
    });
  }

  context += siteNavigation;

  return context.trim();
}

/**
 * Get site content with caching
 * Cache for site content (simple in-memory cache)
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
