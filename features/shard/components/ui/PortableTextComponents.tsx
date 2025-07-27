import Image from 'next/image';
import { getImageUrl } from '@/sanity/lib/image';

// Shared PortableText components for consistent rich text rendering
export const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) return null;

      return (
        <div className="my-8 rounded-xl overflow-hidden border border-gray-700">
          <Image
            src={getImageUrl(value, 800, 600, 90)}
            alt={value.alt || 'Content image'}
            width={800}
            height={600}
            className="w-full h-auto object-cover"
            priority={false}
          />
          {value.alt && (
            <p className="text-center text-sm text-gray-400 p-3 bg-gray-800/50">{value.alt}</p>
          )}
        </div>
      );
    },
    codeBlock: ({ value }: any) => {
      if (!value?.code) return null;

      return (
        <div className="my-6 rounded-xl overflow-hidden border border-gray-700">
          <div className="bg-gray-800/80 px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
            <span className="font-medium">{value.language || 'Code'}</span>
          </div>
          <pre className="bg-gray-900/80 p-4 overflow-x-auto">
            <code className="text-sm text-gray-100 font-mono leading-relaxed whitespace-pre">
              {value.code}
            </code>
          </pre>
        </div>
      );
    },
  },
  block: {
    normal: ({ children }: any) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>,
    h1: ({ children }: any) => (
      <h1 className="text-3xl font-bold text-white mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-bold text-white mb-5 mt-7">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold text-white mb-4 mt-6">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-lg font-semibold text-white mb-3 mt-5">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-purple-500 pl-6 py-4 my-6 bg-gray-800/30 rounded-r-lg">
        <div className="text-gray-200 italic">{children}</div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4 ml-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="text-gray-300 leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="text-gray-300 leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-gray-200">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-gray-800 text-purple-300 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:text-blue-300 underline transition-colors">
        {children}
      </a>
    ),
  },
};
