import { MetadataRoute } from 'next';
import { siteUrl, getCustomUrl } from '@/features/shard/utils/url';
import { sanityFetch } from '@/sanity/lib/client';
import { blogPostsQuery, projectsQuery, workExperienceQuery } from '@/sanity/lib/queries';
import { BlogPostResponse, ProjectResponse, WorkExperienceResponse } from '@/sanity/lib/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteUrl;
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/works`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  try {
    // Fetch dynamic content from Sanity
    const [blogs, projects, works] = await Promise.all([
      sanityFetch<BlogPostResponse[]>({
        query: blogPostsQuery,
        tags: ['blogPosts'],
        cache: 'dynamic',
      }),
      sanityFetch<ProjectResponse[]>({
        query: projectsQuery,
        tags: ['projects'],
        cache: 'dynamic',
      }),
      sanityFetch<WorkExperienceResponse[]>({
        query: workExperienceQuery,
        tags: ['workExperience'],
        cache: 'dynamic',
      }),
    ]);

    // Generate sitemap entries for blogs
    const blogEntries: MetadataRoute.Sitemap = (blogs || []).map((blog) => ({
      url: getCustomUrl(blog.slug, 'blogs'),
      lastModified: blog.publishedAt ? new Date(blog.publishedAt).toISOString() : currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    // Generate sitemap entries for projects
    const projectEntries: MetadataRoute.Sitemap = (projects || []).map((project) => ({
      url: getCustomUrl(project.slug, 'projects'),
      lastModified: project.endDate
        ? new Date(project.endDate).toISOString()
        : project.startDate
          ? new Date(project.startDate).toISOString()
          : currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    // Generate sitemap entries for works
    const workEntries: MetadataRoute.Sitemap = (works || []).map((work) => ({
      url: getCustomUrl(work.slug, 'works'),
      lastModified: work.endDate
        ? new Date(work.endDate).toISOString()
        : work.startDate
          ? new Date(work.startDate).toISOString()
          : currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    // Combine all entries
    return [...staticPages, ...blogEntries, ...projectEntries, ...workEntries];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return at least static pages if dynamic content fails
    return staticPages;
  }
}

