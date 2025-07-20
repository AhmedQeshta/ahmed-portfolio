import { Suspense } from 'react';
import ErrorHandle from '@/components/ui/ErrorHandle';
import { BaseInfoResponse } from '@/sanity/lib/types';
import { sanityFetch } from '@/sanity/lib/client';
import { baseInfoQuery } from '@/sanity/lib/queries';
import BaseInfo from '@/components/Header/BaseInfo';
import ProfileImage from '@/components/Header/ProfileImage';

export default async function Header() {
  try {
    const baseInfo = await sanityFetch<BaseInfoResponse>({
      query: baseInfoQuery,
      tags: ['baseInfo'],
    });

    return (
      <section id="home" className="flex flex-col lg:flex-row items-center py-20">
        <div className="mx-auto max-w-5xl px-4 w-full">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Content */}
            <BaseInfo baseInfo={baseInfo} />

            {/* Right Content - Profile Image */}
            <ProfileImage baseInfo={baseInfo} />
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching featured projects:', error);

    return (
      <ErrorHandle
        id={'header'}
        title={'Header'}
        description={'Failed to load Header. Please try again later.'}
      />
    );
  }
}
