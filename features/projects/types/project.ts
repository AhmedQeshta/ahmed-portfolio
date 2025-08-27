import { ProjectGalleryItem, ProjectResponse } from '@/sanity/lib/types';

export interface IProjectLayout {
  readonly children: React.ReactNode;
  readonly modal: React.ReactNode;
}

export interface IProjectPage {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export interface IProjectPageModal {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export interface IProjectGrid {
  readMore?: boolean;
  query?: string;
}

export interface IProjectResponse {
  project: ProjectResponse;
}
export interface ICardProps {
  project: ProjectResponse;
}

export interface IProjectCardProps {
  projects: ProjectResponse[];
  readMore: boolean;
}

export interface IProjectGalleryProps {
  project: ProjectResponse;
  openModal: (index: number) => void;
}

export interface IGallery {
  gallery: Array<string | { type: 'image' | 'video'; url: string }>;
}
export interface IThumbnailNav extends IGallery {
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;
}

export interface IImageTitleProps {
  title: string;
  selectedImageIndex: number;
  galleryLength: number;
}

export interface IMainImageProps extends IGallery {
  selectedImageIndex: number;
  title: string;
}

export interface IButtonsNavProps {
  goToPrevious: () => void;
  goToNext: () => void;
  galleryLength: number;
}

export interface IFile {
  file: string | { type: 'image' | 'video'; url: string };
}

export interface IGalleryItemProps extends IFile {
  title: string;
  index: number;
  openModal: (index: number) => void;
}

export interface IGalleriesProps extends IGallery {
  title: string;
  openModal: (index: number) => void;
}

export interface IDurationProps {
  startDate?: string;
  endDate?: string;
}

export interface IStatusBadgesProps {
  liveUrl?: string;
  repoUrl?: string;
}

export interface IImagePreviewProps extends IGallery {
  selectedImageIndex: number | null;
  setSelectedImageIndex: (index: number) => void;
  closeModal: () => void;
  goToPrevious: () => void;
  goToNext: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  title: string;
}

export interface IVideoProps {
  videoRef: any;
  src: string;
  setIsPlaying: (isPlaying: boolean) => void;
}

export interface ILoaderProps {
  isLoading: boolean;
}

export interface ICustomControlsProps {
  showControls: boolean;
  isLoading: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  togglePlay: () => void;
  handleProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
  restart: () => void;
}
