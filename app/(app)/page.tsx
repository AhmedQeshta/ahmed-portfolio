import Header from '@/features/header/components/Header';
import WorkGridSlider from '@/features/works/components/WorkGridSlider';
import ProjectGrid from '@/features/projects/components/ProjectGrid';
import BlogGrid from '@/features/blogs/components/BlogGrid';

import { Fragment, Suspense } from 'react';
import Loading from '@/features/shard/components/ui/Loading';
import { featuresQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/client';
import { FeatureResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import ContactSection from '@/features/contact/components/ContactSection';
import PrioritizedLoading from '@/features/shard/components/ui/PrioritizedLoading';

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
      <>
        {features &&
          features.map(({ _id, name, status }, index) => (
            <Fragment key={_id}>
              {status === 'publish' && (
                <Suspense
                  fallback={
                    // Use optimized loading for critical content (header)
                    name === 'header' ? <PrioritizedLoading /> : <Loading />
                  }>
                  <section
                    id={name}
                    aria-label={`${name.charAt(0).toUpperCase() + name.slice(1)} section`}
                    className={name === 'header' ? 'relative z-10' : undefined}>
                    {sectionOfPage[name]}
                  </section>
                </Suspense>
              )}
            </Fragment>
          ))}
      </>
    );
  } catch (error) {
    return (
      <ErrorHandle id={'home'} description={'Failed to load Home Page. Please try again later.'} />
    );
  }
}
