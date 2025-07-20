import Header from '@/components/Header/Header';
import WorkGridSlider from '@/components/WorkExperiences/WorkGridSlider';
import ProjectGrid from '@/components/Projects/ProjectGrid';
import BlogGrid from '@/components/Blogs/BlogGrid';
import ContactSection from '@/components/Contact/ContactSection';
import { Fragment, Suspense } from 'react';
import Loading from '@/components/ui/Loading';
import { featuresQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/client';
import { FeatureResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/components/ui/ErrorHandle';

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
              <Suspense fallback={<Loading />}>
                {status === 'publish' && sectionOfPage[name]}
              </Suspense>
            </Fragment>
          ))}

        {/* <Header />
        <Suspense fallback={<Loading />}>
          <WorkGridSlider />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <ProjectGrid />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <BlogGrid />
        </Suspense>

        <ContactSection /> */}
      </main>
    );
  } catch (error) {
    return (
      <ErrorHandle
        id={'home'}
        title={'Home Page'}
        description={'Failed to load Home Page. Please try again later.'}
      />
    );
  }
}
