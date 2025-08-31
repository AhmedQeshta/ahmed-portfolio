'use client';

import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeToggle } from '@/features/theme/hooks/useThemeToggle';
import { ANIMATION_DURATIONS, EASING } from '@/features/shard/utils/animations';
import { themeOptions } from '@/features/theme/utils/constant';

export default function ThemeToggle() {
  const { isDark, theme, setTheme, getThemeLabel, dropdownRef, setIsOpen, isOpen, CurrentIcon } =
    useThemeToggle();

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-purple-500/10 rounded-lg transition-all duration-200 border border-transparent hover:border-purple-500/20"
        aria-label="Toggle theme"
        aria-expanded={isOpen}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: ANIMATION_DURATIONS.micro, ease: EASING.snappy }}>
        <motion.div
          animate={{ rotateY: isOpen ? 180 : 0 }}
          transition={{ duration: ANIMATION_DURATIONS.short, ease: EASING.smooth }}>
          <CurrentIcon size={18} />
        </motion.div>
        <span className="hidden sm:inline">{getThemeLabel()}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: ANIMATION_DURATIONS.short, ease: EASING.smooth }}>
          <ChevronDown size={14} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: ANIMATION_DURATIONS.short, ease: EASING.smooth }}
            className={`absolute right-0 mt-2 w-40 ${isDark ? 'bg-[#10172C]' : 'bg-[#ffff]'}  backdrop-blur-md border border-purple-500/20 rounded-lg shadow-lg z-50 py-1 overflow-hidden`}>
            {themeOptions.map(({ value, label, icon: Icon }, index) => (
              <motion.button
                key={value}
                onClick={() => {
                  setTheme(value);
                  setIsOpen(false);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: ANIMATION_DURATIONS.short,
                  delay: index * 0.03,
                  ease: EASING.smooth,
                }}
                whileHover={{ backgroundColor: 'rgba(169, 85, 247, 0.164)', x: 2 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors duration-200 ${
                  theme === value
                    ? 'text-pink-600/90 bg-pink-500/5'
                    : 'text-purple-600 hover:text-text-primary'
                }`}>
                <motion.div
                  animate={{ rotate: theme === value ? 360 : 0 }}
                  transition={{ duration: ANIMATION_DURATIONS.base, ease: EASING.smooth }}>
                  <Icon size={16} />
                </motion.div>
                <span>{label}</span>
                <AnimatePresence>
                  {theme === value && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: ANIMATION_DURATIONS.short, ease: EASING.bouncy }}
                      className="ml-auto w-2 h-2 bg-pink-600/90 rounded-full"
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
