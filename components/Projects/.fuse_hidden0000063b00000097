import { sanityFetch } from '@/sanity/lib/client';
import { projectsQuery } from '@/sanity/lib/queries';
import { ProjectResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/components/ui/ErrorHandle';
import ProjectCard from '@/components/Projects/ProjectCard';
import ReadMore from '@/components/ui/ReadMore';

interface ProjectGridProps {
  readMore?: boolean;
}

export default async function ProjectGrid({ readMore = true }: ProjectGridProps) {
  try {
    // if readMore true take first 6 blogs
    const projects = await sanityFetch<ProjectResponse[]>({
      query: projectsQuery,
      tags: ['projects'],
    });

    return (
      // add the tags as a badge and the category and do not add html
      <section id="projects" className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-semibold mb-8 gradient-text">Projects</h2>

          {projects.length === 0 ? (
            <div className="text-center text-gray-400">
              <p>No projects found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard project={project} />
              ))}
            </div>
          )}

          {readMore && <ReadMore link="/projects" text="View All Projects" />}
        </div>
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
