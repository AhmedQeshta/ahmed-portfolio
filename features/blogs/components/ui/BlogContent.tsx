'use client';

import { PortableText, PortableTextComponents } from '@portabletext/react';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { IBlogPostResponse } from '@/features/blogs/types/blog';
import { portableTextComponents } from '@/features/shard/components/ui/PortableTextComponents';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function BlogContent({ blog }: IBlogPostResponse) {
  if (!blog) return null;
  const { isDark } = useTheme();

  const { content } = blog;

  if (!content || (Array.isArray(content) && content.length === 0)) return null;

  return (
    <ScrollAnimation
      direction="down"
      delay={0.4}
      className={`${
        isDark
          ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
          : 'bg-white/80 backdrop-blur-sm border border-gray-200'
      } rounded-xl p-8 mb-8`}>
      <div
        className={`prose prose-lg max-w-none text-justify ${
          isDark ? 'prose-invert' : 'prose-gray'
        }`}>
        <PortableText
          value={content}
          components={portableTextComponents as unknown as PortableTextComponents}
        />
      </div>
    </ScrollAnimation>
  );
}
