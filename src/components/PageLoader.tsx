export default function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" role="status" aria-live="polite">
      <div className="w-10 h-10 rounded-full border-4 border-gray-300 dark:border-gray-700 border-t-primary animate-spin" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
