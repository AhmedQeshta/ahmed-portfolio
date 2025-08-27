import { sanityFetch } from '@/sanity/lib/client';
import { projectsQuery } from '@/sanity/lib/queries';
import { ProjectResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import ProjectCard from '@/features/projects/components/ProjectCard';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { IProjectGrid } from '@/features/projects/types/project';
import HeaderTitle from '@/features/shard/components/ui/HeaderTitle';
import EmptyItem from '@/features/shard/components/ui/EmptyItem';
import Search from '@/features/filters/components/Search';

export default async function ProjectGrid({ readMore = true, query }: IProjectGrid) {
  try {
    let projects = await sanityFetch<ProjectResponse[]>({
      query: projectsQuery,
      tags: ['projects'],
    });

    // Filter projects based on search query if provided
    if (query && query.trim() !== '') {
      const lowerQuery = query.toLowerCase();
      projects = projects.filter(
        (blog) =>
          blog.title.toLowerCase().includes(lowerQuery) ||
          blog.description.toLowerCase().includes(lowerQuery) ||
          blog.categories?.some((cat) => cat.name.toLowerCase().includes(lowerQuery)),
      );
    }

    return (
      <section id="projects" className={`py-10 ${!readMore && 'mt-20 lg:mt-20'}`}>
        <ScrollAnimation
          direction="down"
          delay={0.1}
          className="mx-auto max-w-[1450px] px-5 sm:px-7 lg:px-5">
          <HeaderTitle
            title="Projects"
            subtitle="Explore my latest projects and creative solutions"
            className={`${!readMore ? 'mb-0 lg:mb-0' : 'mb-10 lg:mb-10'}`}
          />

          {!readMore && <Search action="/projects" placeholder="Search projects..." />}

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
