'use client';

import { useNavbar } from '@/features/navbar/hooks/useNavbar';
import NavLinks from '@/features/navbar/components/ui/NavLinks';
import SocialIcons from '@/features/navbar/components/ui/SocialIcons';
import MenuButton from '@/features/navbar/components/ui/MenuButton';
import Menu from '@/features/navbar/components/ui/Menu';
import Overlay from '@/features/navbar/components/ui/Overlay';
import Logo from '@/features/navbar/components/ui/Logo';
import ThemeToggle from '@/features/theme/components/ThemeToggle';
import { INavLinks } from '@/features/navbar/types/navbar';
import ScrollAnimation from '@/features/shard/components/ui/ScrollAnimation';

export default function Navbar({ links }: INavLinks) {
  const { isVisible, toggleMobileMenu, isMobileMenuOpen, closeMobileMenu } = useNavbar();
  return (
    <nav
      aria-label="Main Navigation"
      className={`fixed top-0 w-full backdrop-blur-md border-b border-purple-500/20 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{ backgroundColor: 'var(--navbar-bg)' }}>
      <div className="mx-auto max-w-[1450px] px-5 sm:px-7 lg:px-5">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Logo */}

          <Logo />

          {/* Desktop Navigation Links */}
          <NavLinks links={links} />

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <SocialIcons />
          </div>

          {/* Mobile Actions & Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />
            <MenuButton toggleMobileMenu={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
          </div>
        </div>

        {/* Mobile Menu */}
        <Menu links={links} closeMobileMenu={closeMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
      </div>

      {/* Mobile Menu Overlay */}
      <Overlay isMobileMenuOpen={isMobileMenuOpen} closeMobileMenu={closeMobileMenu} />
    </nav>
  );
}
