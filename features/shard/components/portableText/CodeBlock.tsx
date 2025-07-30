import { ICodeBlock } from '@/features/shard/types/common';

export default function CodeBlock({ value }: ICodeBlock) {
  if (!value?.code) return null;
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-gray-700">
      <div className="bg-gray-800/80 px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
        <span className="font-medium">{value.language || 'Code'}</span>
      </div>
      <pre className="bg-gray-900/80 p-4 overflow-x-auto">
        <code className="text-sm text-gray-100 font-mono leading-relaxed whitespace-pre">
          {value.code}
        </code>
      </pre>
    </div>
  );
}
