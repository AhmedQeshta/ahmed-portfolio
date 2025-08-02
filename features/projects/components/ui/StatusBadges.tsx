import { IStatusBadgesProps } from '@/features/projects/types/project';

export default function StatusBadges({ liveUrl, repoUrl }: IStatusBadgesProps) {
  if (!liveUrl && !repoUrl) return null;

  return (
    <div className="absolute top-3 left-3 flex gap-2">
      {liveUrl && (
        <div className="bg-green-500/90 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-white text-xs font-medium">Live</span>
        </div>
      )}
      {repoUrl && (
        <div className="bg-blue-500/90 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-white text-xs font-medium">Open Source</span>
        </div>
      )}
    </div>
  );
}
