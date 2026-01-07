import { useEffect, useState, useCallback } from 'react';

// Declare grecaptcha type for TypeScript
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

/**
 * Custom hook to handle Google reCAPTCHA v3
 * Loads the reCAPTCHA script and provides execute function
 */
export function useRecaptcha() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  // Load reCAPTCHA script
  useEffect(() => {
    if (!siteKey) {
      console.warn('reCAPTCHA site key is not configured');
      return;
    }

    // Check if script is already loaded
    if (window.grecaptcha) {
      setIsLoaded(true);
      setIsReady(true);
      return;
    }

    // Check if script tag already exists
    const existingScript = document.querySelector('script[src*="recaptcha"]');
    if (existingScript) {
      // Wait for script to load
      const checkReady = setInterval(() => {
        if (window.grecaptcha) {
          setIsLoaded(true);
          setIsReady(true);
          clearInterval(checkReady);
        }
      }, 100);
      return () => clearInterval(checkReady);
    }

    // Create and load script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsLoaded(true);
      // Wait for grecaptcha to be ready
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setIsReady(true);
        });
      }
    };
    script.onerror = () => {
      console.error('Failed to load reCAPTCHA script');
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script if component unmounts
      // Note: We don't remove it in practice as it's shared across the app
    };
  }, [siteKey]);

  /**
   * Execute reCAPTCHA v3 and return the token
   * @param action - The action name for reCAPTCHA (default: "contact_submit")
   * @returns Promise<string> - The reCAPTCHA token
   */
  const executeRecaptcha = useCallback(
    async (action: string = 'contact_submit'): Promise<string | null> => {
      if (!siteKey) {
        console.warn('reCAPTCHA site key is not configured');
        return null;
      }

      if (!isReady || !window.grecaptcha) {
        console.warn('reCAPTCHA is not ready yet');
        return null;
      }

      try {
        const token = await window.grecaptcha.execute(siteKey, { action });
        return token;
      } catch (error) {
        console.error('reCAPTCHA execution error:', error);
        return null;
      }
    },
    [siteKey, isReady],
  );

  return {
    isReady,
    executeRecaptcha,
  };
}
