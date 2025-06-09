import { projectsQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/client';
import Link from 'next/link';
import { ProjectResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/components/ui/ErrorHandle';
import ProjectCard from '@/components/Projects/ProjectCard';

interface ProjectGridProps {
  readMore?: boolean;
}

export default async function ProjectGrid({ readMore = true }: ProjectGridProps) {
  try {
    const projects = await sanityFetch<ProjectResponse[]>({
      query: projectsQuery,
      tags: ['projects'],
    });

    return (
      <section id="projects" className="py-20 bg-section-glass rounded-2xl">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-semibold mb-8 gradient-text">Projects</h2>
          {projects.length === 0 ? (
            <div className="text-center text-gray-400">
              <p>No projects found.</p>
            </div>
          ) : (
            <>
              <ProjectCard projects={projects} />
              {readMore && (
                <div className="flex justify-center mt-12">
                  <Link
                    href="/projects"
                    className="px-6 py-3 gradient-button-primary rounded-full font-semibold">
                    View All Projects
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching featured projects:', error);

    return (
      <ErrorHandle
        id={'projects'}
        title={'WProjects'}
        description={'Failed to load featured projects. Please try again later.'}
      />
    );
  }
}
