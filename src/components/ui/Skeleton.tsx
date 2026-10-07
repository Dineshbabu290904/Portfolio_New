import type { ReactNode } from 'react';

// Base shimmering placeholder block.
export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden rounded-md bg-gray-200/80 dark:bg-gray-700/60 ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent" />
    </div>
  );
}

function SkeletonPage({ children, label }: { children: ReactNode; label: string }) {
  return (
    <section className="container mx-auto px-4 pt-28 pb-20 md:pt-32" role="status" aria-live="polite">
      <span className="sr-only">Loading {label}…</span>
      {children}
    </section>
  );
}

export function HeaderSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 mb-12 md:mb-16">
      <Skeleton className="h-7 w-40 rounded-full" />
      <Skeleton className="h-12 w-72 sm:w-96" />
      <Skeleton className="h-1 w-20 rounded-full" />
    </div>
  );
}

const card = 'rounded-xl border border-gray-200/60 dark:border-gray-700/60 bg-white/60 dark:bg-gray-800/60';

export function ProjectDetailSkeleton() {
  return (
    <SkeletonPage label="project details">
      <div className="max-w-5xl mx-auto space-y-8">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-64 md:h-80 w-full rounded-2xl" />
        <div className="space-y-3">
          <Skeleton className="h-9 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${card} md:col-span-2 p-6 space-y-3`}>
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className={`h-3 ${i % 3 === 2 ? 'w-2/3' : 'w-full'}`} />)}
          </div>
          <div className={`${card} p-6 space-y-3`}>
            <Skeleton className="h-5 w-1/2" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-6 w-16 rounded-full" />)}
            </div>
          </div>
        </div>
      </div>
    </SkeletonPage>
  );
}

export function TerminalSkeleton() {
  return (
    <SkeletonPage label="terminal">
      <div className={`${card} mx-auto w-[90%] overflow-hidden`} style={{ height: 'min(600px, calc(100vh - 9rem))' }}>
        <Skeleton className="h-7 w-full rounded-none" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-3 w-2/5" />
        </div>
      </div>
    </SkeletonPage>
  );
}

export function GenericPageSkeleton() {
  return (
    <SkeletonPage label="page">
      <HeaderSkeleton />
      <div className="max-w-3xl mx-auto space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </SkeletonPage>
  );
}
