import React, { useEffect } from 'react';

/**
 * Toast Component
 * Displays temporary feedback notifications with auto-dismiss
 */
export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';
  const isError = type === 'error';
  const isInfo = type === 'info';

  const bgColor = isSuccess
    ? 'bg-emerald-500/90 border-emerald-400 text-white shadow-emerald-500/25'
    : isError
    ? 'bg-rose-500/90 border-rose-400 text-white shadow-rose-500/25'
    : 'bg-indigo-500/90 border-indigo-400 text-white shadow-indigo-500/25';

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-slide-up ${bgColor}`}
      role="status"
    >
      <div className="shrink-0">
        {isSuccess && (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {isError && (
          <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )}
        {isInfo && (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>

      <p className="text-sm font-semibold tracking-wide">{message}</p>

      <button
        type="button"
        onClick={onClose}
        className="ml-2 p-1 rounded-lg hover:bg-white/20 transition-colors cursor-pointer text-white/80 hover:text-white"
        aria-label="Dismiss toast"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
