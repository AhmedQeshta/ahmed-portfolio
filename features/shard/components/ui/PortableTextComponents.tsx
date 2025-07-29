import Image from 'next/image';
import { useState } from 'react';
import {
  IBlockH1,
  IBlockH2,
  IBlockH3,
  IBlockH4,
  IBlockNormal,
  IBlockQuote,
  ICodeBlock,
  IListBullet,
  IListNumber,
  IMarkCode,
  IMarkEm,
  IMarkLinkProps,
  IMarkStrong,
  IPortableTextComponents,
} from '@/features/shard/types/common';
import { getDimensions } from '@/features/shard/utils/portableText';

// Enhanced clipboard functionality with error handling and fallbacks
const useClipboard = () => {
  const [copyStatus, setCopyStatus] = useState<{
    status: 'idle' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: 'Copy' });

  const copyToClipboard = async (text: string) => {
    try {
      // Modern Clipboard API (preferred method)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopyStatus({ status: 'success', message: 'Copied!' });
      } else {
        // Fallback for older browsers or non-secure contexts
        await fallbackCopyToClipboard(text);
        setCopyStatus({ status: 'success', message: 'Copied!' });
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setCopyStatus({
        status: 'error',
        message: 'Copy failed',
      });
    }

    // Reset status after 2 seconds
    setTimeout(() => {
      setCopyStatus({ status: 'idle', message: 'Copy' });
    }, 2000);
  };

  // Fallback method for browsers without Clipboard API support
  const fallbackCopyToClipboard = (text: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      textArea.setAttribute('aria-hidden', 'true');

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);

        if (successful) {
          resolve();
        } else {
          reject(new Error('execCommand copy failed'));
        }
      } catch (error) {
        document.body.removeChild(textArea);
        reject(error);
      }
    });
  };

  return { copyToClipboard, copyStatus };
};

// Enhanced CodeBlock component with improved clipboard functionality
const CodeBlock = ({ value }: ICodeBlock) => {
  const { copyToClipboard, copyStatus } = useClipboard();

  if (!value?.code) return null;

  const handleCopy = () => {
    copyToClipboard(value.code);

    // Announce to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent =
      copyStatus.status === 'success'
        ? 'Code copied to clipboard successfully'
        : 'Failed to copy code to clipboard';

    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  const getButtonStyles = () => {
    const baseStyles =
      'transition-all duration-200 text-xs px-3 py-1 rounded font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900';

    switch (copyStatus.status) {
      case 'success':
        return `${baseStyles} bg-green-600 text-white hover:bg-green-700`;
      case 'error':
        return `${baseStyles} bg-red-600 text-white hover:bg-red-700`;
      default:
        return `${baseStyles} text-gray-400 hover:text-white bg-gray-700/50 hover:bg-gray-600/50`;
    }
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-gray-700 bg-gray-900/80">
      <div className="bg-gray-800/80 px-4 py-2 text-sm text-gray-300 border-b border-gray-700 flex items-center justify-between">
        <span className="font-medium">{value.language || 'Code'}</span>
        <button
          className={getButtonStyles()}
          onClick={handleCopy}
          disabled={copyStatus.status !== 'idle'}
          aria-label={`Copy ${value.language || 'code'} to clipboard. ${copyStatus.message}`}
          aria-describedby="copy-status">
          {copyStatus.message}
        </button>
      </div>
      <pre className="bg-gray-900/80 p-4 overflow-x-auto">
        <code className="text-sm text-gray-100 font-mono leading-relaxed whitespace-pre">
          {value.code}
        </code>
      </pre>
      {/* Hidden status for screen readers */}
      <div id="copy-status" className="sr-only" aria-live="polite">
        {copyStatus.status === 'success' && 'Code has been copied to clipboard'}
        {copyStatus.status === 'error' &&
          'Failed to copy code to clipboard. You may need to copy manually.'}
      </div>
    </div>
  );
};

// Shared PortableText components for consistent rich text rendering
export const portableTextComponents = {
  types: {
    image: ({ value }: IPortableTextComponents) => {
      if (!value?.asset) return null;

      const { width, height, aspectRatio, imageUrl, blurDataURL } = getDimensions(value);

      return (
        <div
          className="my-8 rounded-xl overflow-hidden border border-gray-700 bg-gray-800/20"
          style={{ aspectRatio: aspectRatio.toString() }}>
          <Image
            src={imageUrl}
            alt={value.alt || 'Content image'}
            width={width}
            height={height}
            className="w-full h-full object-cover transition-opacity duration-300"
            style={{ aspectRatio: aspectRatio.toString() }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
            quality={90}
            placeholder={blurDataURL ? 'blur' : 'empty'}
            blurDataURL={blurDataURL}
            loading="lazy"
          />
          {value.alt && (
            <div className="text-center text-sm text-gray-400 p-3 bg-gray-800/50">
              <span className="sr-only">Image description: </span>
              {value.alt}
            </div>
          )}
        </div>
      );
    },
    codeBlock: CodeBlock,
  },
  block: {
    h1: ({ children }: IBlockH1) => (
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 mt-8 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: IBlockH2) => (
      <h2 className="text-3xl md:text-4xl font-semibold text-white mb-5 mt-7 leading-snug">
        {children}
      </h2>
    ),
    h3: ({ children }: IBlockH3) => (
      <h3 className="text-2xl md:text-3xl font-semibold text-gray-100 mb-4 mt-6 leading-snug">
        {children}
      </h3>
    ),
    h4: ({ children }: IBlockH4) => (
      <h4 className="text-xl md:text-2xl font-medium text-gray-100 mb-3 mt-5">{children}</h4>
    ),
    normal: ({ children }: IBlockNormal) => (
      <p className="text-gray-300 mb-4 leading-relaxed text-base md:text-lg">{children}</p>
    ),
    blockquote: ({ children }: IBlockQuote) => (
      <blockquote className="border-l-4 border-purple-500 pl-6 my-6 italic text-gray-200 bg-gray-800/30 py-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: IListBullet) => (
      <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2 ml-4">{children}</ul>
    ),
    number: ({ children }: IListNumber) => (
      <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2 ml-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li className="text-gray-300 leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="text-gray-300 leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }: IMarkStrong) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }: IMarkEm) => <em className="italic text-gray-200">{children}</em>,
    code: ({ children }: IMarkCode) => (
      <code className="bg-gray-800 text-purple-300 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: IMarkLinkProps) => {
      const isExternal = value?.href?.startsWith('http');
      return (
        <a
          href={value?.href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-blue-400 hover:text-blue-300 underline transition-colors"
          aria-label={isExternal ? `${children} (opens in new tab)` : undefined}>
          {children}
          {isExternal && (
            <span className="inline-block ml-1" aria-hidden="true">
              ↗
            </span>
          )}
        </a>
      );
    },
  },
};
