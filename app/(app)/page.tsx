import Header from '@/components/Header/Header';
import WorkGridSlider from '@/components/WorkExperiences/WorkGridSlider';
import ProjectGrid from '@/components/Projects/ProjectGrid';
import BlogGrid from '@/components/Blogs/BlogGrid';
import ContactSection from '@/components/Contact/ContactSection';
import { Suspense } from 'react';
import Loading from '@/components/ui/Loading';

export default function Home() {
  return (
    <main>
      <Header />
      <Suspense fallback={<Loading />}>
        <WorkGridSlider />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <ProjectGrid />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <BlogGrid />
      </Suspense>

      <ContactSection />
    </main>
  );
}
