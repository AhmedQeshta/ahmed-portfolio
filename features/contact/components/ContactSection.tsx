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
      <section id="contact" className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 pointer-events-none" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16 lg:mb-20">
            <ScrollAnimation direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-purple-300">Get In Touch</span>
              </div>
            </ScrollAnimation>

            <ScrollAnimation direction="down" delay={0.2}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-text">Let's Create</span>
                <br />
                <span className="text-white">Something Amazing</span>
              </h2>
            </ScrollAnimation>

            <ScrollAnimation direction="down" delay={0.3}>
              <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                Ready to bring your ideas to life? Whether it's a new project, collaboration, or
                just a friendly chat about technology, I'm here to help.
              </p>
            </ScrollAnimation>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
            {/* Contact Information */}
            <div className="order-2 lg:order-1">
              <ScrollAnimation direction="left" delay={0.4}>
                <div className="bg-section-glass backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 h-full">
                  <ContactInfo baseInfo={baseInfo} />
                </div>
              </ScrollAnimation>
            </div>

            {/* Contact Form */}
            <div className="order-1 lg:order-2">
              <ScrollAnimation direction="right" delay={0.4}>
                <div className="bg-section-glass backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 h-full">
                  {/* Form Header */}
                  <div className="mb-8">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Send Message</h3>
                    <p className="text-text-secondary">
                      Fill out the form below and I'll get back to you as soon as possible.
                    </p>
                  </div>

                  {/* Contact Form */}
                  <ContactForm />

                  {/* Quick Contact Options */}
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-sm text-text-secondary text-center mb-4">
                      Prefer a different way to connect?
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <a
                        href={`mailto:${baseInfo.email}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/30 rounded-lg transition-all duration-300 group">
                        <svg
                          className="w-4 h-4 text-blue-400 group-hover:text-blue-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm font-medium text-blue-300">Email</span>
                      </a>

                      <a
                        href={`tel:${baseInfo.phone}`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 hover:border-green-500/30 rounded-lg transition-all duration-300 group">
                        <svg
                          className="w-4 h-4 text-green-400 group-hover:text-green-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span className="text-sm font-medium text-green-300">Call</span>
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-16 lg:mt-20 text-center">
            <ScrollAnimation direction="up" delay={0.6}>
              <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20 rounded-2xl p-8 sm:p-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Ready to Start Your Project?
                </h3>
                <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
                  Let's discuss your ideas and turn them into reality. I'm always excited to work on
                  new challenges and innovative solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 gradient-button-primary rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Start a Conversation
                  </a>
                  <a
                    href="/projects"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    View My Work
                  </a>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error fetching contact information:', error);

    return (
      <ErrorHandle
        id={'contact'}
        title={'Contact Section'}
        description={'Failed to load contact information. Please try again later.'}
      />
    );
  }
}
