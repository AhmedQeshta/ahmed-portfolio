import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { IProjectResponse } from '@/features/projects/types/project';
import { PortableText } from '@portabletext/react';

export default function FullDescription({ project }: IProjectResponse) {
  if (!project) return null;

  const { fullDescription } = project;

  return (
    <ScrollAnimation direction="down" delay={0.1} className="space-y-4">
      <ScrollAnimation direction="down" delay={0.2}>
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          About This Project
        </h2>
      </ScrollAnimation>
      <ScrollAnimation direction="down" delay={0.3}>
        <div className="prose prose-invert prose-lg max-w-none">
          <PortableText value={fullDescription} />
        </div>
      </ScrollAnimation>
    </ScrollAnimation>
  );
}
