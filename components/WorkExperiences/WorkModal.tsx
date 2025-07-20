'use client';
import { useRouter } from 'next/navigation';
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
import { IWorkResponse } from '@/utils/types/work';

export default function WorkModal({ work }: IWorkResponse) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const { technologies, companyUrl } = work;

  return (
    <Modal isOpen={true} onClose={handleClose} maxWidth="2xl">
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Hero Section */}
        <HeroWork work={work} />

        {/* Main Content */}
        <div className="relative z-10 pt-8 pb-16">
          <div className="px-6 md:px-8">
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
