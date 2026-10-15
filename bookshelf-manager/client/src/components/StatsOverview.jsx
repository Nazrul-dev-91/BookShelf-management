import React from 'react';

/**
 * StatsOverview Component
 * Renders statistical cards and reading progress bar
 */
export default function StatsOverview({ books = [] }) {
  const total = books.length;
  const readCount = books.filter((b) => b.status === 'read').length;
  const unreadCount = total - readCount;
  const percentage = total === 0 ? 0 : Math.round((readCount / total) * 100);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
      {/* Total Books */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-lg dark:hover:border-indigo-500/30 group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Total Books
          </span>
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center transition-transform group-hover:scale-110">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          {total}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">In your library</p>
      </div>

      {/* Completed Books */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-lg dark:hover:border-emerald-500/30 group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Read
          </span>
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-transform group-hover:scale-110">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
          {readCount}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Finished reading</p>
      </div>

      {/* Unread Books */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-lg dark:hover:border-amber-500/30 group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            To Read
          </span>
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center transition-transform group-hover:scale-110">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 tracking-tight">
          {unreadCount}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Pending reading</p>
      </div>

      {/* Reading Progress */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-lg dark:hover:border-violet-500/30 group">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Completion
          </span>
          <div className="w-8 h-8 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center transition-transform group-hover:scale-110">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <div className="flex items-baseline gap-1.5">
          <div className="text-2xl sm:text-3xl font-extrabold text-violet-600 dark:text-violet-400 tracking-tight">
            {percentage}%
          </div>
        </div>
        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-200/80 dark:bg-slate-700/60 h-2 rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
