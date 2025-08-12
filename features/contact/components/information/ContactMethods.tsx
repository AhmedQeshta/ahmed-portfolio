import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { IBaseInfo } from '@/features/contact/types/contact';

export default function ContactMethods({ baseInfo }: IBaseInfo) {
  const { email, phone, address, cvUrl } = baseInfo;
  return (
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>

        {/* Phone Contact */}
        <a
          href={`https://api.whatsapp.com/send?phone=${phone}`}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>

        {/* Download CV */}
        {cvUrl && (
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-4 bg-gradient-to-r from-purple-500/5 to-purple-600/5 hover:from-purple-500/10 hover:to-purple-600/10 border border-purple-500/20 hover:border-purple-500/40 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02]">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
              <svg
                className="w-6 h-6 text-purple-400 group-hover:text-purple-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v12m0 0l-3-3m3 3l3-3M4 20h16"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-white font-medium group-hover:text-purple-300 transition-colors">
                Download CV
              </h5>
              <p className="text-text-secondary text-sm truncate group-hover:text-purple-200">
                PDF format
              </p>
            </div>
            <svg
              className="w-5 h-5 text-purple-400 group-hover:text-purple-300 group-hover:translate-x-1 transition-all duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}

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
  );
}
