import { IOverlay } from '@/features/navbar/types/navbar';

export default function Overlay({ isMobileMenuOpen, closeMobileMenu }: IOverlay) {
  if (!isMobileMenuOpen) return null;

  return (
    <div
      className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
      onClick={closeMobileMenu}
      aria-hidden="true"
    />
  );
}
