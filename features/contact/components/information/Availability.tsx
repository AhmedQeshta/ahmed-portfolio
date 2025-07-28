import { IBaseInfo } from '@/features/contact/types/contact';

export default function Availability({ baseInfo }: IBaseInfo) {
  const { availability } = baseInfo;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full mb-4">
      <div
        className={`w-2 h-2 ${availability.toLowerCase() === 'available' ? 'bg-green-400' : 'bg-red-400'} rounded-full animate-pulse`}
      />
      <span
        className={`text-sm font-medium ${availability.toLowerCase() === 'available' ? 'text-green-300' : 'text-red-300'}`}>
        {availability.toUpperCase()}
      </span>
    </div>
  );
}
