import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="mb-5 flex gap-3 animate-fadeIn">
      {/* Bot Avatar */}
      <div className="flex-shrink-0">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-sm font-bold text-white shadow-soft">
          AI
        </div>
      </div>

      {/* Typing Animation */}
      <div className="flex items-center gap-1 rounded-3xl rounded-bl-md border border-slate-200/70 bg-white/80 px-4 py-3 shadow-soft dark:border-slate-600/60 dark:bg-slate-800/70">
        <div className="typing-indicator flex gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-primary-500 dark:bg-primary-300"></span>
          <span className="inline-block h-2 w-2 rounded-full bg-primary-500 dark:bg-primary-300"></span>
          <span className="inline-block h-2 w-2 rounded-full bg-primary-500 dark:bg-primary-300"></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
