import ButtonCopy from '@/features/shard/components/portableText/ButtonCopy';
import { ICodeBlock } from '@/features/shard/types/common';
import { getLanguageColor } from '@/features/shard/utils/statusColor';

export default function CodeBlock({ value }: ICodeBlock) {
  if (!value?.code) return null;

  const languageColors = getLanguageColor(value.language || '');

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-gray-700 relative group">
      <div className="bg-gray-800/80 px-4 py-2 text-sm text-gray-300 border-b border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className={`font-medium px-2 py-1 rounded-md text-xs border ${languageColors}`}>
            {value.language || 'Code'}
          </span>
        </div>
        <ButtonCopy value={value} />
      </div>
      <pre className="bg-gray-900/80 p-4 overflow-x-auto max-h-[600px] overflow-y-auto">
        <code className="text-sm text-gray-100 font-mono leading-relaxed whitespace-pre">
          {value.code}
        </code>
      </pre>
    </div>
  );
}
