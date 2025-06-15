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

  return (
    <ScrollAnimation direction="down" delay={0.4} className="flex gap-4">
      {listLinks.map(({ id, text, link, customStyle, icon }) => (
        <a
          key={id}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(customStyle, 'flex items-center gap-2')}>
          {icon && icon}
          {text}
        </a>
      ))}
    </ScrollAnimation>
  );
}
