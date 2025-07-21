import { workExperienceQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/client';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/components/ui/ErrorHandle';
import WorkSlider from '@/components/WorkExperiences/WorkSlider';
import useSortByDate from '@/hooks/useSortByDate';

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
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-semibold mb-8 gradient-text">Works</h2>
          {sortedWorks.length === 0 ? (
            <div className="text-center text-gray-400">
              <p>No works found.</p>
            </div>
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
        title={'Work Experience'}
        description={'Failed to load work experience. Please try again later.'}
      />
    );
  }
}
