import Header from '@/features/header/components/Header';
import WorkGridSlider from '@/features/works/components/WorkGridSlider';
import ProjectGrid from '@/features/projects/components/ProjectGrid';
import BlogGrid from '@/features/blogs/components/BlogGrid';

import { Fragment, Suspense } from 'react';
import LoadingSpinner from '@/features/shard/components/ui/LoadingSpinner';
import { featuresQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/client';
import { FeatureResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import ContactSection from '@/features/contact/components/ContactSection';
import Link from 'next/link';

const sectionOfPage: any = {
  header: <Header />,
  works: <WorkGridSlider />,
  projects: <ProjectGrid />,
  blogs: <BlogGrid />,
  contact: <ContactSection />,
};

export default async function Home() {
  try {
    const features = await sanityFetch<FeatureResponse[]>({
      query: featuresQuery,
      tags: ['features'],
    });

    return (
      <main>
        {features &&
          features.map(({ _id, name, status }) => (
            <Fragment key={_id}>
              <Suspense fallback={<LoadingSpinner />}>
                {status === 'publish' && sectionOfPage[name]}
              </Suspense>
            </Fragment>
          ))}
        <Link href="/about" className="text-white">
          about
        </Link>
      </main>
    );
  } catch (error) {
    return (
      <ErrorHandle id={'home'} description={'Failed to load Home Page. Please try again later.'} />
    );
  }
}
