import ProjectModal from '@/features/projects/components/ProjectModal';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import { sanityFetch } from '@/sanity/lib/client';
import { projectBySlugQuery } from '@/sanity/lib/queries';
import { ProjectResponse } from '@/sanity/lib/types';
import { IProjectPageModal } from '@/features/projects/types/project';
import React from 'react';

const Project = async ({ params }: IProjectPageModal) => {
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
