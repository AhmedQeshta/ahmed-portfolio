import Technologies from '@/features/shard/components/ui/Technologies';
import NavigationHeader from '@/features/shard/components/ui/NavigationHeader';
import BackgroundEffects from '@/features/shard/components/ui/BackgroundEffects';
import HeroProject from '@/features/projects/components/ui/HeroProject';
import ActionButtons from '@/features/shard/components/ui/ActionButtons';
import ProjectGallery from '@/features/projects/components/ui/ProjectGallery';
import TimelineProject from '@/features/projects/components/ui/TimelineProject';
import StatsProject from '@/features/projects/components/ui/StatsProject';
import FullDescription from '@/features/projects/components/ui/FullDescription';
import { ExternalLink, Github } from 'lucide-react';
import { IProjectResponse } from '@/features/projects/types/project';

export default function Project({ project }: IProjectResponse) {
  const { technologies, liveUrl, repoUrl } = project;

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navigation Header */}

      <NavigationHeader link="/projects" text="Back to Projects" />

      {/* Hero Section */}
      <HeroProject project={project} />

      {/* Main Content */}
      <div className="relative z-10 pt-12 pb-20">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
          {/* Action Buttons */}

          <div className="flex flex-wrap gap-4 mb-12">
            <ActionButtons listLinks={listLinks} />
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Full Description */}
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                <FullDescription project={project} />
              </div>

              {/* Gallery */}

              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
                <ProjectGallery project={project} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Timeline */}
              <TimelineProject project={project} />

              {/* Technologies */}
              <Technologies technologies={technologies} />

              {/* Project Stats */}
              <StatsProject project={project} />
            </div>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <BackgroundEffects />
    </div>
  );
}
