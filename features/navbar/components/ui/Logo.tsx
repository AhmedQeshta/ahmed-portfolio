import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex-shrink-0">
      <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent font-bold uppercase text-xl sm:text-2xl hover:scale-105 transition-transform duration-200">
        Ahmed Qeshta
      </span>
    </Link>
  );
}
