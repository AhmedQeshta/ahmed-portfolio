'use client';
import { useRouter } from 'next/navigation';
import Modal from '@/features/shard/components/ui/Modal';
import HeroWork from '@/features/works/components/ui/HeroWork';
import CompanyInformation from '@/features/works/components/ui/CompanyInformation';
import Achievements from '@/features/works/components/ui/Achievements';
import Skills from '@/features/works/components/ui/Skills';
import Timeline from '@/features/works/components/ui/Timeline';
import Location from '@/features/works/components/ui/Location';
import Technologies from '@/features/shard/components/ui/Technologies';
import WorkDetails from '@/features/works/components/ui/WorkDetails';
import { IWorkResponse } from '@/features/works/types/work';

export default function WorkModal({ work }: IWorkResponse) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const { technologies } = work;

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
