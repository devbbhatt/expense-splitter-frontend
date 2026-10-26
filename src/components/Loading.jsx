function Loading({ label = "Loading" }) {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-3" role="status" aria-live="polite">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-brand" />
      <p className="text-sm font-medium text-muted">{label}</p>
    </div>
  );
}

export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-xl bg-line/70 ${className}`} />;
}

export default Loading;
