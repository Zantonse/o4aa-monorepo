export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {/* Header summary strip skeleton */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="h-5 bg-slate-200 rounded w-48 mb-2" />
            <div className="flex gap-2">
              <div className="h-4 bg-slate-200 rounded-full w-32" />
              <div className="h-4 bg-slate-200 rounded-full w-24" />
            </div>
          </div>
          <div className="h-8 bg-slate-200 rounded-lg w-28 shrink-0" />
        </div>
      </div>

      {/* Tab pills skeleton */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        <div className="h-8 bg-slate-200 rounded-md w-32" />
        <div className="h-8 bg-slate-200 rounded-md w-32" />
      </div>

      {/* Card skeletons */}
      {[0, 1, 2].map((i) => (
        <div key={i} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          {/* Card header */}
          <div className="px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 bg-slate-200 rounded w-36" />
              <div className="h-4 bg-slate-200 rounded-full w-16" />
            </div>
            <div className="h-3 bg-slate-200 rounded w-64" />
          </div>

          {/* Question rows */}
          <div className="divide-y divide-slate-50">
            {Array.from({ length: i === 0 ? 4 : i === 1 ? 3 : 5 }).map((_, j) => (
              <div key={j} className="flex items-start gap-3 px-5 py-3">
                <div className="h-3 bg-slate-200 rounded w-4 shrink-0 mt-1" />
                <div
                  className="h-3 bg-slate-200 rounded flex-1"
                  style={{ width: `${60 + ((i * 7 + j * 13) % 35)}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
