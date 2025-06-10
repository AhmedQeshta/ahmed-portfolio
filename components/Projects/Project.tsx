import { ProjectResponse } from '@/sanity/lib/types';
import { ExternalLink, Github } from 'lucide-react';
import Technologies from '@/components/ui/Technologies';
import NavigationHeader from '@/components/ui/NavigationHeader';
import BackgroundEffects from '@/components/ui/BackgroundEffects';
import HeroProject from '@/components/Projects/HeroProject';
import ActionButtons from '@/components/Projects/ActionButtons';
import ProjectGallery from '@/components/Projects/ProjectGallery';
import TimelineProject from '@/components/Projects/TimelineProject';
import StatsProject from '@/components/Projects/StatsProject';
import FullDescription from '@/components/Projects/FullDescription';

interface ProjectModalProps {
  project: ProjectResponse;
}

export default function Project({ project }: ProjectModalProps) {
  const { technologies, fullDescription } = project;

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

          <ActionButtons project={project} />

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Full Description */}
              <FullDescription project={project} />

              {/* Gallery */}
              <ProjectGallery project={project} />
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
