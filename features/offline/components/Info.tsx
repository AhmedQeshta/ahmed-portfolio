import { WifiOff } from 'lucide-react';

export default function Info() {
  return (
    <div className="text-sm text-gray-500 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
      <p className="flex items-center justify-center">
        <WifiOff className="w-4 h-4 mr-2 text-gray-400" />
        Some features may not be available while offline
      </p>
    </div>
  );
}
