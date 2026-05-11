import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useScrollLock } from '@/hooks/useScrollLock';

type Props = {
  open: boolean;
  onClose: () => void;
  side?: 'bottom' | 'right';
  children: ReactNode;
};

export const Sheet = ({ open, onClose, side = 'bottom', children }: Props) => {
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const placement = side === 'bottom'
    ? 'bottom-0 left-0 right-0 max-h-[80vh] rounded-t-md'
    : 'top-0 right-0 bottom-0 w-full max-w-sm';

  return createPortal(
    <div
      className="fixed inset-0 z-40 bg-comal/60"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={`absolute ${placement} bg-paper shadow-hard overflow-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 text-comal hover:text-toldo focus:outline-none"
        >
          <X size={22} />
        </button>
        <div className="px-5 py-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
};
