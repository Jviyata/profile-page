"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

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
    </nav>
  );
}
