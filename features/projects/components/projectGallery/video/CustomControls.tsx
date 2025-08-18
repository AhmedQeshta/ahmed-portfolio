import { ICustomControlsProps } from '@/features/projects/types/project';
import { formatTime } from '@/features/projects/utils/gallery';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';

export default function CustomControls({
  showControls,
  isLoading,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  togglePlay,
  handleProgressChange,
  handleVolumeChange,
  toggleMute,
  toggleFullscreen,
  restart,
}: ICustomControlsProps) {
  if (!showControls || isLoading) return null;
  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 rounded-b-lg">
        {/* Progress Bar */}
        <div className="mb-3">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) 100%)`,
            }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="text-white hover:text-purple-400 transition-colors duration-200 p-1 rounded-md hover:bg-white/10">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            {/* Restart */}
            <button
              onClick={restart}
              className="text-white hover:text-purple-400 transition-colors duration-200 p-1 rounded-md hover:bg-white/10">
              <RotateCcw size={18} />
            </button>

            {/* Time Display */}
            <span className="text-white text-sm font-medium min-w-[80px]">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-white hover:text-purple-400 transition-colors duration-200 p-1 rounded-md hover:bg-white/10">
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.3) 100%)`,
                }}
              />
            </div>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-purple-400 transition-colors duration-200 p-1 rounded-md hover:bg-white/10">
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
