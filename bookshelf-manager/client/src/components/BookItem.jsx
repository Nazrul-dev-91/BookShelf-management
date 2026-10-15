import React from 'react';

/**
 * Generates a consistent decorative gradient palette based on a string
 */
function getBookGradient(str = '') {
  const gradients = [
    'from-indigo-500 to-purple-600',
    'from-emerald-500 to-teal-600',
    'from-violet-500 to-fuchsia-600',
    'from-amber-500 to-rose-500',
    'from-cyan-500 to-blue-600',
    'from-rose-500 to-pink-600',
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % gradients.length;
  return gradients[index];
}

/**
 * BookItem Component
 * Revamped with modern book spine artwork, status badges, toggle actions & delete prompt
 */
export default function BookItem({ book, onToggleStatus, onRequestDelete, isToggling }) {
  const isRead = book.status === 'read';
  const gradient = getBookGradient(book.title || 'Book');

  // Format date
  const formattedDate = book.createdAt
    ? new Date(book.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <li
      className={`glass-card rounded-2xl p-4 sm:p-5 transition-all duration-300 relative group overflow-hidden border ${
        isRead
          ? 'border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10'
          : 'border-slate-200/80 dark:border-slate-800 hover:border-indigo-400/40 hover:shadow-lg dark:hover:border-indigo-500/40'
      }`}
    >
      {/* Decorative subtle ambient bar on the left */}
      <div
        className={`absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b ${gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pl-2">
        {/* Book Spine Icon + Info */}
        <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
          {/* Visual Book Spine Thumbnail */}
          <div
            className={`w-11 h-13 sm:w-12 sm:h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-transform`}
          >
            <svg className="w-5 h-5 opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>

          {/* Details */}
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3
                className={`text-base font-bold tracking-tight truncate transition-colors ${
                  isRead
                    ? 'line-through text-slate-400 dark:text-slate-500'
                    : 'text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                }`}
                title={book.title}
              >
                {book.title}
              </h3>

              {/* Status Badge */}
              {isRead ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300/60 dark:border-emerald-800/60">
                  <svg className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Read
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  Unread
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
              <span className="font-medium">
                by <span className="font-semibold text-slate-700 dark:text-slate-300">{book.author}</span>
              </span>
              {formattedDate && (
                <>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span>{formattedDate}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
          {/* Status Toggle Button */}
          <button
            type="button"
            onClick={() => onToggleStatus(book.id, isRead ? 'unread' : 'read')}
            disabled={isToggling}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 ${
              isRead
                ? 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-500/25 hover:shadow-emerald-500/40'
            }`}
            title={isRead ? 'Mark book as unread' : 'Mark book as read'}
          >
            {isRead ? (
              <>
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                <span>Mark Unread</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Mark as Read</span>
              </>
            )}
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => onRequestDelete(book)}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
            title="Delete this book"
            aria-label={`Delete ${book.title}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}
