import { ReactNode } from 'react';

export default function renderTextWithLinks(messageText: string): ReactNode[] {
  const urlPattern = /https?:\/\/[^\s]+/g;
  const renderedNodes: ReactNode[] = [];

  let lastProcessedIndex = 0;
  const allMatches = messageText.matchAll(urlPattern);

  for (const match of allMatches) {
    if (!match.index && match.index !== 0) continue;

    const matchStartIndex = match.index;
    const matchedWithPunctuation = match[0];

    if (matchStartIndex > lastProcessedIndex) {
      renderedNodes.push(messageText.slice(lastProcessedIndex, matchStartIndex));
    }

    let cleanedUrl = matchedWithPunctuation;
    let trailingPunctuation = '';

    while (/[.,!?)]$/.test(cleanedUrl)) {
      trailingPunctuation = cleanedUrl.slice(-1) + trailingPunctuation;
      cleanedUrl = cleanedUrl.slice(0, -1);
    }

    const lowerCaseUrl = cleanedUrl.toLowerCase();
    const isCvLike =
      lowerCaseUrl.includes('cv') ||
      lowerCaseUrl.includes('resume') ||
      lowerCaseUrl.endsWith('.pdf');
    const anchorText = isCvLike ? 'CV' : cleanedUrl;

    renderedNodes.push(
      <a
        key={`link-${matchStartIndex}`}
        href={cleanedUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 font-semibold text-blue-300 hover:text-blue-200 underline underline-offset-4 decoration-blue-300 hover:decoration-blue-200 break-words transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/40 rounded-sm">
        {anchorText}
      </a>,
    );

    if (trailingPunctuation) {
      renderedNodes.push(trailingPunctuation);
    }

    lastProcessedIndex = matchStartIndex + matchedWithPunctuation.length;
  }

  if (lastProcessedIndex < messageText.length) {
    renderedNodes.push(messageText.slice(lastProcessedIndex));
  }

  return renderedNodes;
}
