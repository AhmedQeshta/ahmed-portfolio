import ProjectGrid from '@/features/projects/components/ProjectGrid';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import { sanityFetch } from '@/sanity/lib/client';
import { featuresQuery } from '@/sanity/lib/queries';
import { FeatureResponse } from '@/sanity/lib/types';
import { notFound } from 'next/navigation';

const ProjectsPage = async () => {
  try {
    const features = await sanityFetch<FeatureResponse[]>({
      query: featuresQuery,
      tags: ['features'],
    });

    const projectFeature = features.filter(
      (_, { name, status }: any) => name === 'projects' && status === 'publish',
    );

    if (!projectFeature) notFound();

    return <ProjectGrid readMore={false} />;
  } catch (error) {
    return (
      <ErrorHandle
        id={'project-page'}
        description={'Failed to load Project Page. Please try again later.'}
      />
    );
  }
};

export default ProjectsPage;
