import { ReactNode } from 'react';

// Sanity Asset types
export interface SanityAsset {
  _ref: string;
  _type: 'reference';
}

export interface SanityImageAsset extends SanityAsset {
  _type: 'reference';
}

export interface SanityImageValue {
  asset: SanityImageAsset;
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface ILinksList {
  id?: number;
  text?: string;
  link?: string;
  customStyle?: string;
  icon?: string | React.ReactNode;
}

export interface IActionButtons {
  listLinks: ILinksList[];
}

export interface IErrorHandle {
  id: string;
  description: string;
}

export interface IModal {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export interface IHookModal {
  isOpen: boolean;
  onClose: () => void;
}

export interface IMouseMoveWrapper {
  children: React.ReactNode;
  className?: string;
}

export interface ILinkNavigation {
  link: string;
  text: string;
  readMore?: boolean;
  dataLength?: number;
}


export interface IShareCard {
  url?: string;
  title?: string;
  heading?: string;
}

export interface ITags {
  tags?: string[];
}

// Updated ImageValue to use proper Sanity types
export interface ImageValue {
  asset?: SanityImageAsset;
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface IPortableTextComponentsProps {
  value: ImageValue;
}

export interface ICode {
  code: string;
  language: string;
  highlightedLines?: number[];
}

export interface ICodeBlock {
  value: ICode;
}

export interface IEmbed {
  url: string;
  title?: string;
  height?: number;
}

export interface IEmbedBlock {
  value: IEmbed;
}

export interface IBreakline {
  value?: Record<string, never>;
}

// normal
export interface IBlockNormal {
  children: React.ReactNode;
}

// h1
export interface IBlockH1 {
  children: React.ReactNode;
}

// h2
export interface IBlockH2 {
  children: React.ReactNode;
}

// h3
export interface IBlockH3 {
  children: React.ReactNode;
}

// h4
export interface IBlockH4 {
  children: React.ReactNode;
}

// h5
export interface IBlockH5 {
  children: React.ReactNode;
}

// h6

export interface IBlockH6 {
  children: React.ReactNode;
}

// blockquote
export interface IBlockQuote {
  children: React.ReactNode;
}

//
// list bullet
export interface IListBullet {
  children: React.ReactNode;
}

//  list number
export interface IListNumber {
  children: React.ReactNode;
}

//
// marks strong
export interface IMarkStrong {
  children: React.ReactNode;
}
// marks em
export interface IMarkEm {
  children: React.ReactNode;
}
// marks code
export interface IMarkCode {
  children: React.ReactNode;
}

export interface IMarkLinkValue {
  href: string;
}

export interface IMarkLinkProps {
  children: React.ReactNode;
  value: IMarkLinkValue;
}

export interface IImageHeaderProps {
  image?: string;
  title: string;
}

export interface HeaderTitleProps {
  title: string;
  subtitle: string;
  className?: string;
}

export interface EmptyItemProps {
  title: string;
  subTitle: string;
  icon?: string | null;
}

export type AnchorTarget = '_self' | '_blank' | '_parent' | '_top' | string;

export interface OptimizedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
  scroll?: boolean;
  replace?: boolean;
  shallow?: boolean;
  onClick?: () => void;
  target?: AnchorTarget;
  rel?: string;
  download?: boolean | string;
  ariaLabel?: string;
  dataTestId?: string;
}
export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}
