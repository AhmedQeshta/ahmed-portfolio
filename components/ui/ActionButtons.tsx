'use client';
import { cn } from '@/utils/statusColor';
import ScrollAnimation from './ScrollAnimation';

interface listLinks {
  id?: number;
  text?: string;
  link?: string;
  customStyle?: string;
  icon?: string | React.ReactNode;
}
interface ActionButtonsProps {
  listLinks: listLinks[];
}

export default function ActionButtons({ listLinks }: ActionButtonsProps) {
  if (!listLinks) return null;

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, link?: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <ScrollAnimation direction="down" delay={0.4} className="flex gap-4">
      {listLinks.map(({ id, text, link, customStyle, icon }) => (
        <button
          key={id}
          onClick={(e) => handleButtonClick(e, link)}
          className={cn(customStyle, 'flex items-center gap-2')}>
          {icon && icon}
          {text}
        </button>
      ))}
    </ScrollAnimation>
  );
}
