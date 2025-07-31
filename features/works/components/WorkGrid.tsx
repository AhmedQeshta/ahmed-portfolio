import { workExperienceQuery } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/client';
import { WorkExperienceResponse } from '@/sanity/lib/types';
import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import WorkCard from '@/features/works/components/WorkCard';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';

export default async function WorkGrid() {
  try {
    const works = await sanityFetch<WorkExperienceResponse[]>({
      query: workExperienceQuery,
      tags: ['workExperiences'],
    });

    return (
      <section id="works" className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <ScrollAnimation direction="down" delay={0.2}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 gradient-text">Works Experience</h2>
              <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                Explore my latest works and creative solutions
              </p>
            </div>
          </ScrollAnimation>

          {works.length === 0 ? (
            <div className="text-center text-gray-400">
              <p>No work experience found.</p>
            </div>
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
