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
    <>
      {listLinks.map(({ id, text, link, customStyle, icon }) => (
        <a key={id} href={link} target="_blank" rel="noopener noreferrer" className={customStyle}>
          {icon && icon}
          {text}
        </a>
      ))}
    </>
  );
}
