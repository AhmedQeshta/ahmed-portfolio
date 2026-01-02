'use client';

import Technologies from '@/features/shard/components/ui/Technologies';
import BackgroundEffects from '@/features/shard/components/ui/BackgroundEffects';
import HeroProject from '@/features/projects/components/ui/HeroProject';
import ActionButtons from '@/features/shard/components/ui/ActionButtons';
import ProjectGallery from '@/features/projects/components/ui/ProjectGallery';
import TimelineProject from '@/features/projects/components/ui/TimelineProject';
import StatsProject from '@/features/projects/components/ui/StatsProject';
import FullDescription from '@/features/projects/components/ui/FullDescription';
import { ExternalLink, Github } from 'lucide-react';
import { IProjectResponse } from '@/features/projects/types/project';
import NavigationHeader from '@/features/shard/components/ui/NavigationHeader';
import useGalleryModal from '../hooks/useGalleryModal';
import ImagePreview from './ui/ImagePreview';
import { useTheme } from '@/features/theme/hooks/useTheme';
import ShareCard from '@/features/shard/components/ui/ShareCard';
import { getCustomUrl } from '@/features/shard/utils/url';

export default function Project({ project }: IProjectResponse) {
  const { technologies, liveUrl, repoUrl, description, title, gallery, slug } = project;

  const { isDark } = useTheme();

  const { openModal, ...restProps } = useGalleryModal(gallery || []);

  const listLinks = [
    {
      id: 1,
      text: 'Live Demo',
      link: liveUrl,
      customStyle:
        'flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl',
      icon: <ExternalLink size={20} />,
    },
    {
      id: 2,
      text: 'Source Code',
      link: repoUrl,
      customStyle:
        'flex items-center gap-3 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-gray-700',
      icon: <Github size={20} />,
    },
  ];

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${
        isDark ? 'from-gray-900 via-black to-gray-900' : 'from-gray-50 via-white to-gray-100'
      }`}>
      {/* Navigation Header */}
      <NavigationHeader link="/projects" text="Back to Projects" />

      {/* Hero Section */}
      <HeroProject project={project} />

      {/* Main Content */}
      <div className="relative z-10 pt-12 pb-20">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              {/* Project Description */}
              <div
                className={`${
                  isDark
                    ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
                    : 'bg-white/80 backdrop-blur-sm border border-gray-200'
                } rounded-xl p-8 mb-8 text-justify`}>
                <p
                  className={`text-xl leading-relaxed mb-6 text-justify ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  {description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <ActionButtons listLinks={listLinks} />
                </div>
              </div>

              {/* Full Description */}
              <div
                className={`${
                  isDark
                    ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
                    : 'bg-white/80 backdrop-blur-sm border border-gray-200'
                } rounded-xl p-8 mb-8`}>
                <FullDescription project={project} />
              </div>

              {/* Project Gallery */}
              <div
                className={`${
                  isDark
                    ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
                    : 'bg-white/80 backdrop-blur-sm border border-gray-200'
                } rounded-xl p-8 mt-8`}>
                <ProjectGallery project={project} openModal={openModal} />
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              {/* Project Timeline */}
              <TimelineProject project={project} />

              {/* Technologies Used */}
              <Technologies technologies={technologies} />

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
      </div>

      {/* Image Preview Modal */}
      <ImagePreview gallery={gallery || []} title={title} {...restProps} />
      {/* Background Effects */}
      <BackgroundEffects />
    </div>
  );
}
