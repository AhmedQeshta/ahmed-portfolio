import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import WorkModal from '@/features/works/components/WorkModal';
import { sanityFetch } from '@/sanity/lib/client';
import { featuresQuery, workExperienceBySlugQuery } from '@/sanity/lib/queries';
import { FeatureResponse, WorkExperienceResponse } from '@/sanity/lib/types';
import { IWorkPage } from '@/features/works/types/work';
import React from 'react';
import { notFound } from 'next/navigation';

const Work = async (props: IWorkPage) => {
  const { slug } = props.params;

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

    return <WorkModal work={workExperience} />;
  } catch (error) {
    console.error('Error fetching work experience:', error);
    return (
      <ErrorHandle
        id={'work'}
        description={'Failed to load work experience. Please try again later.'}
      />
    );
  }
};

export default Work;
