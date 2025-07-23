import { Suspense } from 'react';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import { BaseInfoResponse } from '@/sanity/lib/types';
import { sanityFetch } from '@/sanity/lib/client';
import { baseInfoQuery } from '@/sanity/lib/queries';
import BaseInfo from '@/features/header/components/BaseInfo';
import ProfileImage from '@/features/header/components/ProfileImage';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';

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
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10 pointer-events-none" />

        {/* Animated Background Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000 pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-600/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000 pointer-events-none" />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-[10%] left-[15%] w-2 h-2 bg-purple-400/60 rounded-full animate-float"
            style={{ animationDelay: '0s' }}
          />
          <div
            className="absolute top-[20%] right-[20%] w-1 h-1 bg-blue-400/60 rounded-full animate-float"
            style={{ animationDelay: '2s' }}
          />
          <div
            className="absolute top-[60%] left-[10%] w-3 h-3 bg-pink-400/60 rounded-full animate-float"
            style={{ animationDelay: '4s' }}
          />
          <div
            className="absolute bottom-[30%] right-[15%] w-2 h-2 bg-purple-400/60 rounded-full animate-float"
            style={{ animationDelay: '6s' }}
          />
          <div
            className="absolute top-[40%] left-[30%] w-1 h-1 bg-blue-400/60 rounded-full animate-float"
            style={{ animationDelay: '8s' }}
          />
          <div
            className="absolute bottom-[40%] right-[30%] w-2 h-2 bg-pink-400/60 rounded-full animate-float"
            style={{ animationDelay: '10s' }}
          />
        </div>

        {/* Main Content */}
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start min-h-[80vh]">
            {/* Left Content - Enhanced BaseInfo */}
            <div className="order-2 lg:order-1 space-y-10 flex items-center min-h-[80vh]">
              <ScrollAnimation direction="left" delay={0.2}>
                <div className="space-y-8">
                  <BaseInfo baseInfo={baseInfo} />
                </div>
              </ScrollAnimation>
            </div>

            {/* Right Content - Enhanced Profile Image - Aligned to Top */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end pt-8 lg:pt-0">
              <ScrollAnimation direction="right" delay={0.4}>
                <div className="relative">
                  <ProfileImage baseInfo={baseInfo} />
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching header information:', error);

    return (
      <ErrorHandle
        id={'header'}
        title={'Header Section'}
        description={'Failed to load header information. Please try again later.'}
      />
    );
  }
}
