"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <nav className="navbar">
      <span className="navbar-brand">Profile App</span>

      <ul className="navbar-links">
        {[
          { href: "/", label: "Home" },
          { href: "/add-profile", label: "Add Profile" },
          { href: "/other-profiles", label: "Other Profiles" },
          { href: "/about", label: "About" },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={pathname === href ? "active" : ""}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="navbar-auth">
        {status === "loading" ? (
          <span className="navbar-auth-text">Loading...</span>
        ) : session ? (
          <>
            <span className="navbar-auth-text">{session.user?.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="btn-outline-white"
              type="button"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link href="/auth/signin" className="btn-outline-white">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
