import { IBlockH5 } from '@/features/shard/types/common';

export default function Header5({ children }: IBlockH5) {
  return <h5 className="text-base font-semibold text-white mb-2 mt-4">{children}</h5>;
}
