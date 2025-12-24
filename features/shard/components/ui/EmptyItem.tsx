import { EmptyItemProps } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function EmptyItem({ title, subTitle, icon = null }: EmptyItemProps) {
  const { isDark } = useTheme();

  return (
    <div className="text-center py-16">
      <div className="text-center py-16">
        <div
          className={`
          backdrop-blur-md border rounded-2xl p-8 max-w-md mx-auto transition-all duration-300
          ${isDark ? 'bg-card-bg border-white/10' : 'bg-white/80 border-gray-200 shadow-lg'}
        `}>
          {icon && (
            <div
              className={`
              text-6xl mb-4 transition-all duration-300
              ${isDark ? 'opacity-90' : 'opacity-80'}
            `}>
              {icon}
            </div>
          )}
          <h3
            className={`
            text-xl font-semibold mb-2 transition-colors duration-300
            ${isDark ? 'text-white' : 'text-gray-900'}
          `}>
            {title}
          </h3>
          <p
            className={`
            transition-colors duration-300
            ${isDark ? 'text-text-secondary' : 'text-gray-600'}
          `}>
            {subTitle}
          </p>
        </div>
      </div>
    </div>
  );
}
