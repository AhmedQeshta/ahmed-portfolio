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
}

export interface IScrollAnimation {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

export interface ISearch {
  action: string;
}

export interface IShareCard {
  url?: string;
  title?: string;
}

export interface ITags {
  tags?: string[];
}

export interface ImageValue {
  asset?: object;
  alt?: string;
}

export interface IPortableTextComponents {
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
