import { sanityFetch } from '@/sanity/lib/client';
import { workExperienceQuery } from '@/sanity/lib/queries';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import WorkSlider from './WorkSlider';

export default async function WorkGrid() {
  try {
    const works = await sanityFetch<WorkExperienceResponse[]>({
      query: workExperienceQuery,
      tags: ['workExperience'],
    });

    return (
      <section id="work" className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-semibold mb-8 gradient-text">Work Experience</h2>

          {works.length === 0 ? (
            <div className="text-center text-gray-400">
              <p>No work experience found.</p>
            </div>
          ) : (
            <WorkSlider works={works} />
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching work experience:', error);

    return (
      <section id="work" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-semibold mb-8 gradient-text text-center">Work Experience</h2>
          <div className="text-center text-red-400">
            <p>Failed to load work experience. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }
}
