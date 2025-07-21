'use client';

import { X } from 'lucide-react';
import { IModal } from '@/utils/types/common';
import useModal from '@/hooks/useModal';

export default function Modal({ isOpen, onClose, children, title, maxWidth = 'lg' }: IModal) {
  // Handle escape key press

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
        <div className="bg-gray-900 border border-white/20 rounded-xl shadow-2xl">
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close modal">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          )}

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">{children}</div>

          {/* Close button if no title */}
          {!title && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors z-10"
              aria-label="Close modal">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
