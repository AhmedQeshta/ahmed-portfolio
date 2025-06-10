import ErrorHandle from '@/components/ui/ErrorHandle';
import WorkModal from '@/components/WorkExperiences/WorkModal';
import { sanityFetch } from '@/sanity/lib/client';
import { workExperienceBySlugQuery } from '@/sanity/lib/queries';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import React from 'react';

interface WorkModalInterface {
  params: Promise<{ slug: string }>;
}

const Work = async ({ params }: WorkModalInterface) => {
  const { slug } = await params;

  try {
    const workExperience = await sanityFetch<WorkExperienceResponse>({
      query: workExperienceBySlugQuery,
      params: { slug },
      tags: ['workExperience'],
    });

    if (!workExperience) {
      return (
        <ErrorHandle
          id={'work'}
          title={'Work Experience Not Found'}
          description={
            'The requested work experience could not be found. Please check the URL or try again later.'
          }
        />
      );
    }

    return <WorkModal work={workExperience} />;
  } catch (error) {
    console.error('Error fetching work experience:', error);
    return (
      <ErrorHandle
        id={'work'}
        title={'Work Experience'}
        description={'Failed to load work experience. Please try again later.'}
      />
    );
  }
};

export default Work;
