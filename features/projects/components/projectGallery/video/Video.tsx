import { useEffect } from 'react';
import { IVideoProps } from '@/features/projects/types/project';

export default function Video({ videoRef, src, setIsPlaying }: IVideoProps) {
  // Update video source when it changes
  useEffect(() => {
    const video = videoRef.current;
    if (video && src) {
      video.src = src;
      video.load();
    }
  }, [src, videoRef]);

  return (
    <video
      ref={videoRef}
      className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
      playsInline
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
    />
  );
}
