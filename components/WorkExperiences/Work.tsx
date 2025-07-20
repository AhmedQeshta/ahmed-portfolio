import NavigationHeader from '@/components/ui/NavigationHeader';
import Technologies from '@/components/ui/Technologies';
import HeroWork from '@/components/WorkExperiences/Features/HeroWork';
import WorkDetails from '@/components/WorkExperiences/Features/WorkDetails';
import Location from '@/components/WorkExperiences/Features/Location';
import Timeline from '@/components/WorkExperiences/Features/Timeline';
import Skills from '@/components/WorkExperiences/Features/Skills';
import Achievements from '@/components/WorkExperiences/Features/Achievements';
import CompanyInformation from '@/components/WorkExperiences/Features/CompanyInformation';
import { IWorkResponse } from '@/utils/types/work';

export default function Work({ work }: IWorkResponse) {
  const { technologies } = work;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Navigation Header */}

      <NavigationHeader link="/works" text="Back to Work Experience" />

      {/* Hero Section */}
      <HeroWork work={work} />

      {/* Main Content */}
      <div className="relative z-10 pt-12 pb-20">
        <div className="max-w-6xl mx-auto px-8 md:px-12">
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
