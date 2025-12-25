import { ITooltip } from '@/features/header/types/header';

export default function Tooltip({ name }: ITooltip) {
  return (
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
      <div className="bg-black/90 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl border border-white/10">
        {name}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-black/90 rotate-45 border-r border-b border-white/10" />
      </div>
    </div>
  );
}
