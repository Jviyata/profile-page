import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="code">404</div>
      <h2>Page Not Found</h2>
      <p>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn-primary">
        ← Back to Profiles
      </Link>
    </div>
  );
}
