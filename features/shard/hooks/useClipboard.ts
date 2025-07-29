import { useState } from 'react';

// Enhanced clipboard functionality with error handling and fallbacks
export const useClipboard = () => {
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
