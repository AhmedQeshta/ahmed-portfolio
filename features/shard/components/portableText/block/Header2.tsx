import { IBlockH2 } from '@/features/shard/types/common';

export default function Header2({ children }: IBlockH2) {
  return <h2 className="text-2xl font-bold text-white mb-5 mt-7">{children}</h2>;
}
