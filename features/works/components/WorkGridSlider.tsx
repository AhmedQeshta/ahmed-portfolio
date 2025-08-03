import { workExperienceQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/client';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import WorkSlider from '@/features/works/components/WorkSlider';
import useSortByDate from '@/features/works/hooks/useSortByDate';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import HeaderTitle from '@/features/shard/components/ui/HeaderTitle';
import EmptyItem from '@/features/shard/components/ui/EmptyItem';

export default async function WorkGridSlider() {
  try {
    // Fetch work experiences
    const works = await sanityFetch<WorkExperienceResponse[]>({
      query: workExperienceQuery,
      tags: ['works'],
    });

    const { sortedWorks } = useSortByDate({ works });

    return (
      <section id="works" className="py-20">
        <ScrollAnimation
          direction="down"
          delay={0.1}
          className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-5">
          {/* Header Animation*/}
          <HeaderTitle
            title="Works Experience"
            subtitle="Explore my latest works and creative solutions"
          />

          {/* Content Animation */}
          {sortedWorks.length === 0 ? (
            <EmptyItem
              title="No work experience found"
              subTitle="Check back soon for new work experience!"
              icon="👨‍💼"
            />
          ) : (
            <ScrollAnimation direction="up" delay={0.3}>
              <WorkSlider works={sortedWorks} />
            </ScrollAnimation>
          )}
        </ScrollAnimation>
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
