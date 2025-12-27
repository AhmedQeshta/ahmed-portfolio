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
import BlogGridSkeleton from '@/features/blogs/components/BlogGridSkeleton';
import ProjectGridSkeleton from '@/features/projects/components/ProjectGridSkeleton';

const sectionOfPage = {
  header: <Header />,
  works: <WorkGridSlider />,
  projects: (
    <Suspense fallback={<ProjectGridSkeleton />}>
      <ProjectGrid />
    </Suspense>
  ),
  blogs: (
    <Suspense fallback={<BlogGridSkeleton />}>
      <BlogGrid />
    </Suspense>
  ),
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
              {status === 'publish' && sectionOfPage[name as keyof typeof sectionOfPage]}
            </Fragment>
          ))}
      </main>
    );
  } catch {
    return (
      <ErrorHandle id={'home'} description={'Failed to load Home Page. Please try again later.'} />
    );
  }
}
