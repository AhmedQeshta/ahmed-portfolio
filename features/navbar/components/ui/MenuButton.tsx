import { IMenuButton } from '@/features/navbar/types/navbar';

export default function MenuButton({ toggleMobileMenu, isMobileMenuOpen }: IMenuButton) {
  return (
    <button
      onClick={toggleMobileMenu}
      className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-white hover:bg-purple-500/10 transition-all duration-200"
      aria-label="Toggle mobile menu"
      aria-expanded={isMobileMenuOpen}>
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isMobileMenuOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>
  );
}
