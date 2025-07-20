import { workExperienceQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/client';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/components/ui/ErrorHandle';
import WorkSlider from '@/components/WorkExperiences/WorkSlider';

export default async function WorkGridSlider() {
  try {
    // Fetch work experiences
    const works = await sanityFetch<WorkExperienceResponse[]>({
      query: workExperienceQuery,
      tags: ['works'],
    });

    // Sort works by startDate (newest first) and then by endDate (ongoing first)
    const sortedWorks = [...works].sort((a, b) => {
      // First compare by startDate (descending - newest first)
      // Handle potentially missing startDates (although they should always exist)
      const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
      const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
      const startDateComparison = dateB - dateA;

      if (startDateComparison !== 0) {
        return startDateComparison;
      }

      // If startDates are equal, sort by endDate (null/undefined endDate means current job)
      // Current jobs (no endDate) should appear first
      if (!a.endDate && b.endDate) return -1;
      if (a.endDate && !b.endDate) return 1;
      if (!a.endDate && !b.endDate) return 0;

      // Both have endDates, compare them (descending - most recent end date first)
      const endDateA = a.endDate ? new Date(a.endDate).getTime() : 0;
      const endDateB = b.endDate ? new Date(b.endDate).getTime() : 0;
      return endDateB - endDateA;
    });

    return (
      <section id="works" className="py-20">
        <div className="mx-auto max-w-5xl px-4">
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
