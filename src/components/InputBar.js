import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiPlus } from 'react-icons/fi';

const InputBar = ({ onSendMessage, loading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 120);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      onSendMessage(input);
      setInput('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="sticky bottom-0 border-t border-white/60 bg-white/55 shadow-medium backdrop-blur-md dark:border-slate-700/60 dark:bg-slate-900/45">
      <div className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6">
        <form onSubmit={handleSubmit} className="flex gap-3">
          {/* Attachment Button (Optional) */}
          <button
            type="button"
            className="flex-shrink-0 rounded-2xl border border-slate-300/70 bg-white/70 p-3 text-slate-700 transition-all hover:-translate-y-0.5 hover:bg-white dark:border-slate-600/60 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-700/70"
            title="Add attachment"
          >
            <FiPlus className="h-5 w-5" />
          </button>

          {/* Input Textarea */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask your AI assistant anything..."
              disabled={loading}
              className="w-full resize-none rounded-2xl border border-slate-300/70 bg-white/75 px-4 py-3 text-slate-900 placeholder:text-slate-500 transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-slate-600/60 dark:bg-slate-800/75 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-primary-400 dark:focus:ring-primary-900"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="flex-shrink-0 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-3 text-white shadow-soft transition-all hover:-translate-y-0.5 hover:from-primary-400 hover:to-primary-600 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-500"
            title="Send message (Enter or Cmd+Enter)"
          >
            <FiSend className="h-5 w-5" />
          </button>
        </form>
        <p className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-300">
          Press{' '}
          <kbd className="rounded border border-slate-300/80 bg-white/80 px-2 py-1 dark:border-slate-600/70 dark:bg-slate-800/80">
            Enter
          </kbd>{' '}
          to send,{' '}
          <kbd className="rounded border border-slate-300/80 bg-white/80 px-2 py-1 dark:border-slate-600/70 dark:bg-slate-800/80">
            Shift + Enter
          </kbd>{' '}
          for new line
        </p>
      </div>
    </div>
  );
};

export default InputBar;
