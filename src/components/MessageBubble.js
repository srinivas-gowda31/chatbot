import React, { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';

const MessageBubble = ({ message, isUser }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`mb-5 flex gap-3 animate-fadeIn ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {/* Bot Avatar */}
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-sm font-bold text-white shadow-soft">
            AI
          </div>
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`flex max-w-xs flex-col gap-2 sm:max-w-xl lg:max-w-2xl ${
          isUser ? 'items-end' : 'items-start'
        }`}
      >
        {/* Message Content */}
        <div
          className={`break-words rounded-3xl px-4 py-3.5 shadow-soft ${
            isUser
              ? 'rounded-br-md bg-gradient-to-br from-primary-500 to-primary-700 text-white'
              : 'rounded-bl-md border border-slate-200/80 bg-white/85 text-slate-800 dark:border-slate-600/60 dark:bg-slate-800/70 dark:text-slate-100'
          } ${message.isError ? 'border border-red-300/70 bg-red-100 text-red-900 dark:border-red-700 dark:bg-red-950/70 dark:text-red-100' : ''}`}
        >
          {isUser ? (
            <p className="text-[15px] leading-relaxed sm:text-base">
              {message.text}
            </p>
          ) : (
            <div className="prose prose-sm max-w-none text-[15px] leading-relaxed prose-p:leading-relaxed dark:prose-invert sm:text-base">
              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p className="mb-2 last:mb-0">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-2 list-inside list-disc">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-2 list-inside list-decimal">
                      {children}
                    </ol>
                  ),
                  code: ({ children }) => (
                    <code
                      className={`rounded px-2 py-1 ${
                        message.isError
                          ? 'bg-red-200 dark:bg-red-900'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                    >
                      {children}
                    </code>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold">{children}</strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Message Actions and Timestamp */}
        <div
          className={`flex items-center gap-2 px-2 text-xs font-medium text-slate-500 dark:text-slate-400 ${
            isUser ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          <span>{formatTime(message.timestamp)}</span>

          {!isUser && (
            <button
              onClick={handleCopy}
              className="rounded-md p-1 transition-colors hover:bg-slate-100 hover:text-primary-600 dark:hover:bg-slate-700 dark:hover:text-primary-300"
              title="Copy message"
            >
              {copied ? (
                <FiCheck className="h-4 w-4 text-primary-500" />
              ) : (
                <FiCopy className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-700 text-sm font-bold text-white shadow-soft">
            U
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
