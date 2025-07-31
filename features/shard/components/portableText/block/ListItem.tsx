import { IListBullet, IListNumber } from '@/features/shard/types/common';

export default function ListItem({ children }: IListBullet | IListNumber) {
  return <li className="text-gray-300 leading-relaxed">{children}</li>;
}
