import { IMarkCode } from '@/features/shard/types/common';

export default function Code({ children }: IMarkCode) {
  return (
    <code className="bg-gray-800 text-purple-300 px-2 py-1 rounded text-sm font-mono">
      {children}
    </code>
  );
}
