import { ILoaderProps } from '@/features/projects/types/project';
import { Loader2 } from 'lucide-react';

export default function Loader({ isLoading }: ILoaderProps) {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
        <p className="text-white text-sm font-medium">Loading video...</p>
      </div>
    </div>
  );
}
