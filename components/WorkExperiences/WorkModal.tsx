'use client';
import { useRouter } from 'next/navigation';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import { ExternalLink } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import ActionButtons from '@/components/ui/ActionButtons';
import HeroWork from '@/components/WorkExperiences/Features/HeroWork';
import CompanyInformation from '@/components/WorkExperiences/Features/CompanyInformation';
import Achievements from '@/components/WorkExperiences/Features/Achievements';
import Skills from '@/components/WorkExperiences/Features/Skills';
import Timeline from '@/components/WorkExperiences/Features/Timeline';
import Location from '@/components/WorkExperiences/Features/Location';
import Technologies from '@/components/ui/Technologies';
import WorkDetails from '@/components/WorkExperiences/Features/WorkDetails';

interface WorkModalProps {
  work: WorkExperienceResponse;
}

export default function WorkModal({ work }: WorkModalProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

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
    <Modal isOpen={true} onClose={handleClose} maxWidth="2xl">
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Hero Section */}
        <HeroWork work={work} />

        {/* Main Content */}
        <div className="relative z-10 pt-8 pb-16">
          <div className="px-6 md:px-8">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <ActionButtons listLinks={listLinks} />
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Company Information */}
                <CompanyInformation work={work} />

                {/* Key Achievements */}
                <Achievements work={work} />

                {/* Skills */}
                <Skills work={work} />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
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
    </Modal>
  );
}
