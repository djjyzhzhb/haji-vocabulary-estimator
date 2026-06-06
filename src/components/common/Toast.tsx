import React, { useEffect, useState } from 'react';
import { Check, X, AlertTriangle, LucideIcon } from 'lucide-react';

export interface ToastData {
  id: string;
  type: 'success' | 'info';
  message: string;
  exiting?: boolean;
}

const iconMap: Record<ToastData['type'], LucideIcon> = {
  success: Check,
  info: AlertTriangle,
};

const colorMap: Record<ToastData['type'], string> = {
  success: 'bg-emerald-600 text-white',
  info: 'bg-blue-600 text-white',
};

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  useEffect(() => {
    const handler = (e: CustomEvent<Omit<ToastData, 'id' | 'exiting'>>) => {
      const id = `toast-${idCounter}`;
      setIdCounter((c) => c + 1);
      const toast: ToastData = { ...e.detail, id };
      setToasts((prev) => [toast, ...prev]);
      setTimeout(() => {
        setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 300);
      }, 2200);
    };
    window.addEventListener('toast' as any, handler);
    return () => window.removeEventListener('toast' as any, handler);
  }, [idCounter]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col-reverse gap-2 pointer-events-none">
      {toasts.map((toast) => {
        const Icon = iconMap[toast.type];
        return (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium
              ${colorMap[toast.type]}
              ${toast.exiting ? 'animate-toast-out' : 'animate-toast-in'}
            `}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};

export const toast = {
  success: (message: string) => {
    window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'success', message } }));
  },
  info: (message: string) => {
    window.dispatchEvent(new CustomEvent('toast', { detail: { type: 'info', message } }));
  },
};
