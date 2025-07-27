import { workExperienceQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/client';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import WorkSlider from '@/features/works/components/WorkSlider';
import useSortByDate from '@/features/works/hooks/useSortByDate';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';

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
          className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-10">
          {/* Header Animation */}
          <ScrollAnimation direction="down" delay={0.2}>
            <h2 className="text-3xl font-semibold mb-8 gradient-text">Works</h2>
          </ScrollAnimation>

          {/* Content Animation */}
          {sortedWorks.length === 0 ? (
            <ScrollAnimation direction="up" delay={0.3}>
              <div className="text-center text-gray-400">
                <p>No works found.</p>
              </div>
            </ScrollAnimation>
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
