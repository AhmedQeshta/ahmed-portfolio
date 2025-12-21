'use client';

import { Share2, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';
import { useState } from 'react';
import { IShareCard } from '@/features/shard/types/common';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function ShareCard({
  url = '',
  title = '',
  heading = 'Share This Post',
}: IShareCard) {
  const [copied, setCopied] = useState(false);
  const { isDark } = useTheme();

  const handleShare = async (platform: 'twitter' | 'linkedin') => {
    const shareUrl = url || window.location.href;
    const shareTitle = title || document.title;

    if (platform === 'twitter') {
      const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl,
      )}&text=${encodeURIComponent(shareTitle)}`;
      window.open(twitterUrl, '_blank');
    } else if (platform === 'linkedin') {
      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl,
      )}`;
      window.open(linkedinUrl, '_blank');
    }
  };

  const handleCopyLink = async () => {
    const shareUrl = url || window.location.href;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <ScrollAnimation direction="up" delay={0.2}>
      <div
        className={`${
          isDark
            ? 'bg-gray-900/50 backdrop-blur-sm border border-gray-800'
            : 'bg-white/80 backdrop-blur-sm border border-gray-200'
        } rounded-xl p-6`}
        data-testid="share-card">
        <h3
          className={`flex items-center gap-3 text-lg font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
          <Share2 size={20} className="text-blue-400" />
          {heading}
        </h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleShare('twitter')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm">
            <Twitter size={16} />
            Share on Twitter
          </button>
          <button
            onClick={() => handleShare('linkedin')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg transition-colors text-sm">
            <Linkedin size={16} />
            Share on LinkedIn
          </button>
          <button
            onClick={handleCopyLink}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm ${
              isDark
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}>
            <LinkIcon size={16} />
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </ScrollAnimation>
  );
}
