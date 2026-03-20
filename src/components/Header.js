import React from 'react';
import { FiMoon, FiSun, FiUser } from 'react-icons/fi';

const Header = ({ isDark, onThemeToggle, onClearChat }) => {
  return (
    <header className="sticky top-0 z-10 border-b border-white/50 dark:border-white/10 bg-white/55 dark:bg-slate-900/45 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 shadow-soft">
            <span className="font-display text-lg font-bold text-white">L</span>
          </div>
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              LearnUpon
            </h1>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300">
              Learning Copilot
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Clear Chat Button */}
          <button
            onClick={onClearChat}
            className="rounded-xl border border-slate-300/70 bg-white/60 px-3 py-2 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:bg-white dark:border-slate-600/60 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:bg-slate-700/70"
            title="Clear chat history"
          >
            Clear
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className="rounded-xl border border-slate-300/70 bg-white/60 p-2.5 transition-all hover:-translate-y-0.5 hover:bg-white dark:border-slate-600/60 dark:bg-slate-800/60 dark:hover:bg-slate-700/70"
            aria-label="Toggle theme"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <FiSun className="h-5 w-5 text-secondary-400" />
            ) : (
              <FiMoon className="h-5 w-5 text-slate-700" />
            )}
          </button>

          {/* User Profile */}
          <button
            className="rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 p-2.5 shadow-soft transition-all hover:-translate-y-0.5 hover:from-primary-400 hover:to-primary-600"
            title="User profile"
          >
            <FiUser className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
