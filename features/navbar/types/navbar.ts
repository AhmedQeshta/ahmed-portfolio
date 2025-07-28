export interface ILinksApp {
  id: number;
  name: string;
  url: string;
}

export interface IMenuButton {
  toggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export interface IMenu {
  links: ILinksApp[];
  closeMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export interface IOverlay {
  closeMobileMenu: () => void;
  isMobileMenuOpen: boolean;
}

export interface INavLinks {
  links: ILinksApp[];
}

export interface IMediaList {
  title: string;
  href: string;
  icon?: string | unknown;
  iconSvg?: any;
  rel: string;
  target: string;
}
