'use client';

import { X } from 'lucide-react';
import { IModal } from '@/features/shard/types/common';
import useModal from '@/features/shard/hooks/useModal';
import { useTheme } from '@/features/theme/hooks/useTheme';

export default function Modal({ isOpen, onClose, children, title, maxWidth = 'lg' }: IModal) {
  // Handle escape key press
  const { isDark } = useTheme();

  const maxWidthClasses = useModal({ isOpen, onClose });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div
        className={`relative w-full ${maxWidthClasses[maxWidth]} max-h-[90vh] overflow-hidden`}
        data-testid="modal-content">
        <div
          className={`${
            isDark ? 'bg-gray-900 border border-white/20' : 'bg-white border border-gray-200'
          } rounded-xl shadow-2xl`}>
          {/* Header */}
          {title && (
            <div
              className={`flex items-center justify-between p-6 border-b ${
                isDark ? 'border-white/20' : 'border-gray-200'
              }`}>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {title}
              </h2>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                }`}
                aria-label="Close modal">
                <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
            </div>
          )}

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">{children}</div>

          {/* Close button if no title */}
          {!title && (
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-colors z-10 ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
              }`}
              aria-label="Close modal">
              <X className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
