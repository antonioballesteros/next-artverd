export default function FlowersLoading() {
  return (
    <div className="space-y-4" aria-busy="true">
      <div className="bg-muted h-8 w-48 animate-pulse rounded-md" />
      <div className="bg-muted h-4 max-w-xl animate-pulse rounded-md" />
      <div className="bg-muted h-64 animate-pulse rounded-lg" />
    </div>
  );
}
