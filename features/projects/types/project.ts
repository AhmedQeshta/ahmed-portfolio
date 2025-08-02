import { ProjectResponse } from '@/sanity/lib/types';

export interface IProjectLayout {
  readonly children: React.ReactNode;
  readonly modal: React.ReactNode;
}

export interface IProjectPage {
  params: Promise<{ slug: string }>;
  searchParams: Record<string, string | string[] | undefined>;
}

export interface IProjectPageModal {
  params: Promise<{ slug: string }>;
  searchParams: Record<string, string | string[] | undefined>;
}

export interface IProjectGrid {
  readMore?: boolean;
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

export interface IThumbnailNav {
  gallery: string[];
  selectedImageIndex: number;
  setSelectedImageIndex: (index: number) => void;
}

export interface IImageTitleProps {
  title: string;
  selectedImageIndex: number;
  galleryLength: number;
}

export interface IMainImageProps {
  gallery: string[];
  selectedImageIndex: number;
  title: string;
}

export interface IButtonsNavProps {
  goToPrevious: () => void;
  goToNext: () => void;
  galleryLength: number;
}

export interface IGalleryItemProps {
  image: string;
  title: string;
  index: number;
  openModal: (index: number) => void;
}

export interface IGalleriesProps {
  gallery: string[];
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

export interface IImagePreviewProps {
  selectedImageIndex: number | null;
  setSelectedImageIndex: (index: number) => void;
  closeModal: () => void;
  goToPrevious: () => void;
  goToNext: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  gallery: string[];
  title: string;
}
