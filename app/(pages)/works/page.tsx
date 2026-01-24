import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import WorkGrid from '@/features/works/components/WorkGrid';
import { sanityFetch } from '@/sanity/lib/sanityFetch';
import { featuresQuery } from '@/sanity/lib/queries';
import { FeatureResponse } from '@/sanity/lib/types';
import { notFound } from 'next/navigation';
import React from 'react';

export const revalidate = 300;

const WorksPage = async () => {
  try {
    const features = await sanityFetch<FeatureResponse[]>({
      query: featuresQuery,
      tags: ['sanity', 'features'],
    });

    const workFeature = features.filter(
      ({ name, status }) => name === 'works' && status === 'publish',
    );

    if (!workFeature) notFound();
    return <WorkGrid />;
  } catch {
    return (
      <ErrorHandle
        id={'work-page'}
        description={'Failed to load Project Page. Please try again later.'}
      />
    );
  }
};

export default WorksPage;
