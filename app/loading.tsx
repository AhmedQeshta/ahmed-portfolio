import LoadingSpinner from '@/features/shard/components/ui/LoadingSpinner';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-300 text-lg">Loading...</p>
      </div>
    </div>
  );
}
