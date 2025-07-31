import { IMarkEm } from '@/features/shard/types/common';

export default function Em({ children }: IMarkEm) {
  return <em className="italic text-gray-200">{children}</em>;
}
