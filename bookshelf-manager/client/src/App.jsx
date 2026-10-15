import React, { useEffect, useReducer, useState, useMemo, useCallback } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import StatsOverview from './components/StatsOverview';
import BookFilter from './components/BookFilter';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import { getBooks, createBook, markBookAsRead, deleteBook } from './api/books';

// Initial state
const initialState = {
  books: [],
  isLoading: true,
  error: null,
};

// Reducer function managing bookshelf state
function booksReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_BOOKS':
      return {
        ...state,
        books: action.payload,
        isLoading: false,
        error: null,
      };
    case 'ADD_BOOK':
      return {
        ...state,
        books: [action.payload, ...state.books],
        error: null,
      };
    case 'UPDATE_BOOK':
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
        error: null,
      };
    case 'DELETE_BOOK':
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(booksReducer, initialState);

  // Theme Management (Dark Mode by Default for Premium Feel)
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('bookshelf_theme');
    if (saved !== null) return saved === 'dark';
    return true; // default to sleek dark mode
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('bookshelf_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('bookshelf_theme', 'light');
    }
  }, [isDark]);

  // UI States: Search, Filter, Sort, Modal & Toast
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'unread' | 'read'
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'title-asc' | 'author-asc'
  const [bookToDelete, setBookToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Fetch all books on mount
  const fetchBooks = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await getBooks();
      dispatch({ type: 'SET_BOOKS', payload: data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message || 'Failed to fetch books from server.' });
      showToast(err.message || 'Failed to connect to backend server', 'error');
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Handler: Add Book
  const handleAddBook = async (title, author) => {
    try {
      const newBook = await createBook({ title, author });
      dispatch({ type: 'ADD_BOOK', payload: newBook });
      showToast(`Added "${newBook.title}" to bookshelf!`, 'success');
      return true;
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message || 'Failed to add book.' });
      showToast(err.message || 'Failed to add book', 'error');
      return false;
    }
  };

  // Handler: Toggle Status (Read / Unread)
  const handleToggleStatus = async (id, targetStatus) => {
    try {
      const updatedBook = await markBookAsRead(id, targetStatus);
      dispatch({ type: 'UPDATE_BOOK', payload: updatedBook });
      if (targetStatus === 'read') {
        showToast(`🎉 "${updatedBook.title}" marked as read!`, 'success');
      } else {
        showToast(`📖 "${updatedBook.title}" marked as unread.`, 'info');
      }
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message || 'Failed to update book status.' });
      showToast(err.message || 'Failed to update book status', 'error');
    }
  };

  // Handler: Trigger Delete Modal
  const handleRequestDelete = (book) => {
    setBookToDelete(book);
  };

  // Handler: Confirm Delete
  const handleConfirmDelete = async (id) => {
    try {
      setIsDeleting(true);
      await deleteBook(id);
      dispatch({ type: 'DELETE_BOOK', payload: id });
      showToast('Book removed from library.', 'info');
      setBookToDelete(null);
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message || 'Failed to delete book.' });
      showToast(err.message || 'Failed to delete book', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Quick Add Sample Book
  const handleQuickAddSample = () => {
    handleAddBook('Clean Code', 'Robert C. Martin');
  };

  // Computed Counts
  const counts = useMemo(() => {
    const total = state.books.length;
    const read = state.books.filter((b) => b.status === 'read').length;
    const unread = total - read;
    return { all: total, read, unread };
  }, [state.books]);

  // Filtered and Sorted Books
  const displayedBooks = useMemo(() => {
    let result = [...state.books];

    // Status Filter
    if (filterStatus === 'read') {
      result = result.filter((b) => b.status === 'read');
    } else if (filterStatus === 'unread') {
      result = result.filter((b) => b.status === 'unread');
    }

    // Search Query Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (b) =>
          b.title?.toLowerCase().includes(query) ||
          b.author?.toLowerCase().includes(query)
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortBy === 'oldest') {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      if (sortBy === 'title-asc') {
        return (a.title || '').localeCompare(b.title || '');
      }
      if (sortBy === 'author-asc') {
        return (a.author || '').localeCompare(b.author || '');
      }
      return 0;
    });

    return result;
  }, [state.books, filterStatus, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden font-sans">
      {/* Background Ambient Glow Accents */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[550px] h-[550px] bg-indigo-600/10 dark:bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-emerald-600/10 dark:bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-violet-600/10 dark:bg-violet-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Sticky Header */}
      <header className="glass-panel sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          {/* Logo & Brand Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  BookShelf
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  Manager
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Personal reading library & progress tracker
              </p>
            </div>
          </div>

          {/* Right Controls: Theme Toggle & Live Database Status */}
          <div className="flex items-center gap-3">
            {/* Live Database Connected Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Atlas Live</span>
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer border border-slate-200/80 dark:border-slate-700"
              aria-label="Toggle theme"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                // Sun Icon
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                // Moon Icon
                <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main App Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 relative z-10">
        {/* Error Banner */}
        {state.error && (
          <div
            role="alert"
            className="mb-8 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 flex items-start justify-between gap-3 shadow-sm transition-all"
          >
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-bold">Network or Server Notice</p>
                <p className="text-xs mt-0.5 opacity-90">{state.error}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => dispatch({ type: 'CLEAR_ERROR' })}
              className="p-1 rounded-lg hover:bg-rose-500/20 text-rose-500 transition-colors cursor-pointer"
              aria-label="Dismiss error banner"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Reading Stats Dashboard */}
        <StatsOverview books={state.books} />

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form (Sticky on Desktop) */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24">
            <BookForm onAddBook={handleAddBook} />
          </aside>

          {/* Right Column: Search/Filter + Book List */}
          <section className="lg:col-span-7 space-y-4">
            {/* Filter and Search Bar */}
            <BookFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filterStatus={filterStatus}
              onFilterChange={setFilterStatus}
              sortBy={sortBy}
              onSortChange={setSortBy}
              counts={counts}
            />

            {/* List */}
            <BookList
              books={displayedBooks}
              isLoading={state.isLoading}
              searchQuery={searchQuery}
              filterStatus={filterStatus}
              onToggleStatus={handleToggleStatus}
              onRequestDelete={handleRequestDelete}
              onClearFilters={() => {
                setSearchQuery('');
                setFilterStatus('all');
              }}
              onQuickAddSample={handleQuickAddSample}
            />
          </section>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(bookToDelete)}
        book={bookToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setBookToDelete(null)}
        isDeleting={isDeleting}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
