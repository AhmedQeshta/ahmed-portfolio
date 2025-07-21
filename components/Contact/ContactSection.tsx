import ContactForm from '@/components/Contact/ContactForm';
import ErrorHandle from '@/components/ui/ErrorHandle';
import { sanityFetch } from '@/sanity/lib/client';
import { baseInfoQuery } from '@/sanity/lib/queries';
import { BaseInfoResponse } from '@/sanity/lib/types';
import ContactInfo from '@/components/Contact/ContactInfo';
import ScrollAnimation from '@/components/ui/ScrollAnimation';

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
            {/* Left - Contact Info */}
            <div className="md:w-1/2">
              <ScrollAnimation direction="down" delay={0.2}>
                <ContactInfo baseInfo={baseInfo} />
              </ScrollAnimation>
            </div>

            {/* Right - Contact Form */}
            <div className="md:w-1/2">
              <ContactForm />
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
