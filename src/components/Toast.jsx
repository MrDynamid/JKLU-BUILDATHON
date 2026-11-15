import React from 'react';
import { CheckCircle2, AlertCircle, Info, X, Sparkles } from 'lucide-react';

export function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div 
      role="region" 
      aria-label="Notifications"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none"
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
            className={`pointer-events-auto p-4 rounded-xl shadow-lg border flex items-start gap-3 transition-all duration-200 bg-white ${
              isAmber 
                ? 'border-amber-300 ring-1 ring-amber-200' 
                : isSuccess 
                  ? 'border-emerald-300 ring-1 ring-emerald-200' 
                  : 'border-slate-300'
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
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <Info className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              {toast.title && (
                <div className="text-xs font-bold text-slate-900 mb-0.5 font-mono">
                  {toast.title}
                </div>
              )}
              <div className="text-xs text-slate-700 leading-snug">
                {toast.message}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="shrink-0 p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
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
