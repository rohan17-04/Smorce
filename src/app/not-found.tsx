import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-bg">
      <Navbar />
      <main className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
        <div className="space-y-6">
          <h1 className="text-[120px] font-bold leading-none tracking-tighter text-ink opacity-10 sm:text-[180px]">
            404
          </h1>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
              Page not found
            </h2>
            <p className="mx-auto max-w-[400px] text-muted">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
            </p>
          </div>
          <div className="pt-8">
            <Link
              href="/"
              className="group btn-primary mx-auto inline-flex px-8 py-4"
            >
              <span className="relative z-10">Back to home</span>
              <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
