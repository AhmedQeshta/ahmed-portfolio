import ScrollAnimation from '@/components/ui/ScrollAnimation';
import { IBlogPostResponse } from '@/utils/types/blog';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';

export default function BlogContent({ blog }: IBlogPostResponse) {
  if (!blog) return null;
  const { content } = blog;
  //  make it
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
          components={{
            block: {
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-white mb-6 mt-8">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-white mb-4 mt-6">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold text-white mb-3 mt-5">{children}</h3>
              ),
              normal: ({ children }) => (
                <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-purple-500 pl-6 my-6 italic text-gray-400">
                  {children}
                </blockquote>
              ),
            },
            marks: {
              strong: ({ children }) => (
                <strong className="text-white font-semibold">{children}</strong>
              ),
              em: ({ children }) => <em className="text-purple-300">{children}</em>,
              code: ({ children }) => (
                <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm font-mono">
                  {children}
                </code>
              ),
            },
            types: {
              image: ({ value }) => (
                <div className="my-8">
                  <Image
                    src={value.asset.url}
                    alt={value.alt || ''}
                    width={800}
                    height={400}
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              ),
              codeBlock: ({ value }) => (
                <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto my-6">
                  <code className={`language-${value.language} text-green-400 text-sm`}>
                    {value.code}
                  </code>
                </pre>
              ),
            },
          }}
        />
      </ScrollAnimation>
    </ScrollAnimation>
  );
}
