import { sanityFetch } from '@/sanity/lib/client';
import { projectsQuery } from '@/sanity/lib/queries';
import { ProjectResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import ProjectCard from '@/features/projects/components/ProjectCard';
import ReadMore from '@/features/shard/components/ui/ReadMore';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { IProjectGrid } from '@/features/projects/types/project';
import HeaderTitle from '@/features/shard/components/ui/HeaderTitle';
import EmptyItem from '@/features/shard/components/ui/EmptyItem';

export default async function ProjectGrid({ readMore = true }: IProjectGrid) {
  try {
    const projects = await sanityFetch<ProjectResponse[]>({
      query: projectsQuery,
      tags: ['projects'],
    });

    return (
      <section id="projects" className={`py-20 ${!!!readMore && 'mt-12 lg:mt-12'}`}>
        <ScrollAnimation
          direction="down"
          delay={0.1}
          className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-5">
          <HeaderTitle
            title="Projects"
            subtitle="Explore my latest projects and creative solutions"
          />

          {/* Projects Grid */}
          {projects.length === 0 ? (
            <EmptyItem
              title="No projects found"
              subTitle="Check back soon for new projects!"
              icon="🚀"
            />
          ) : (
            <ProjectCard projects={projects} readMore={readMore} />
          )}
        </ScrollAnimation>
      </section>
    );
  } catch (error) {
    console.error('Error fetching projects:', error);

    return (
      <ErrorHandle
        id={'projects'}
        description={'Failed to load Projects. Please try again later.'}
      />
    );
  }
}
