import { IVideoProps } from '@/features/projects/types/project';

export default function Video({ videoRef, src, setIsPlaying }: IVideoProps) {
  return (
    <video
      ref={videoRef}
      src={src}
      className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
      playsInline
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
    />
  );
}
