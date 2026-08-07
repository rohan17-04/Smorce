'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0F1012] text-[#F2EFE9] flex min-h-screen items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Critical Error</h2>
          <p className="text-[#8A8C91] mb-8">The application encountered a critical error.</p>
          <button
            onClick={() => reset()}
            className="rounded-full bg-[#D72638] px-6 py-3 text-sm font-semibold text-white hover:bg-[#EF4444] transition-colors"
          >
            Recover Application
          </button>
        </div>
      </body>
    </html>
  );
}
