import React from 'react';
import { FiMessageCircle } from 'react-icons/fi';

const EmptyState = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-2 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-200 to-secondary-200 shadow-soft dark:from-primary-900/70 dark:to-secondary-900/70">
        <FiMessageCircle className="h-9 w-9 text-primary-700 dark:text-primary-300" />
      </div>
      <h2 className="font-display mb-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
        Build Understanding Faster
      </h2>
      <p className="mb-8 max-w-xl text-base text-slate-600 dark:text-slate-300">
        Ask for explanations, examples, or quick practice prompts. Your AI
        assistant can break down complex ideas into clear next steps.
      </p>
      <div className="grid w-full max-w-3xl gap-3 text-left sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 text-sm text-slate-700 shadow-soft dark:border-slate-600/50 dark:bg-slate-800/65 dark:text-slate-200">
          Explain recursion with a small JavaScript example.
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 text-sm text-slate-700 shadow-soft dark:border-slate-600/50 dark:bg-slate-800/65 dark:text-slate-200">
          Quiz me on Python basics in 5 quick questions.
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 text-sm text-slate-700 shadow-soft dark:border-slate-600/50 dark:bg-slate-800/65 dark:text-slate-200">
          Summarize this topic in simple bullet points.
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
