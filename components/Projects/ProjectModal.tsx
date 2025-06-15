'use client';

import { ProjectResponse } from '@/sanity/lib/types';
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/ui/Modal';
import ProjectGallery from '@/components/Projects/Features/ProjectGallery';
import FullDescription from '@/components/Projects/Features/FullDescription';
import Technologies from '@/components/ui/Technologies';
import TimelineProject from '@/components/Projects/Features/TimelineProject';
import ActionButtons from '@/components/ui/ActionButtons';
import HeroModal from './Features/HeroModal';

interface ProjectModalProps {
  project: ProjectResponse;
}

export default function ProjectModal({ project }: ProjectModalProps) {
  const { technologies, liveUrl, repoUrl } = project;
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const listLinks = [
    {
      id: 1,
      text: 'Live Demo',
      link: liveUrl,
      customStyle:
        'flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors',
      icon: <ExternalLink size={16} />,
    },
    {
      id: 2,
      text: 'Source Code',
      link: repoUrl,
      customStyle:
        'flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors',
      icon: <Github size={16} />,
    },
  ];

  return (
    <Modal isOpen={true} onClose={handleClose} maxWidth="xl">
      {/* Hero Image */}

      <HeroModal project={project} />

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h1>

          <p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <ActionButtons listLinks={listLinks} />
          </div>
        </div>

        {/* Project Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Timeline */}
          <TimelineProject project={project} />

          {/* Technologies */}
          <Technologies technologies={technologies} />
        </div>

        <FullDescription project={project} />

        {/* Gallery */}
        <ProjectGallery project={project} />
      </div>
    </Modal>
  );
}
