'use client';
import { IProjectCardProps } from '@/features/projects/types/project';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import Card from './ui/Card';
import ReadMore from '@/features/shard/components/ui/ReadMore';
import Filter from '@/features/filters/components/Filter';
import { ProjectResponse } from '@/sanity/lib/types';
import { useFilter } from '@/features/filters/hooks/useFilter';
import EmptyItem from '@/features/shard/components/ui/EmptyItem';

export default function ProjectCard({ projects, categories, readMore }: IProjectCardProps) {
  if (!projects) return null;

  const { filtered, handleFilter, activeFilter } = useFilter<ProjectResponse[]>(projects);

  return (
    <>
      {readMore && (
        <Filter categories={categories} handleFilter={handleFilter} activeFilter={activeFilter} />
      )}
      {filtered?.length === 0 ? (
        <EmptyItem
          title="No projects found"
          subTitle="Check back soon for new projects!"
          icon="🚀"
        />
      ) : (
        <>
          <ScrollAnimation
            direction="up"
            delay={0.3}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered?.map((project, index) => (
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
            dataLength={filtered?.length || 0}
          />
        </>
      )}
    </>
  );
}
