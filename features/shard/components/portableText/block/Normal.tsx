import { IBlockNormal } from '@/features/shard/types/common';

export default function Normal({ children }: IBlockNormal) {
  return <p className="text-gray-300 leading-relaxed mb-4">{children}</p>;
}
