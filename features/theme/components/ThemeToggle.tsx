'use client';

import { ChevronDown } from 'lucide-react';
import { useThemeToggle } from '@/features/theme/hooks/useThemeToggle';
import { themeOptions } from '@/features/theme/utils/constant';

export default function ThemeToggle() {
  const { isDark, theme, setTheme, getThemeLabel, dropdownRef, setIsOpen, isOpen, CurrentIcon } =
    useThemeToggle();

  return (
    <div className="relative bg-items-nav p-2 rounded-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-1 py-1 text-sm font-medium items-nav rounded-full transition-all duration-200 border border-transparent hover:border-purple-500/20 hover:scale-[1.02] active:scale-[0.98]"
        aria-label="Toggle theme"
        aria-expanded={isOpen}>
        <div
          className="transition-transform duration-300"
          style={{ transform: isOpen ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
          <CurrentIcon size={18} />
        </div>
        <span className="hidden sm:inline">{getThemeLabel()}</span>
        <div
          className="transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <ChevronDown size={14} />
        </div>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-40 ${isDark ? 'bg-[#10172C]' : 'bg-[#ffff]'} backdrop-blur-md border border-purple-500/20 rounded-lg shadow-lg z-50 py-1 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-top-2`}>
          {themeOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => {
                setTheme(value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-all duration-200 hover:bg-purple-500/10 hover:translate-x-0.5 active:scale-[0.98] ${
                theme === value
                  ? 'text-pink-600/90 bg-pink-500/5'
                  : 'text-purple-600 hover:text-text-primary'
              }`}>
              <div
                className="transition-transform duration-500"
                style={{ transform: theme === value ? 'rotate(360deg)' : 'rotate(0deg)' }}>
                <Icon size={16} />
              </div>
              <span>{label}</span>
              {theme === value && (
                <div className="ml-auto w-2 h-2 bg-pink-600/90 rounded-full transition-all duration-300 scale-100 opacity-100" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
