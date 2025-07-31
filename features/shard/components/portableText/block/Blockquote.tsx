import { IBlockQuote } from '@/features/shard/types/common';

export default function Blockquote({ children }: IBlockQuote) {
  return (
    <blockquote className="border-l-4 border-purple-500 pl-6 py-4 my-6 bg-gray-800/30 rounded-r-lg">
      <div className="text-gray-200 italic">{children}</div>
    </blockquote>
  );
}
