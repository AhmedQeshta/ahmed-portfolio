import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import { BaseInfoResponse } from '@/sanity/lib/types';
import { sanityFetch } from '@/sanity/lib/client';
import { baseInfoQuery } from '@/sanity/lib/queries';
import BaseInfo from '@/features/header/components/BaseInfo';
import ProfileImage from '@/features/header/components/ProfileImage';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import SkillsIconsHeader from '@/features/header/components/skillsIcons/SkillsIconsHeader';
import Effects from '@/features/header/components/ui/Effects';
import { getHeroDelays } from '@/features/shard/utils/animations';

export default async function Header() {
  try {
    const baseInfo = await sanityFetch<BaseInfoResponse>({
      query: baseInfoQuery,
      tags: ['baseInfo'],
    });

    const delays = getHeroDelays();

    return (
      <section id="home" className="relative min-h-screen overflow-hidden flex items-center ">
        <Effects />

        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-transparent to-pink-900/20 pointer-events-none" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Main Content */}
        <div className="relative mx-auto max-w-[1450px] px-5 sm:px-7 lg:px-5 w-full py-20 lg:py-32 min-h-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* Left Content - Enhanced BaseInfo */}
            <div className="order-2 lg:order-1 space-y-10 flex items-start">
              <ScrollAnimation direction="left" delay={delays.main} duration={0.4}>
                <div className="space-y-8">
                  <BaseInfo baseInfo={baseInfo} />
                </div>
              </ScrollAnimation>
            </div>

            {/* Right Content - Enhanced Profile Image - Aligned to Top */}
            <div className="order-1 mt-15 lg:mt-24 lg:order-2 flex justify-center">
              <ScrollAnimation direction="right" delay={delays.secondary} duration={0.4}>
                <div className="relative">
                  <ProfileImage baseInfo={baseInfo} />
                </div>
              </ScrollAnimation>
            </div>
          </div>

          <ScrollAnimation direction="up" delay={delays.accent} duration={0.35}>
            <SkillsIconsHeader technologies={baseInfo.technologies} />
          </ScrollAnimation>
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
