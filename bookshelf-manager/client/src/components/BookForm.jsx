import React, { useState } from 'react';

const SUGGESTIONS = [
  { title: 'Atomic Habits', author: 'James Clear' },
  { title: 'Clean Architecture', author: 'Robert C. Martin' },
  { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann' },
  { title: 'The Pragmatic Programmer', author: 'Andrew Hunt & David Thomas' },
];

/**
 * BookForm Component
 * Revamped with glassmorphism, instant validation, quick suggestion presets, and animated submit
 */
export default function BookForm({ onAddBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required and cannot be empty.';
    }
    if (!author.trim()) {
      newErrors.author = 'Author is required and cannot be empty.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const success = await onAddBook(title.trim(), author.trim());
      if (success) {
        setTitle('');
        setAuthor('');
        setErrors({});
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplySuggestion = (suggestion) => {
    setTitle(suggestion.title);
    setAuthor(suggestion.author);
    setErrors({});
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-200/80 dark:border-slate-800/80">
      {/* Form Header */}
      <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
            Add a New Book
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Expand your personal library collection
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Book Title */}
        <div>
          <label htmlFor="book-title" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
            Book Title <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              id="book-title"
              name="title"
              type="text"
              placeholder="e.g. Sapiens: A Brief History of Humankind"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
              }}
              disabled={isSubmitting}
              className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all outline-none bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white placeholder-slate-400 ${
                errors.title
                  ? 'border-2 border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              }`}
            />
          </div>
          {errors.title && (
            <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1 font-medium animate-fadeIn">
              <svg className="w-3.5 h-3.5 inline shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.title}
            </p>
          )}
        </div>

        {/* Book Author */}
        <div>
          <label htmlFor="book-author" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
            Author <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              id="book-author"
              name="author"
              type="text"
              placeholder="e.g. Yuval Noah Harari"
              value={author}
              onChange={(e) => {
                setAuthor(e.target.value);
                if (errors.author) setErrors((prev) => ({ ...prev, author: '' }));
              }}
              disabled={isSubmitting}
              className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all outline-none bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-white placeholder-slate-400 ${
                errors.author
                  ? 'border-2 border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                  : 'border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
              }`}
            />
          </div>
          {errors.author && (
            <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1 font-medium animate-fadeIn">
              <svg className="w-3.5 h-3.5 inline shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.author}
            </p>
          )}
        </div>

        {/* Quick Inspiration Presets */}
        <div className="pt-2">
          <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1">
            <span>✨ Quick suggestions:</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplySuggestion(item)}
                className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 dark:hover:text-indigo-400 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer border border-transparent hover:border-indigo-200 dark:hover:border-indigo-500/30"
              >
                + {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Adding Book...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add to Shelf</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
