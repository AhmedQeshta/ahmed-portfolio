import ProjectModal from '@/features/projects/components/ProjectModal';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import { sanityFetch } from '@/sanity/lib/client';
import { featuresQuery, projectBySlugQuery } from '@/sanity/lib/queries';
import { FeatureResponse, ProjectResponse } from '@/sanity/lib/types';
import { IProjectPageModal } from '@/features/projects/types/project';
import React from 'react';
import { notFound } from 'next/navigation';

const Project = async (props: IProjectPageModal) => {
  const { slug } = props.params;

  try {
    const features = await sanityFetch<FeatureResponse[]>({
      query: featuresQuery,
      tags: ['features'],
    });
    const projectFeature = features.filter(
      (_, { name, status }: any) => name === 'projects' && status === 'publish',
    );

    if (!projectFeature) notFound();

    const project = await sanityFetch<ProjectResponse>({
      query: projectBySlugQuery,
      params: { slug },
      tags: ['project'],
    });

    if (!project) notFound();

    return <ProjectModal project={project} />;
  } catch (error) {
    console.error('Error loading project:', error);
    return (
      <ErrorHandle
        id={'project-modal'}
        description={'Failed to load project. Please try again later.'}
      />
    );
  }
};

export default Project;
