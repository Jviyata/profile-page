import Link from "next/link";

export default function ProfileNotFound() {
  return (
    <div className="not-found-page">
      <div className="code">404</div>
      <h2>Profile Not Found</h2>
      <p>This profile doesn&apos;t exist or may have been removed.</p>
      <Link href="/" className="btn-primary">
        ← Back to Profiles
      </Link>
    </div>
  );
}
