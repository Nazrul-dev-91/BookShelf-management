import React from 'react';

/**
 * BookFilter Component
 * Handles search query, status filter tabs (All, Unread, Read), and sorting
 */
export default function BookFilter({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
  sortBy,
  onSortChange,
  counts = { all: 0, unread: 0, read: 0 },
}) {
  return (
    <div className="glass-card rounded-2xl p-4 sm:p-5 mb-6 space-y-4 shadow-sm border border-slate-200/80 dark:border-slate-800/80">
      {/* Top Row: Search Input and Sort Dropdown */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search books by title or author..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-9 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Clear search"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="sort-select" className="text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
            Sort:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title-asc">Title (A – Z)</option>
            <option value="author-asc">Author (A – Z)</option>
          </select>
        </div>
      </div>

      {/* Bottom Row: Status Filter Tabs */}
      <div className="flex items-center gap-2 border-t border-slate-100 dark:border-slate-800/80 pt-3 flex-wrap">
        <button
          type="button"
          onClick={() => onFilterChange('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            filterStatus === 'all'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30'
              : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
          }`}
        >
          <span>All Books</span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              filterStatus === 'all'
                ? 'bg-white/20 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {counts.all}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onFilterChange('unread')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            filterStatus === 'unread'
              ? 'bg-amber-600 text-white shadow-sm shadow-amber-500/30'
              : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block"></span>
          <span>Unread</span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              filterStatus === 'unread'
                ? 'bg-white/20 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {counts.unread}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onFilterChange('read')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
            filterStatus === 'read'
              ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/30'
              : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
          <span>Read</span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[10px] ${
              filterStatus === 'read'
                ? 'bg-white/20 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {counts.read}
          </span>
        </button>
      </div>
    </div>
  );
}
