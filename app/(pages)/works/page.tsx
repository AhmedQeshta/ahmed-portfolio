import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import WorkGrid from '@/features/works/components/WorkGrid';
import { sanityFetch } from '@/sanity/lib/client';
import { featuresQuery } from '@/sanity/lib/queries';
import { FeatureResponse } from '@/sanity/lib/types';
import { notFound } from 'next/navigation';
import React from 'react';

const WorksPage = async () => {
  try {
    const features = await sanityFetch<FeatureResponse[]>({
      query: featuresQuery,
      tags: ['features'],
    });

    const workFeature = features.filter(
      (_, { name, status }: any) => name === 'works' && status === 'publish',
    );

    if (!workFeature) notFound();
    return <WorkGrid />;
  } catch (error) {
    return (
      <ErrorHandle
        id={'work-page'}
        title={'Work Page'}
        description={'Failed to load Project Page. Please try again later.'}
      />
    );
  }
};

export default WorksPage;
