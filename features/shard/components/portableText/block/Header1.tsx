import { IBlockH1 } from '@/features/shard/types/common';

export default function Header1({ children }: IBlockH1) {
  return <h1 className="text-3xl font-bold text-white mb-6 mt-8">{children}</h1>;
}
