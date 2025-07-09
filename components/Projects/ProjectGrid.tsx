import { sanityFetch } from '@/sanity/lib/client';
import { projectsQuery } from '@/sanity/lib/queries';
import { ProjectResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/components/ui/ErrorHandle';
import ProjectCard from '@/components/Projects/ProjectCard';
import ReadMore from '@/components/ui/ReadMore';
import ScrollAnimation from '@/components/ui/ScrollAnimation';
import { IProjectGrid } from '@/utils/types/project';

export default async function ProjectGrid({ readMore = true }: IProjectGrid) {
  try {
    // if readMore true take first 6 blogs
    const projects = await sanityFetch<ProjectResponse[]>({
      query: projectsQuery,
      tags: ['projects'],
    });

    return (
      // add the tags as a badge and the category and do not add html
      <section id="projects" className="py-20 bg-section-glass rounded-2xl">
        <ScrollAnimation direction="down" delay={0.1} className="mx-auto max-w-5xl px-4">
          <ScrollAnimation direction="down" delay={0.2}>
            <h2 className="text-3xl font-semibold mb-8 gradient-text">Projects</h2>
          </ScrollAnimation>

          {projects.length === 0 ? (
            <ScrollAnimation direction="down" delay={0.3}>
              <div className="text-center text-gray-400">
                <p>No projects found.</p>
              </div>
            </ScrollAnimation>
          ) : (
            <ScrollAnimation
              direction="left"
              delay={0.3}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ScrollAnimation
                  key={project._id}
                  direction="right"
                  delay={0.5}
                  className="bg-card-bg backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:bg-card-hover transition cursor-pointer">
                  <ProjectCard project={project} />
                </ScrollAnimation>
              ))}
            </ScrollAnimation>
          )}

          {readMore && <ReadMore link="/projects" text="View All Projects" />}
        </ScrollAnimation>
      </section>
    );
  } catch (error) {
    console.error('Error fetching projects:', error);

    return (
      <ErrorHandle
        id={'projects'}
        title={'Projects'}
        description={'Failed to load Projects. Please try again later.'}
      />
    );
  }
}
