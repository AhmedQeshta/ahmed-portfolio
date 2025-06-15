import { WorkExperienceResponse } from '@/sanity/lib/types';
import NavigationHeader from '@/components/ui/NavigationHeader';
import Technologies from '@/components/ui/Technologies';
import HeroWork from '@/components/WorkExperiences/Features/HeroWork';
import ActionButtons from '@/components/ui/ActionButtons';
import WorkDetails from '@/components/WorkExperiences/Features/WorkDetails';
import Location from '@/components/WorkExperiences/Features/Location';
import Timeline from '@/components/WorkExperiences/Features/Timeline';
import Skills from '@/components/WorkExperiences/Features/Skills';
import Achievements from '@/components/WorkExperiences/Features/Achievements';
import CompanyInformation from '@/components/WorkExperiences/Features/CompanyInformation';
import { ExternalLink } from 'lucide-react';

interface WorkProps {
  work: WorkExperienceResponse;
}

export default function Work({ work }: WorkProps) {
  const { technologies, companyUrl } = work;
  const listLinks = [
    {
      id: 1,
      text: 'Live Demo',
      link: companyUrl,
      customStyle:
        'flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl',
      icon: <ExternalLink size={20} />,
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navigation Header */}

      <NavigationHeader link="/works" text="Back to Work Experience" />

      {/* Hero Section */}
      <HeroWork work={work} />

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
              {/* Company Information */}

              <CompanyInformation work={work} />

              {/* Key Achievements */}
              <Achievements work={work} />

              {/* Skills */}
              <Skills work={work} />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Timeline */}
              <Timeline work={work} />

              {/* Location */}

              <Location work={work} />

              {/* Technologies */}
              <Technologies technologies={technologies} />

              {/* Work Details */}
              <WorkDetails work={work} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
