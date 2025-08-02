import React from 'react';
import { sanityFetch } from '@/sanity/lib/client';
import { featuresQuery, workExperienceBySlugQuery } from '@/sanity/lib/queries';
import { FeatureResponse, WorkExperienceResponse } from '@/sanity/lib/types';
import Work from '@/features/works/components/Work';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import { IWorkPage } from '@/features/works/types/work';
import { notFound } from 'next/navigation';
import { generateWorkMetadata, generateWorkStaticParams } from '@/features/works/utils/metaData';

export {
  generateWorkMetadata as generateMetadata,
  generateWorkStaticParams as generateStaticParams,
};

const WorkPage = async (props: IWorkPage) => {
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

    return <Work work={workExperience} />;
  } catch (error) {
    return (
      <ErrorHandle
        id={'work'}
        description={'Failed to load work experience. Please try again later.'}
      />
    );
  }
};

export default WorkPage;
