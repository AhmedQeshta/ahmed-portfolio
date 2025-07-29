'use client';
import { useClipboard } from '@/features/shard/hooks/useClipboard';
import { ICodeBlock } from '@/features/shard/types/common';

// Enhanced CodeBlock component with improved clipboard functionality
export default function CodeBlock({ value }: ICodeBlock) {
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
}
