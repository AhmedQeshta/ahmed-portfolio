import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import { BaseInfoResponse } from '@/sanity/lib/types';
import { sanityFetch } from '@/sanity/lib/client';
import { baseInfoQuery } from '@/sanity/lib/queries';
import BaseInfo from '@/features/header/components/BaseInfo';
import ProfileImage from '@/features/header/components/ProfileImage';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import SkillsIconsHeader from '@/features/header/components/ui/SkillsIconsHeader';
import Effects from '@/features/header/components/ui/Effects';
import { Suspense } from 'react';
import { HeaderSkeleton } from '@/features/shard/components/ui/SkeletonLoader';

export default async function Header() {
  try {
    const baseInfo = await sanityFetch<BaseInfoResponse>({
      query: baseInfoQuery,
      tags: ['baseInfo'],
    });

    return (
      <section
        id="home"
        className="relative min-h-screen overflow-hidden flex items-center bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900">
        <Effects />

        {/* Main Content */}
        <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-5 w-full py-20 lg:py-32 min-h-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* Left Content - Enhanced BaseInfo */}
            <div className="order-2 lg:order-1 space-y-10 flex items-start">
              <Suspense
                fallback={
                  <div className="space-y-6">
                    <div className="h-8 bg-gray-700 rounded animate-pulse w-3/4"></div>
                    <div className="h-6 bg-gray-700 rounded animate-pulse w-1/2"></div>
                  </div>
                }>
                <ScrollAnimation direction="left" delay={0.1}>
                  <div className="space-y-8">
                    <BaseInfo baseInfo={baseInfo} />
                  </div>
                </ScrollAnimation>
              </Suspense>
            </div>

            {/* Right Content - Enhanced Profile Image - Aligned to Top */}
            <div className="order-1 mt-15 lg:mt-24 lg:order-2 flex justify-center">
              <Suspense
                fallback={<div className="h-64 w-64 bg-gray-700 rounded-full animate-pulse"></div>}>
                <ScrollAnimation direction="right" delay={0.2}>
                  <div className="relative">
                    <ProfileImage baseInfo={baseInfo} />
                  </div>
                </ScrollAnimation>
              </Suspense>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="flex justify-center space-x-4 mt-8">
                <div className="h-8 w-8 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-8 w-8 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-8 w-8 bg-gray-700 rounded animate-pulse"></div>
              </div>
            }>
            <ScrollAnimation direction="up" delay={0.3}>
              <SkillsIconsHeader technologies={baseInfo.technologies} />
            </ScrollAnimation>
          </Suspense>
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
