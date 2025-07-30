import { IListNumber } from '@/features/shard/types/common';

export default function NumberList({ children }: IListNumber) {
  return <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4 ml-4">{children}</ol>;
}
