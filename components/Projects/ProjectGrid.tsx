import { projectsQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/client';
import Link from 'next/link';
import { ProjectResponse } from '@/sanity/lib/types';
import Image from 'next/image';
import { getImageUrl } from '@/sanity/lib/image';
import { formatDateDuration } from '@/utils/date';
import ErrorHandle from '@/components/ui/ErrorHandle';

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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="bg-card-bg backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:bg-card-hover transition">
                    <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      {project.screenshot ? (
                        <Image
                          src={getImageUrl(project.screenshot, 64, 64, 90)}
                          alt={project.title}
                          width={100}
                          height={100}
                          className="object-contain"
                          priority
                        />
                      ) : (
                        <span className="text-white text-4xl font-bold">
                          {project.title.charAt(0)}
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>

                      {/* Technologies */}
                      <div className="mb-3">
                        <p className="text-text-accent text-sm mb-2 font-medium">Technologies:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <div
                              key={tech._id}
                              className="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded-md">
                              <div className="relative w-4 h-4">
                                <Image
                                  src={getImageUrl(tech.logo, 16, 16, 90)}
                                  alt={tech.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <span className="text-xs text-gray-300">{tech.name}</span>
                            </div>
                          ))}
                          {project.technologies.length > 4 && (
                            <Link
                              href={`/projects/${project.slug}`}
                              className="text-xs text-gray-400 px-2 py-1">
                              +{project.technologies.length - 4} more
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Duration */}
                      <p className="text-text-secondary text-sm mb-4 font-medium flex items-center gap-2">
                        <span className="text-text-secondary">🗓️</span>
                        <span className="text-text-secondary px-1">
                          {formatDateDuration(project?.startDate ?? '', project?.endDate ?? '')}
                        </span>
                      </p>

                      {project.description && (
                        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                          {project.description}
                        </p>
                      )}

                      <div className="flex gap-4">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="text-sm text-white/80 hover:text-white underline gradient-button rounded-md px-4 py-2">
                          Load More
                        </Link>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-white/80 hover:text-white underline gradient-button rounded-md px-4 py-2">
                          Live Demo
                        </a>
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-white/80 hover:text-white underline gradient-button rounded-md px-4 py-2">
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
