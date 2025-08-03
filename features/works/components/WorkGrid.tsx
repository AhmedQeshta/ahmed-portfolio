import { workExperienceQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/client';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import WorkCard from '@/features/works/components/WorkCard';
import HeaderTitle from '@/features/shard/components/ui/HeaderTitle';
import EmptyItem from '@/features/shard/components/ui/EmptyItem';
import { IWorkGridProps } from '@/features/works/types/work';

export default async function WorkGrid({ readMore = false }: IWorkGridProps) {
  try {
    const works = await sanityFetch<WorkExperienceResponse[]>({
      query: workExperienceQuery,
      tags: ['workExperiences'],
    });

    return (
      <section id="works" className={`py-20 ${!readMore && 'mt-12 lg:mt-12'}`}>
        <div className="mx-auto max-w-5xl px-4">
          <HeaderTitle
            title="Works Experience"
            subtitle="Explore my latest works and creative solutions"
          />

          {works.length === 0 ? (
            <EmptyItem
              title="No work experience found"
              subTitle="Check back soon for new work experience!"
              icon="👨‍💼"
            />
          ) : (
            <WorkCard works={works} />
          )}
        </div>
      </section>
    );
  } catch (error) {
    return (
      <ErrorHandle
        id={'work'}
        description={'Failed to load work experience. Please try again later.'}
      />
    );
  }
}
