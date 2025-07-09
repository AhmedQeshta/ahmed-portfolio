import ScrollAnimation from '@/components/ui/ScrollAnimation';
import { getStatusColor } from '@/utils/statusColor';
import { IProjectResponse } from '@/utils/types/project';
import Image from 'next/image';

export default function HeroModal({ project }: IProjectResponse) {
  if (!project) return null;

  return (
    <div className="relative h-64 md:h-80">
      <Image src={project.screenshot} alt={project.title} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

      {/* Status Badge */}
      <ScrollAnimation direction="down" delay={0.2} className="absolute top-4 left-4">
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
            project.status,
          )}`}>
          {project.status.replace('-', ' ').toUpperCase()}
        </span>
      </ScrollAnimation>
    </div>
  );
}
