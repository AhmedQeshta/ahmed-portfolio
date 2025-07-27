import { sanityFetch } from '@/sanity/lib/client';
import { projectsQuery } from '@/sanity/lib/queries';
import { ProjectResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import ProjectCard from '@/features/projects/components/ProjectCard';
import ReadMore from '@/features/shard/components/ui/ReadMore';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { IProjectGrid } from '@/features/projects/types/project';

export default async function ProjectGrid({ readMore = true }: IProjectGrid) {
  try {
    const projects = await sanityFetch<ProjectResponse[]>({
      query: projectsQuery,
      tags: ['projects'],
    });

    return (
      <section id="projects" className="py-20">
        <ScrollAnimation
          direction="down"
          delay={0.1}
          className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          {/* Header Section */}
          <ScrollAnimation direction="down" delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Projects</h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Explore my latest projects and creative solutions
              </p>
            </div>
          </ScrollAnimation>

          {/* Projects Grid */}
          {projects.length === 0 ? (
            <ScrollAnimation direction="down" delay={0.3}>
              <div className="text-center py-16">
                <div className="bg-card-bg backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
                  <p className="text-text-secondary">Check back soon for new projects!</p>
                </div>
              </div>
            </ScrollAnimation>
          ) : (
            <ScrollAnimation
              direction="up"
              delay={0.3}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ScrollAnimation
                  key={project._id}
                  direction="up"
                  delay={0.4 + index * 0.1}
                  className="h-full">
                  <ProjectCard project={project} />
                </ScrollAnimation>
              ))}
            </ScrollAnimation>
          )}

          {/* Read More Section */}
          {readMore && projects.length > 0 && (
            <ScrollAnimation direction="up" delay={0.6}>
              <div className="text-center mt-12">
                <ReadMore link="/projects" text="View All Projects" />
              </div>
            </ScrollAnimation>
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
