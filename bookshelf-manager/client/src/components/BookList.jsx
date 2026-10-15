import React from 'react';
import BookItem from './BookItem';

/**
 * BookList Component
 * Displays loading skeletons, empty state illustrations, and the animated book cards
 */
export default function BookList({
  books = [],
  isLoading,
  searchQuery,
  filterStatus,
  onToggleStatus,
  onRequestDelete,
  onClearFilters,
  onQuickAddSample,
}) {
  // Loading Skeletons
  if (isLoading) {
    return (
      <div className="space-y-3.5">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="glass-card rounded-2xl p-5 border border-slate-200/60 dark:border-slate-800/60 space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-14 rounded-xl skeleton-shimmer shrink-0"></div>
              <div className="space-y-2 flex-1">
                <div className="h-4 skeleton-shimmer rounded-md w-2/5"></div>
                <div className="h-3 skeleton-shimmer rounded-md w-1/4"></div>
              </div>
              <div className="h-8 w-24 skeleton-shimmer rounded-xl shrink-0"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty Search / Filter Results
  if (books.length === 0 && searchQuery) {
    return (
      <div className="glass-card rounded-3xl p-10 sm:p-12 text-center border border-slate-200/80 dark:border-slate-800/80">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">
          No matches found
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-5">
          No books in your shelf match the search term <span className="font-semibold text-slate-700 dark:text-slate-300">"{searchQuery}"</span>.
        </p>
        <button
          type="button"
          onClick={onClearFilters}
          className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 transition-colors cursor-pointer"
        >
          Clear Search Filter
        </button>
      </div>
    );
  }

  // Completely Empty Library
  if (books.length === 0) {
    return (
      <div className="glass-card rounded-3xl p-10 sm:p-14 text-center border border-slate-200/80 dark:border-slate-800/80">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500/20 via-violet-500/20 to-emerald-500/20 text-indigo-500 dark:text-indigo-400 mx-auto flex items-center justify-center mb-5 shadow-inner">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1.5">
          Your Bookshelf is Waiting
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6 leading-relaxed">
          You haven't added any books to your collection yet. Add your favorite books to start tracking your reading journey!
        </p>
        <button
          type="button"
          onClick={onQuickAddSample}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-md shadow-indigo-500/25 transition-all cursor-pointer"
        >
          + Add Starter Book (Clean Code)
        </button>
      </div>
    );
  }

  return (
    <ul className="space-y-3" role="list" aria-label="Book reading list">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          onToggleStatus={onToggleStatus}
          onRequestDelete={onRequestDelete}
        />
      ))}
    </ul>
  );
}
