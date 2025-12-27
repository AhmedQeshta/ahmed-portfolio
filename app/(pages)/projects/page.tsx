import ProjectGrid from '@/features/projects/components/ProjectGrid';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import { sanityFetch } from '@/sanity/lib/client';
import { featuresQuery } from '@/sanity/lib/queries';
import { FeatureResponse } from '@/sanity/lib/types';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import ProjectGridSkeleton from '@/features/projects/components/ProjectGridSkeleton';

const ProjectsPage = async ({ searchParams }: { searchParams: Promise<{ q?: string }> }) => {
  try {
    const features = await sanityFetch<FeatureResponse[]>({
      query: featuresQuery,
      tags: ['features'],
    });

    const projectFeature = features.filter(
      (feature) => feature.name === 'projects' && feature.status === 'publish',
    );

    if (!projectFeature) notFound();

    // Correctly use the search params in an async context
    const resolvedSearchParams = await searchParams;
    const query = resolvedSearchParams?.q || '';

    return (
      <Suspense fallback={<ProjectGridSkeleton readMore={false} />}>
        <ProjectGrid readMore={false} query={query} />
      </Suspense>
    );
  } catch {
    return (
      <ErrorHandle
        id={'project-page'}
        description={'Failed to load Project Page. Please try again later.'}
      />
    );
  }
};

export default ProjectsPage;
