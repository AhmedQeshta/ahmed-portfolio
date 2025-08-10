import Icon from '@/features/offline/components/Icon';
import Content from '@/features/offline/components/Content';
import Actions from '@/features/offline/components/Actions';
import Info from '@/features/offline/components/Info';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        {/* Icon */}
        <Icon />
        {/* Content */}
        <Content />

        {/* Actions */}
        <Actions />

        {/* Info */}
        <Info />
      </div>
    </div>
  );
}
