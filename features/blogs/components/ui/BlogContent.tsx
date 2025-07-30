'use client';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { IBlogPostResponse } from '@/features/blogs/types/blog';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { portableTextComponents } from '@/features/shard/components/ui/PortableTextComponents';
import useMobile from '@/features/shard/hooks/useMobile';

export default function BlogContent({ blog }: IBlogPostResponse) {
  const isMobile = useMobile();
  if (!blog) return null;
  const { content } = blog;

  // Handle empty or invalid content
  if (!content || (Array.isArray(content) && content.length === 0)) {
    return null;
  }

  return (
    <ScrollAnimation
      direction="down"
      delay={0.4}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8 mb-8">
      <ScrollAnimation
        direction="down"
        delay={0.5}
        className="prose prose-invert prose-lg max-w-none">
        <PortableText
          value={content}
          components={portableTextComponents as unknown as PortableTextComponents}
        />
      </ScrollAnimation>
    </ScrollAnimation>
  );
}
