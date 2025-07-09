import React from 'react';
import { sanityFetch } from '@/sanity/lib/client';
import { workExperienceBySlugQuery } from '@/sanity/lib/queries';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import Work from '@/components/WorkExperiences/Work';
import ErrorHandle from '@/components/ui/ErrorHandle';

interface IWorkPage {
  params: Promise<{ slug: string }>;
}

const WorkPage = async ({ params }: IWorkPage) => {
  const { slug } = await params;

  try {
    const workExperience = await sanityFetch<WorkExperienceResponse>({
      query: workExperienceBySlugQuery,
      params: { slug },
      tags: ['workExperience'],
    });

    return <Work work={workExperience} />;
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

export default WorkPage;
