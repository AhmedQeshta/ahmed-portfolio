import { getImageUrl } from '@/sanity/lib/image';
import ErrorHandle from './ui/ErrorHandle';

import { sanityFetch } from '@/sanity/lib/client';
import { technologiesQuery } from '@/sanity/lib/queries';

import { TechnologyResponse } from '@/sanity/lib/types';
import Image from 'next/image';

export default async function SkillsIcons() {
  try {
    const technologies = await sanityFetch<TechnologyResponse[]>({
      query: technologiesQuery,
      tags: ['technologies'],
    });

    return (
      <div className="flex flex-wrap gap-4 mt-6">
        {technologies.map((technology) => (
          <div
            key={technology._id}
            className="w-10 h-10 bg-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center">
            <Image
              src={getImageUrl(technology.logo, 24, 24, 90)}
              alt={technology.name}
              width={24}
              height={24}
            />
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error('Error fetching featured projects:', error);

    return (
      <ErrorHandle
        id={'skills'}
        title={'Skills'}
        description={'Failed to load Skills. Please try again later.'}
      />
    );
  }
}
