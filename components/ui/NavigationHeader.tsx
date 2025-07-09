import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface INavigationHeader {
  link: string;
  text: string;
}

export default function NavigationHeader({ link, text }: INavigationHeader) {
  //
  return (
    <div className="relative z-10 p-6" data-testid="navigation-header">
      <Link
        href={link}
        className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        {text}
      </Link>
    </div>
  );
}
