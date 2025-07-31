import { IBlockH3 } from '@/features/shard/types/common';

export default function Header3({ children }: IBlockH3) {
  return <h3 className="text-xl font-semibold text-white mb-4 mt-6">{children}</h3>;
}
