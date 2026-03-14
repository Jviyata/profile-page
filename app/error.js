"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="not-found-page">
      <div
        className="code"
        style={{ fontSize: "4rem", color: "var(--red-accent)" }}
      >
        Oops
      </div>
      <h2>Something went wrong</h2>
      <p>{error?.message ?? "An unexpected error occurred."}</p>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button className="btn-primary" onClick={reset}>
          Try Again
        </button>
        <Link href="/" className="btn-reset">
          ← Home
        </Link>
      </div>
    </div>
  );
}
