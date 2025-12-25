import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import { BaseInfoResponse } from '@/sanity/lib/types';
import { sanityFetch } from '@/sanity/lib/client';
import { baseInfoQuery } from '@/sanity/lib/queries';
import BaseInfo from '@/features/header/components/BaseInfo';
import ProfileImage from '@/features/header/components/ProfileImage';
import SkillsIconsHeader from '@/features/header/components/skillsIcons/SkillsIconsHeader';

export default async function Header() {
  try {
    const baseInfo = await sanityFetch<BaseInfoResponse>({
      query: baseInfoQuery,
      tags: ['baseInfo'],
    });

    return (
      <section id="home" className="relative min-h-screen overflow-hidden flex items-center">
        {/* Main Content */}
        <div className="relative mx-auto max-w-[1450px] px-5 sm:px-7 lg:px-5 w-full py-20 lg:py-32 min-h-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* Left Content - Enhanced BaseInfo */}
            <div className="order-2 lg:order-1 space-y-10 flex items-start">
              <div className="space-y-8">
                <BaseInfo baseInfo={baseInfo} />
              </div>
            </div>

            {/* Right Content - Enhanced Profile Image - Aligned to Top */}
            <div className="order-1 mt-15 lg:mt-24 lg:order-2 flex justify-center">
              <div className="relative">
                <ProfileImage baseInfo={baseInfo} />
              </div>
            </div>
          </div>

          <SkillsIconsHeader technologies={baseInfo.technologies} />
        </div>
      </section>
    );
  } catch (error) {
    return (
      <ErrorHandle
        id={'header'}
        description={'Failed to load header information. Please try again later.'}
      />
    );
  }
}
