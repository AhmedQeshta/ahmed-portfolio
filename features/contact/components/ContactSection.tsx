import ErrorHandle from '@/features/shard/components/ui/ErrorHandle';
import { sanityFetch } from '@/sanity/lib/client';
import { baseInfoQuery } from '@/sanity/lib/queries';
import { BaseInfoResponse } from '@/sanity/lib/types';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import ContactInfo from '@/features/contact/components/ContactInfo';
import ContactForm from '@/features/contact/components/form/ContactForm';
import ContactHeader from '@/features/contact/components/ContactHeader';
import QuickContact from '@/features/contact/components/form/QuickContact';
import ContactFormHeader from '@/features/contact/components/form/ContactFormHeader';
import ContactFooter from '@/features/contact/components/ContactFooter';

export default async function ContactSection() {
  try {
    const baseInfo = await sanityFetch<BaseInfoResponse>({
      query: baseInfoQuery,
      tags: ['baseInfo'],
    });

    return (
      <section id="contact" className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 pointer-events-none" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-7 lg:px-5">
          {/* Header Section */}
          <ContactHeader />

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
            {/* Contact Information */}
            <div className="order-2 lg:order-1 min-h-[900px]">
              <ScrollAnimation direction="left" delay={0.4}>
                <div className="bg-section-glass min-h-[900px] backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 h-full">
                  <ContactInfo baseInfo={baseInfo} />
                </div>
              </ScrollAnimation>
            </div>

            {/* Contact Form */}
            <div className="order-1 lg:order-2 min-h-[900px]">
              <ScrollAnimation direction="right" delay={0.4}>
                <div className="bg-section-glass min-h-[900px] backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 h-full">
                  {/* Form Header */}
                  <ContactFormHeader />

                  {/* Contact Form */}
                  <ContactForm />

                  {/* Quick Contact Options */}
                  <QuickContact baseInfo={baseInfo} />
                </div>
              </ScrollAnimation>
            </div>
          </div>

          {/* Bottom CTA Section */}
          <ContactFooter />
        </div>
      </section>
    );
  } catch (error) {
    return (
      <ErrorHandle
        id={'contact'}
        description={'Failed to load contact information. Please try again later.'}
      />
    );
  }
}
