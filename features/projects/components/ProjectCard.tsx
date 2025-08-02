import { IProjectCardProps } from '@/features/projects/types/project';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import Card from './ui/Card';
import ReadMore from '@/features/shard/components/ui/ReadMore';

export default function ProjectCard({ projects, readMore }: IProjectCardProps) {
  return (
    <>
      <ScrollAnimation
        direction="up"
        delay={0.3}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects?.map((project, index) => (
          <ScrollAnimation
            key={project._id}
            direction="up"
            delay={0.4 + index * 0.1}
            className="h-full">
            <Card project={project} />
          </ScrollAnimation>
        ))}
      </ScrollAnimation>
      {/* Read More Section */}
      <ReadMore
        link="/projects"
        text="View All Projects"
        readMore={readMore}
        dataLength={projects?.length || 0}
      />
    </>
  );
}
