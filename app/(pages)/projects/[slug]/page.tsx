import { sanityFetch } from '@/sanity/lib/client';
import { projectBySlugQuery } from '@/sanity/lib/queries';
import { ProjectResponse } from '@/sanity/lib/types';
import React from 'react';
import Project from '@/components/Projects/Project';
import ErrorHandle from '@/components/ui/ErrorHandle';

interface IProjectPage {
  params: Promise<{ slug: string }>;
}

const ProjectPage = async ({ params }: IProjectPage) => {
  const { slug } = await params;

  try {
    const project = await sanityFetch<ProjectResponse>({
      query: projectBySlugQuery,
      params: { slug },
      tags: ['project'],
    });

    return <Project project={project} />;
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

export default ProjectPage;
