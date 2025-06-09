import Header from '@/components/Header';
import WorkGrid from '@/components/WorkExperiences/WorkGrid';
import ProjectGrid from '@/components/Projects/ProjectGrid';
import BlogGrid from '@/components/Blogs/BlogGrid';
import ContactSection from '@/components/Contact/ContactSection';

export default function Home() {
  return (
    <main>
      <Header />
      <WorkGrid />
      <ProjectGrid />
      <BlogGrid />
      <ContactSection />
    </main>
  );
}
