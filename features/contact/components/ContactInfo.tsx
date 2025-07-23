import { BaseInfoResponse } from '@/sanity/lib/types';
import { getImageUrl } from '@/sanity/lib/image';
import Image from 'next/image';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';

interface IContactInfo {
  baseInfo: BaseInfoResponse;
}

export default function ContactInfo({ baseInfo }: IContactInfo) {
  // Fix the email/phone mix-up
  const { email, phone, address, profilePicture, name } = baseInfo;
  

  return (
    <div className="h-full flex flex-col">
      {/* Profile Section */}
      <ScrollAnimation direction="down" delay={0.1}>
        <div className="text-center mb-8">
          {/* Profile Image */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 relative rounded-full overflow-hidden border-2 border-purple-500/30 shadow-2xl mx-auto group">
            {profilePicture ? (
              <Image
                src={getImageUrl(profilePicture, 200, 200)}
                alt={name || 'Profile'}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <Image
                src="/images/apple-icon-180x180.png"
                alt="Profile"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Online Status Indicator */}
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full">
              <div className="w-full h-full bg-green-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Availability Status */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full mb-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-green-300">Available for work</span>
          </div>
        </div>
      </ScrollAnimation>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Headline */}
        <ScrollAnimation direction="down" delay={0.2}>
          <div className="mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-tight">
              Let's Build Something
              <span className="gradient-text block">Extraordinary Together</span>
            </h3>
            <p className="text-text-secondary leading-relaxed">
              I'm passionate about creating digital experiences that make a difference. Whether
              you're looking to collaborate on a project or need a dedicated developer for your
              team, I'd love to hear from you.
            </p>
          </div>
        </ScrollAnimation>

        {/* Contact Methods Grid */}
        <ScrollAnimation direction="down" delay={0.3}>
          <div className="space-y-4 mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>

            {/* Email Contact */}
            <a
              href={`mailto:${email}`}
              className="group flex items-center gap-4 p-4 bg-gradient-to-r from-blue-500/5 to-blue-600/5 hover:from-blue-500/10 hover:to-blue-600/10 border border-blue-500/20 hover:border-blue-500/40 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02]">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <svg
                  className="w-6 h-6 text-blue-400 group-hover:text-blue-300"
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
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-white font-medium group-hover:text-blue-300 transition-colors">
                  Email
                </h5>
                <p className="text-text-secondary text-sm truncate group-hover:text-blue-200">
                  {email}
                </p>
              </div>
              <svg
                className="w-5 h-5 text-blue-400 group-hover:text-blue-300 group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>

            {/* Phone Contact */}
            <a
              href={`tel:${phone}`}
              className="group flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/5 to-green-600/5 hover:from-green-500/10 hover:to-green-600/10 border border-green-500/20 hover:border-green-500/40 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02]">
              <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <svg
                  className="w-6 h-6 text-green-400 group-hover:text-green-300"
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
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-white font-medium group-hover:text-green-300 transition-colors">
                  Phone
                </h5>
                <p className="text-text-secondary text-sm group-hover:text-green-200">{phone}</p>
              </div>
              <svg
                className="w-5 h-5 text-green-400 group-hover:text-green-300 group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>

            {/* Location Info */}
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-amber-500/5 to-amber-600/5 border border-amber-500/20 rounded-xl">
              <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-white font-medium">Location</h5>
                <p className="text-text-secondary text-sm">{address}</p>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Response Time Info */}
        <ScrollAnimation direction="down" delay={0.4}>
          <div className="mt-auto">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-purple-300">Quick Response</span>
              </div>
              <p className="text-text-secondary text-sm">
                I typically respond within 24 hours. For urgent matters, feel free to call directly.
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}
