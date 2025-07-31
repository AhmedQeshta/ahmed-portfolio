import { IBlockH6 } from '@/features/shard/types/common';

export default function Header6({ children }: IBlockH6) {
  return <h6 className="text-sm font-semibold text-white mb-1 mt-3">{children}</h6>;
}
