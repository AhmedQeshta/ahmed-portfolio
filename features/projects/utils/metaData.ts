import { sanityFetch } from '@/sanity/lib/client';
import { featuresQuery, projectBySlugQuery, projectsQuery } from '@/sanity/lib/queries';
import { FeatureResponse, ProjectResponse } from '@/sanity/lib/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Metadata generation function
export async function generateProjectMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const features = await sanityFetch<FeatureResponse[]>({
      query: featuresQuery,
      tags: ['features'],
    });
    const projectFeature = features.filter(
      ({ name, status }) => name === 'projects' && status === 'publish',
    );

    if (!projectFeature) notFound();

    const project = await sanityFetch<ProjectResponse>({
      query: projectBySlugQuery,
      params: { slug },
      tags: ['project'],
    });

    if (!project) return {};

    const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
    const url = `${siteUrl}/projects/${project.slug}`;
    const title = project.title;
    const description = project.description;
    const image = project.screenshot;

    // Add category names to keywords
    const categoryNames = project.categories?.map((cat) => cat.name) || [];
    const keywords = [...categoryNames].join(', ');

    return {
      title,
      description,
      keywords,
      alternates: { canonical: url },
      other: {
        'article:tag': categoryNames.join(', '),
        'article:section': categoryNames[0] || 'Technology',
      },
      openGraph: {
        title,
        description,
        url,
        type: 'article',
        images: image ? [image] : undefined,
        tags: [...categoryNames],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: image ? [image] : undefined,
        creator: '@ahmedqeshta',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {};
  }
}

// Generate static params for all blog routes at build time
export async function generateProjectStaticParams() {
  // Early return if Sanity env vars are missing to prevent build crash
  if (!process.env.SANITY_PROJECT_ID && !process.env.SANITY_DATASET) {
    console.warn('[generateProjectStaticParams] Sanity env vars missing, returning empty array');
    return [];
  }

  try {
    const projects = await sanityFetch<ProjectResponse[]>({
      query: projectsQuery,
      tags: ['projects'],
    });

    if (!projects || !Array.isArray(projects)) {
      return [];
    }

    return projects.map(({ slug }) => ({
      slug,
    }));
  } catch (error) {
    console.error('Error generating static params for projects:', error);
    return [];
  }
}
