'use client';

import { ProjectResponse } from '@/sanity/lib/types';
import Image from 'next/image';
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import Modal from '@/components/ui/Modal';

interface ProjectModalProps {
  project: ProjectResponse;
}

export default function ProjectModal({ project }: ProjectModalProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'in-progress':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'on-hold':
        return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      default:
        return 'text-gray-400 bg-gray-500/10 border-gray-500/30';
    }
  };

  return (
    <Modal isOpen={true} onClose={handleClose} maxWidth="xl">
      {/* Hero Image */}
      <div className="relative h-64 md:h-80">
        <Image
          src={project.screenshot}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(project.status)}`}>
            {project.status.replace('-', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h1>

          <p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                <Github size={16} />
                Source Code
              </a>
            )}
          </div>
        </div>

        {/* Project Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Timeline */}
          {(project.startDate || project.endDate) && (
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <Calendar size={20} />
                Timeline
              </h3>
              <div className="text-gray-300">
                {project.startDate && <p>Started: {formatDate(project.startDate)}</p>}
                {project.endDate && <p>Completed: {formatDate(project.endDate)}</p>}
              </div>
            </div>
          )}

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                <Tag size={20} />
                Technologies
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech._id}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-700">
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Full Description */}
        {project.fullDescription && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white">About This Project</h3>
            <div className="prose prose-invert max-w-none">
              <PortableText value={project.fullDescription} />
            </div>
          </div>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.gallery.map((image, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${project.title} gallery image ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
