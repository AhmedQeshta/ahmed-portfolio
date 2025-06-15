'use client';

import { Share2, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import ScrollAnimation from './ScrollAnimation';
import { useState } from 'react';

interface ShareCardProps {
  url?: string;
  title?: string;
}

export default function ShareCard({ url = '', title = '' }: ShareCardProps) {
  const [copied, setCopied] = useState(false);

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
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
        <h3 className="flex items-center gap-3 text-lg font-bold text-white mb-4">
          <Share2 size={20} className="text-blue-400" />
          Share This Post
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
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm">
            <LinkIcon size={16} />
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </ScrollAnimation>
  );
}
