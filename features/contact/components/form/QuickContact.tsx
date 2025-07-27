import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { IBaseInfo } from '@/features/contact/types/contact';

export default function QuickContact({ baseInfo }: IBaseInfo) {
  return (
    <ScrollAnimation direction="up" delay={0.6}>
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
            href={`https://api.whatsapp.com/send?phone=${baseInfo.phone}`}
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
    </ScrollAnimation>
  );
}
