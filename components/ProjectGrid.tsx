import { allProjectsQuery, featuredProjectsQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/client';
import { createSlug } from '@/utils/slug';
import Link from 'next/link';
import { ProjectResponse } from '@/sanity/lib/types';

interface Project {
  id: string;
  title: string;
  technologies: string;
  description: string;
  screenshot: string;
  repoUrl: string;
  liveUrl: string;
}

interface ProjectGridProps {
  projects?: Project[];
  readMore?: boolean;
}

export default async function ProjectGrid({ projects = [], readMore = true }: ProjectGridProps) {
  // Default example item as specified in requirements
  const defaultProjects: Project[] = [
    {
      id: '1',
      title: 'Example E-com',
      technologies: 'Next.js, Node.js, MongoDB',
      description: 'A full-stack e-commerce site with payment integration and admin panel.',
      screenshot: '/screenshots/example-project.png',
      repoUrl: 'https://github.com/AhmedQeshta/example',
      liveUrl: 'https://example.com',
    },
    {
      id: '2',
      title: 'Example E-com 2',
      technologies: 'React.js, Node.js, MongoDB',
      description: 'A full-stack e-commerce site with payment integration and admin panel.',
      screenshot: '/screenshots/example-project.png',
      repoUrl: 'https://github.com/AhmedQeshta/example',
      liveUrl: 'https://example.com',
    },
  ];

  const items = projects.length > 0 ? projects : defaultProjects;

  return (
    <section id="projects" className="py-20 bg-[rgba(0,0,0,0.6)] rounded-2xl">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="text-3xl font-semibold mb-8 gradient-text">Projects</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((project) => (
            <div
              key={project.id}
              className="bg-card-bg backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:bg-card-hover transition">
              {/* fix this "bg-gradient-to-br from-purple-500 to-pink-500" */}
              <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">{project.title.charAt(0)}</span>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-text-accent text-sm mb-2">Tech: {project.technologies}</p>
                <p className="text-text-secondary text-sm mb-4">{project.description}</p>

                <div className="flex gap-4">
                  <Link
                    href={`projects/${createSlug(project.title)}`}
                    className="text-sm text-white/80 hover:text-white underline">
                    Load More
                  </Link>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/80 hover:text-white underline">
                    Live Demo
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
      </div>
    </section>
  );
}
