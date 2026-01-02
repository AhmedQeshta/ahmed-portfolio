'use client';

import { ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Modal from '@/features/shard/components/ui/Modal';
import Categories from '@/features/shard/components/ui/Categories';
import ProjectGallery from '@/features/projects/components/ui/ProjectGallery';
import FullDescription from '@/features/projects/components/ui/FullDescription';
import Technologies from '@/features/shard/components/ui/Technologies';
import TimelineProject from '@/features/projects/components/ui/TimelineProject';
import StatsProject from '@/features/projects/components/ui/StatsProject';
import ActionButtons from '@/features/shard/components/ui/ActionButtons';
import HeroModal from './ui/HeroModal';
import { IProjectResponse } from '@/features/projects/types/project';
import ImagePreview from './ui/ImagePreview';
import useGalleryModal from '../hooks/useGalleryModal';
import { useTheme } from '@/features/theme/hooks/useTheme';
import ShareCard from '@/features/shard/components/ui/ShareCard';
import { getCustomUrl } from '@/features/shard/utils/url';

export default function ProjectModal({ project }: IProjectResponse) {
  const { technologies, liveUrl, repoUrl, categories, description, title, gallery, slug } = project;

  const router = useRouter();
  const { isDark } = useTheme();

  const handleClose = () => {
    router.back();
  };
  const { openModal, ...restProps } = useGalleryModal(gallery || []);

  const listLinks = [
    {
      id: 1,
      text: 'Live Demo',
      link: liveUrl,
      customStyle:
        'flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium',
      icon: <ExternalLink size={16} />,
    },
    {
      id: 2,
      text: 'Source Code',
      link: repoUrl,
      customStyle:
        'flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium',
      icon: <Github size={16} />,
    },
  ];

  return (
    <Modal isOpen={true} onClose={handleClose} maxWidth="xl">
      {/* Hero Image */}
      <HeroModal project={project} />

      {/* Content */}
      <div className="p-6">
        {/* Header with Categories */}
        <div className="mb-8">
          <Categories categories={categories || []} delay={0.1} className="mb-4" />
          <h1
            className={`text-2xl md:text-3xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
            {title}
          </h1>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            {/* Project Description */}
            <div
              className={`${
                isDark
                  ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
                  : 'bg-white/80 backdrop-blur-sm border border-gray-200'
              } rounded-xl p-6 mb-6`}>
              <p
                className={`text-lg leading-relaxed mb-6 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                {description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <ActionButtons listLinks={listLinks} />
              </div>
            </div>

            {/* Full Description */}
            <div
              className={`${
                isDark
                  ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
                  : 'bg-white/80 backdrop-blur-sm border border-gray-200'
              } rounded-xl p-6 mb-6`}>
              <FullDescription project={project} />
            </div>

            {/* Technologies Used */}
            <Technologies technologies={technologies} />

            {/* Project Gallery */}
            <div
              className={`${
                isDark
                  ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
                  : 'bg-white/80 backdrop-blur-sm border border-gray-200'
              } rounded-xl p-6 mt-6`}>
              <ProjectGallery project={project} openModal={openModal} />
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Project Timeline */}
            <TimelineProject project={project} />

            {/* Project Stats */}
            <StatsProject project={project} />

            {/* Share Card */}
            <ShareCard
              url={getCustomUrl(slug, 'projects')}
              title={title}
              heading="Share This Project"
            />
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      <ImagePreview gallery={gallery || []} title={title} {...restProps} />
    </Modal>
  );
}
