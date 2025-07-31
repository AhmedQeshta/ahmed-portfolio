import { IMarkStrong } from '@/features/shard/types/common';

export default function Strong({ children }: IMarkStrong) {
  return <strong className="font-semibold text-white">{children}</strong>;
}
