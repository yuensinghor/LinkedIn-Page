import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { SiteCopy } from '../data/portfolioContent';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  copy: SiteCopy['footer'];
}

export function LegalModal({ isOpen, onClose, copy }: LegalModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#111827]/25 p-4 backdrop-blur-[1px]"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg rounded-xl border border-[#E4E4E7] bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-[#E4E4E7] pb-3.5">
              <h2
                id="legal-modal-title"
                className="text-base font-semibold tracking-tight text-[#111827]"
              >
                {copy.legalModalTitle}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label={copy.closeLabel}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#E4E4E7] text-[#52525B] transition-colors hover:border-[#D4D4D8] hover:text-[#111827] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#52525B]">
              {copy.legalModalBody.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-6 flex justify-end border-t border-[#E4E4E7] pt-4">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[38px] rounded-lg border border-[#E4E4E7] bg-[#FAFAFA] px-4 py-1.5 text-sm font-medium text-[#111827] transition-colors hover:border-[#D4D4D8] active:scale-[0.98]"
              >
                {copy.closeLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
