import React from 'react';
import { CheckCircle2, AlertCircle, Info, X, Sparkles } from 'lucide-react';

export function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div 
      role="region" 
      aria-label="Notifications"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none"
    >
      {/* Hidden live region for screen readers */}
      <div className="sr-only" aria-live="assertive">
        {toasts[toasts.length - 1]?.message}
      </div>

      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isAmber = toast.type === 'amber' || toast.type === 'unlock';

        return (
          <div
            key={toast.id}
            className={`toast-slide-up pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-start gap-3 transition-all duration-200 bg-white ${
              isAmber 
                ? 'border-amber-300 ring-2 ring-amber-100' 
                : isSuccess 
                  ? 'border-emerald-300 ring-2 ring-emerald-100' 
                  : 'border-zinc-200 shadow-lg'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isAmber ? (
                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              ) : isSuccess ? (
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-700">
                  <Info className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              {toast.title && (
                <div className="text-xs font-bold text-zinc-900 mb-0.5 font-sans tracking-tight">
                  {toast.title}
                </div>
              )}
              <div className="text-xs text-zinc-600 leading-snug font-sans">
                {toast.message}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="shrink-0 p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ToastContainer;
