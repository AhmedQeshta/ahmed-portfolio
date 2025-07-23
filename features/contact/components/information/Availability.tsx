import { IBaseInfo } from '@/features/contact/types/contact';

export default function Availability({ baseInfo }: IBaseInfo) {
  // const { availability } = baseInfo;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full mb-4">
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      <span className="text-sm font-medium text-green-300">Available for work</span>
    </div>
  );
}
