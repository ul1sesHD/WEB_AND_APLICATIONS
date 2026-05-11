import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useScrollLock } from '@/hooks/useScrollLock';

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export const Modal = ({ open, onClose, title, children }: Props) => {
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-comal/70"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-paper rounded-md shadow-hard w-full max-w-md max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-comal/10">
          {title ? (
            <h2 className="font-display text-2xl tracking-wider text-comal">{title}</h2>
          ) : <span />}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-comal hover:text-toldo focus:outline-none focus:text-toldo"
          >
            <X size={22} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
      </div>
    </div>,
    document.body,
  );
};
