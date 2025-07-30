import { IMarkLinkProps } from '@/features/shard/types/common';

export default function Link({ children, value }: IMarkLinkProps) {
  return (
    <a
      href={value?.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-300 underline transition-colors">
      {children}
    </a>
  );
}
