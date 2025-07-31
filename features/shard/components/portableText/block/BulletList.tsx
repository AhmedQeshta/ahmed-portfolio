import { IListBullet } from '@/features/shard/types/common';

export default function BulletList({ children }: IListBullet) {
  return <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4 ml-4">{children}</ul>;
}
