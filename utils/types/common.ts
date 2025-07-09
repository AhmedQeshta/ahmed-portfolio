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
  title: string;
  description: string;
}

export interface IModal {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
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

export interface ILinksApp {
  id: number;
  name: string;
  url: string;
}
