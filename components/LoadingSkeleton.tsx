export function LoadingSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))]"
        >
          <div className="h-44 w-full rounded-t-2xl bg-black/5 dark:bg-white/5" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-3/4 rounded bg-black/5 dark:bg-white/5" />
            <div className="h-4 w-1/2 rounded bg-black/5 dark:bg-white/5" />
            <div className="h-9 w-full rounded-xl bg-black/5 dark:bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

