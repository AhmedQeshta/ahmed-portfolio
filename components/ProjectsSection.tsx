import { sanityFetch } from '@/sanity/lib/client';
import { projectsQuery } from '@/sanity/lib/queries';
import { ProjectResponse } from '@/sanity/lib/types';
import { getImageUrl } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProjectsSection() {
  try {
    const projects = await sanityFetch<ProjectResponse[]>({
      query: projectsQuery,
      tags: ['project'],
    });

    return (
      <section id="projects" className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-semibold mb-8 gradient-text">Featured Projects</h2>

          {projects.length === 0 ? (
            <div className="text-center text-gray-400">
              <p>No featured projects found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={getImageUrl(project.screenshot, 800, 600, 80)}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {project.technologies.map((tech) => (
                        <div
                          key={tech._id}
                          className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border">
                          <div className="relative w-5 h-5">
                            <Image
                              src={getImageUrl(tech.logo, 20, 20, 90)}
                              alt={tech.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          className="text-blue-600 hover:text-blue-800">
                          Live Demo
                        </Link>
                      )}
                      {project.repoUrl && (
                        <Link
                          href={project.repoUrl}
                          target="_blank"
                          className="text-gray-600 hover:text-gray-800">
                          GitHub
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching featured projects:', error);

    return (
      <section id="projects" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-semibold mb-8 gradient-text text-center">
            Featured Projects
          </h2>
          <div className="text-center text-red-400">
            <p>Failed to load featured projects. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }
}
