import Technologies from '@/features/shard/components/ui/Technologies';
import BackgroundEffects from '@/features/shard/components/ui/BackgroundEffects';
import HeroProject from '@/features/projects/components/ui/HeroProject';
import ActionButtons from '@/features/shard/components/ui/ActionButtons';
import ProjectGallery from '@/features/projects/components/ui/ProjectGallery';
import TimelineProject from '@/features/projects/components/ui/TimelineProject';
import StatsProject from '@/features/projects/components/ui/StatsProject';
import FullDescription from '@/features/projects/components/ui/FullDescription';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { ExternalLink, Github } from 'lucide-react';
import { IProjectResponse } from '@/features/projects/types/project';
import NavigationHeader from '@/features/shard/components/ui/NavigationHeader';

export default function Project({ project }: IProjectResponse) {
  const { technologies, liveUrl, repoUrl, description, title } = project;

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
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content Column */}
            <div className="lg:col-span-2">
              {/* Project Description */}
              <ScrollAnimation
                direction="down"
                delay={0.2}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 mb-8">
                <p className="text-xl text-gray-300 leading-relaxed mb-6">{description}</p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <ActionButtons listLinks={listLinks} />
                </div>
              </ScrollAnimation>

              {/* Full Description */}
              <ScrollAnimation
                direction="down"
                delay={0.3}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 mb-8">
                <FullDescription project={project} />
              </ScrollAnimation>

              {/* Project Gallery */}
              <ScrollAnimation
                direction="down"
                delay={0.4}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 mt-8">
                <ProjectGallery project={project} />
              </ScrollAnimation>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              {/* Project Timeline */}
              <TimelineProject project={project} />

              {/* Technologies Used */}
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
