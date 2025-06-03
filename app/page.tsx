import Header from '@/components/Header';
import WorkGrid from '@/components/WorkExperiences/WorkGrid';
import ProjectGrid from '@/components/ProjectGrid';
import BlogGrid from '@/components/BlogGrid';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <main>
      <Header />
      <WorkGrid />
      <ProjectGrid projects={[]} />
      <BlogGrid blogs={[]} />
      <ContactForm />
    </main>
  );
}
