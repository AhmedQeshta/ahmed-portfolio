import { workExperienceQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/client';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import WorkSlider from '@/features/works/components/WorkSlider';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import HeaderTitle from '@/features/shard/components/ui/HeaderTitle';
import EmptyItem from '@/features/shard/components/ui/EmptyItem';
import sortByDate from '@/features/works/utils/date';

export default async function WorkGridSlider() {
  try {
    // Fetch work experiences
    const works = await sanityFetch<WorkExperienceResponse[]>({
      query: workExperienceQuery,
      tags: ['works'],
    });

    const sortedWorks = sortByDate({ works });

    return (
      <section id="works" className="py-10">
        <div className="mx-auto max-w-[1450px] px-5 sm:px-7 lg:px-5">
          <HeaderTitle
            title="Works Experience"
            subtitle="Explore my latest works and creative solutions"
          />

          {sortedWorks.length === 0 ? (
            <EmptyItem
              title="No work experience found"
              subTitle="Check back soon for new work experience!"
              icon="👨‍💼"
            />
          ) : (
            <WorkSlider works={sortedWorks} />
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
