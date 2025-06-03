import Header from '@/components/Header';
import WorkGrid from '@/components/WorkGrid';
import ProjectGrid from '@/components/ProjectGrid';
import BlogGrid from '@/components/BlogGrid';
import ContactForm from '@/components/ContactForm';
import ProjectsSection from '@/components/ProjectsSection';

export default function Home() {
  return (
    <main>
      <Header />
      <WorkGrid workItems={[]} />
      <ProjectGrid projects={[]} />
      {/* <ProjectsSection /> */}
      <BlogGrid blogs={[]} />
      <ContactForm />
    </main>
  );
}
