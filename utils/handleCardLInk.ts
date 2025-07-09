import { useRouter } from 'next/navigation';

interface IHandleCardClick {
  link: string;
  router: ReturnType<typeof useRouter>;
  event: React.MouseEvent;
}

export const handleCardClick = ({ link, router, event }: IHandleCardClick) => {
  // Don't navigate if clicking on a link or button
  const target = event.target as HTMLElement;
  if (target.tagName === 'A' || target.closest('a') || target.tagName === 'BUTTON') {
    return;
  }
  router.push(link);
};
