import NavigationHeader from '@/features/shard/components/ui/NavigationHeader';
import Technologies from '@/features/shard/components/ui/Technologies';
import HeroWork from '@/features/works/components/ui/HeroWork';

import Location from '@/features/works/components/ui/Location';
import Timeline from '@/features/works/components/ui/Timeline';
import Skills from '@/features/works/components/ui/Skills';
import Achievements from '@/features/works/components/ui/Achievements';
import CompanyInformation from '@/features/works/components/ui/CompanyInformation';
import { IWorkResponse } from '@/features/works/types/work';
import WorkDetails from '@/features/works/components/ui/WorkDetails';

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
