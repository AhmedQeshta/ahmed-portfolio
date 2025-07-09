import ScrollAnimation from '@/components/ui/ScrollAnimation';
import { getStatusColor } from '@/utils/statusColor';
import { IProjectResponse } from '@/utils/types/project';
import Image from 'next/image';

export default function HeroProject({ project }: IProjectResponse) {
  if (!project) return null;
  const { screenshot, title, status, description } = project;
  //  make it
  return (
    <div className="relative h-[60vh] overflow-hidden">
      <Image src={screenshot} alt={title} fill className="object-cover" priority />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <div className="max-w-6xl mx-auto">
          {/* Status Badge */}
          <ScrollAnimation direction="down" delay={0.1}>
            <ScrollAnimation direction="down" delay={0.3} className="mb-4">
              <span
                className={`inline-block px-4 py-2 text-sm font-medium rounded-full border ${getStatusColor(
                  status,
                )}`}>
                {status.replace('-', ' ').toUpperCase()}
              </span>
            </ScrollAnimation>

            {/* Title and Description */}
            <ScrollAnimation direction="down" delay={0.4}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                {title}
              </h1>
            </ScrollAnimation>
            <ScrollAnimation direction="down" delay={0.5}>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed">
                {description}
              </p>
            </ScrollAnimation>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  );
}
