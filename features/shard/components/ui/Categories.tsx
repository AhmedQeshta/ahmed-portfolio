import ScrollAnimation from './ScrollAnimation';

interface ICategory {
  _id: string;
  name: string;
  slug?: string;
}

interface ICategoriesProps {
  categories: ICategory[];
  className?: string;
  delay?: number;
}

export default function Categories({ categories, className = '', delay = 0.3 }: ICategoriesProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <ScrollAnimation direction="down" delay={delay} className={`flex flex-wrap gap-2 ${className}`}>
      {categories.map(({ _id, name }, index) => (
        <ScrollAnimation
          key={`${_id}-${index}`}
          direction="down"
          delay={delay + 0.1 + index * 0.05}
          className="px-3 py-1 bg-purple-600/80 text-white text-sm rounded-full backdrop-blur-sm hover:bg-purple-500/90 transition-colors">
          {name}
        </ScrollAnimation>
      ))}
    </ScrollAnimation>
  );
}
