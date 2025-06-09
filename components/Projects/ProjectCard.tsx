'use client';

import Link from 'next/link';
import { ProjectResponse } from '@/sanity/lib/types';
import Image from 'next/image';
import { getImageUrl } from '@/sanity/lib/image';
import { formatDateDuration } from '@/utils/date';
// import { useRouter } from 'next/navigation';
// import { handleCardClick } from '@/utils/handleCardLInk';

interface ProjectCardProps {
  projects: ProjectResponse[];
}

export default function ProjectCard({ projects }: ProjectCardProps) {
  // const router = useRouter();

  // onClick={(e) => handleCardClick({ link: `/projects/${project.slug}`, router, event: e })}

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <Link
          href={`/projects/${project.slug}`}
          key={project._id}
          className="bg-card-bg backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:bg-card-hover transition cursor-pointer">
          <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            {project.screenshot ? (
              <Image
                src={getImageUrl(project.screenshot, 200, 140, 100)}
                alt={project.title}
                width={200}
                height={140}
                className="object-contain"
                priority
              />
            ) : (
              <span className="text-white text-4xl font-bold">{project.title.charAt(0)}</span>
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
              <p className="text-text-secondary text-sm mb-4 line-clamp-3">{project.description}</p>
            )}

            <div className="flex gap-4">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80 hover:text-white underline bg-gradient-to-br from-purple-500 to-pink-500 rounded-md px-2 py-2">
                Live Demo
              </a>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80 hover:text-white underline bg-gradient-to-br from-purple-500 to-pink-500 rounded-md px-2 py-2">
                GitHub
              </a>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
