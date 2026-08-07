'use client';

import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center bg-bg">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Something went wrong
        </h1>
        <p className="mx-auto max-w-[400px] text-muted">
          An unexpected error occurred. We&apos;ve been notified and are looking into it.
        </p>
        <div className="pt-8 flex justify-center gap-4">
          <button
            onClick={() => reset()}
            className="group btn-primary px-8 py-4"
          >
            <span className="relative z-10">Try again</span>
            <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </button>
        </div>
      </div>
    </div>
  );
}
