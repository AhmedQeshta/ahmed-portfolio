import { WifiOff } from 'lucide-react';

export default function Icon() {
  return (
    <div className="mb-8 flex justify-center">
      <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
        <WifiOff className="w-10 h-10 text-red-400" />
      </div>
    </div>
  );
}
