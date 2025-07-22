import ProjectModal from '@/components/Projects/ProjectModal';
import ErrorHandle from '@/components/ui/ErrorHandle';
import { sanityFetch } from '@/sanity/lib/client';
import { projectBySlugQuery } from '@/sanity/lib/queries';

import { ProjectResponse } from '@/sanity/lib/types';
import React from 'react';

interface ProjectInterface {
  params: Promise<{ slug: string }>;
}

const Project = async ({ params }: ProjectInterface) => {
  const { slug } = await params;

  try {
    const project = await sanityFetch<ProjectResponse>({
      query: projectBySlugQuery,
      params: { slug },
      tags: ['project'],
    });

    return <ProjectModal project={project} />;
  } catch (error) {
    return (
      <ErrorHandle
        id={'projects'}
        title={'WProjects'}
        description={'Failed to load projects. Please try again later.'}
      />
    );
  }
};

export default Project;
