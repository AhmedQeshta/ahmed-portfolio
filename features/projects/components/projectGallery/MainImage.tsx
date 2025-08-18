'use client';

import Image from 'next/image';
import { IMainImageProps } from '@/features/projects/types/project';
import { fileProcess } from '@/features/projects/utils/gallery';

import useVideo from '../../hooks/useVideo';
import CustomControls from './video/CustomControls';
import Loader from './video/Loader';
import Video from './video/Video';

export default function MainImage({ gallery, selectedImageIndex, title }: IMainImageProps) {
  const item = gallery[selectedImageIndex];
  const { isVideo, src } = fileProcess(item);
  const {
    videoRef,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    showControls,
    isLoading,
    handleMouseEnter,
    handleMouseLeave,
    togglePlay,
    handleProgressChange,
    handleVolumeChange,
    toggleMute,
    toggleFullscreen,
    restart,
    setIsPlaying,
  } = useVideo(selectedImageIndex);

  return (
    <div className="flex items-center justify-center min-h-[55vh] md:min-h-[65vh] lg:min-h-[75vh] max-h-[75vh] p-4 md:p-6">
      <div className="relative w-full h-full flex items-center justify-center">
        {isVideo ? (
          <div
            className="relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <Video videoRef={videoRef} src={src} setIsPlaying={setIsPlaying} />
            <Loader isLoading={isLoading} />
            <CustomControls
              showControls={showControls}
              isLoading={isLoading}
              isPlaying={isPlaying}
              currentTime={currentTime}
              duration={duration}
              volume={volume}
              isMuted={isMuted}
              togglePlay={togglePlay}
              handleProgressChange={handleProgressChange}
              handleVolumeChange={handleVolumeChange}
              toggleMute={toggleMute}
              toggleFullscreen={toggleFullscreen}
              restart={restart}
            />
          </div>
        ) : (
          <Image
            src={src}
            alt={`${title} gallery image ${selectedImageIndex + 1}`}
            width={1000}
            height={800}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            priority
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 70vw"
          />
        )}
      </div>
    </div>
  );
}
