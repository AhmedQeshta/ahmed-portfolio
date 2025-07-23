import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import { sanityFetch } from '@/sanity/lib/client';
import { baseInfoQuery } from '@/sanity/lib/queries';
import { BaseInfoResponse } from '@/sanity/lib/types';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import ContactInfo from '@/features/contact/components/ContactInfo';
import ContactForm from '@/features/contact/components/ContactForm';

export default async function ContactSection() {
  try {
    const baseInfo = await sanityFetch<BaseInfoResponse>({
      query: baseInfoQuery,
      tags: ['baseInfo'],
    });

    return (
      <section id="contact" className="py-20 bg-section-glass rounded-2xl">
        <div className="mx-auto max-w-7xl px-4">
          <ScrollAnimation direction="down" delay={0.2}>
            <h2 className="text-3xl font-semibold mb-8 gradient-text">Contact Us</h2>
          </ScrollAnimation>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left - Contact Info (larger) */}
            <div className="md:w-3/5 lg:w-3/5">
              <ScrollAnimation direction="down" delay={0.2}>
                <ContactInfo baseInfo={baseInfo} />
              </ScrollAnimation>
            </div>

            {/* Right - Contact Form */}
            <div className="md:w-2/5 lg:w-2/5">
              <div className="bg-card-bg backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-6 h-full flex items-center justify-center">
                <div className="w-full">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching featured projects:', error);

    return (
      <ErrorHandle
        id={'footer'}
        title={'Footer'}
        description={'Failed to load Footer. Please try again later.'}
      />
    );
  }
}
