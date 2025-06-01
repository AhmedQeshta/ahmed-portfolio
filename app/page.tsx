import OrbBackground from '@/components/OrbBackground';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import WorkGrid from '@/components/WorkGrid';
import ProjectGrid from '@/components/ProjectGrid';
import BlogGrid from '@/components/BlogGrid';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import ComingSoon from '@/components/Coming-Soon';
// import ComingSoon from '@/components/Coming-Soon';

export default function Home() {
  return (
    <>
      <OrbBackground />
      <Navbar />
      <main>
        <Header />
        <WorkGrid workItems={[]} />
        <ProjectGrid projects={[]} />
        <BlogGrid blogs={[]} />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
