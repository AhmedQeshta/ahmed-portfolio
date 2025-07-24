import { sanityFetch } from '@/sanity/lib/client';
import { featuresQuery, projectBySlugQuery } from '@/sanity/lib/queries';
import { FeatureResponse, ProjectResponse } from '@/sanity/lib/types';
import React from 'react';
import Project from '@/features/projects/components/Project';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import { IProjectPage } from '@/features/projects/types/project';
import { notFound } from 'next/navigation';

const ProjectPage = async (props: IProjectPage) => {
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

    return <Project project={project} />;
  } catch (error) {
    return (
      <ErrorHandle
        id={'projects'}
        description={'Failed to load projects. Please try again later.'}
      />
    );
  }
};

export default ProjectPage;
