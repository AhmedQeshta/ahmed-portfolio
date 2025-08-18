export function fileProcess(file: string | { type: 'image' | 'video'; url: string }) {
  const isVideo = typeof file !== 'string' && file.type === 'video';
  const src = typeof file === 'string' ? file : file.url;

  return { isVideo, src };
}

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
