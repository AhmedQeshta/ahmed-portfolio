import Link from 'next/link';
import { OptimizedLinkProps } from '@/features/shard/types/common';

export default function OptimizedLink({
  href,
  children,
  className,
  prefetch = true,
  scroll = true,
  replace = false,
  shallow = false,
  passHref = false,
  legacyBehavior = false,
  onClick,
  ...props
}: OptimizedLinkProps) {
  // Check if it's an external link
  const isExternal =
    href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:');

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
        {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      prefetch={prefetch}
      scroll={scroll}
      replace={replace}
      shallow={shallow}
      passHref={passHref}
      legacyBehavior={legacyBehavior}
      onClick={onClick}
      {...props}>
      {children}
    </Link>
  );
}
