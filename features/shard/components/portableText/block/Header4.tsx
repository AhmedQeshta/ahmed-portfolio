import { IBlockH4 } from '@/features/shard/types/common';

export default function Header4({ children }: IBlockH4) {
  return <h4 className="text-lg font-semibold text-white mb-3 mt-5">{children}</h4>;
}
