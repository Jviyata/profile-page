export default function Loading() {
  return (
    <>
      <div className="page-header">
        <div
          className="skeleton"
          style={{ width: 160, height: 36, margin: "0 auto" }}
        />
      </div>

      <div
        className="filter-bar"
        style={{ maxWidth: 1200, margin: "0 auto 2rem", padding: "0 2rem" }}
      >
        <div
          className="skeleton"
          style={{ flex: 1, height: 44, borderRadius: 9 }}
        />
        <div
          className="skeleton"
          style={{ flex: 1, height: 44, borderRadius: 9 }}
        />
        <div
          className="skeleton"
          style={{ width: 120, height: 44, borderRadius: 9 }}
        />
      </div>

      <div className="loading-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="skeleton-card" key={i}>
            <div className="skeleton skeleton-circle" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line short" />
          </div>
        ))}
      </div>
    </>
  );
}
