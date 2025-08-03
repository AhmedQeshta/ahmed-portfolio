import { sanityFetch } from '@/sanity/lib/client';
import {
  featuresQuery,
  workExperienceBySlugQuery,
  workExperienceQuery,
} from '@/sanity/lib/queries';
import { FeatureResponse, WorkExperienceResponse } from '@/sanity/lib/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Metadata generation function
export async function generateWorkMetadata({
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
    const workFeature = features.filter(
      ({ name, status }) => name === 'works' && status === 'publish',
    );

    if (!workFeature) notFound();

    const workExperience = await sanityFetch<WorkExperienceResponse>({
      query: workExperienceBySlugQuery,
      params: { slug },
      tags: ['workExperience'],
    });

    if (!workExperience) return {};

    const siteUrl = process.env.SITE_URL || 'https://ahmedqeshta.vercel.app';
    const url = `${siteUrl}/works/${workExperience.slug}`;
    const title = `${workExperience.title} - Ahmed Qeshta`;
    const description =
      workExperience.description ||
      `Learn about Ahmed Qeshta's work experience at ${workExperience.company}.`;

    // Use work logo if available, otherwise fallback to default OG image
    const defaultOgImage = `${siteUrl}/images/ahmed-qeshta-og.png`;
    const workImage = workExperience.logo
      ? workExperience.logo.startsWith('http')
        ? workExperience.logo
        : `${siteUrl}${workExperience.logo}`
      : defaultOgImage;

    // Add category names to keywords
    const categoryNames = workExperience.categories?.map((cat) => cat.name) || [];
    const technologyNames = workExperience.technologies?.map((tec) => tec.name);
    const keywords = [...technologyNames, ...categoryNames].join(', ');

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
        siteName: 'Ahmed Qeshta - Portfolio',
        images: [
          {
            url: workImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        tags: [...technologyNames, ...categoryNames],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [workImage],
        creator: '@ahmedqeshta',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {};
  }
}

// Generate static params for all blog routes at build time
export async function generateWorkStaticParams() {
  try {
    const works = await sanityFetch<WorkExperienceResponse[]>({
      query: workExperienceQuery,
      tags: ['works'],
    });

    return works.map(({ slug }) => ({
      slug,
    }));
  } catch (error) {
    console.error('Error generating static params for works:', error);
    return [];
  }
}
