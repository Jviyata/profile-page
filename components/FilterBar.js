"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ROLES } from "@/lib/profiles";
import Link from "next/link";

export default function FilterBar({ currentTitle, currentSearch }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key, value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="title-filter">Filter By Role</label>
        <select
          id="title-filter"
          className="filter-select"
          value={currentTitle ?? ""}
          onChange={(e) => updateParam("title", e.target.value)}
        >
          <option value="">All Roles</option>
          {ROLES.map((role) => (
            <option key={role} value={role.toLowerCase()}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="search-filter">Search By Name</label>
        <input
          id="search-filter"
          type="text"
          className="filter-input"
          placeholder="Search profiles..."
          defaultValue={currentSearch ?? ""}
          onChange={(e) => updateParam("search", e.target.value)}
        />
      </div>

      <Link href="/" className="btn-reset">
        Reset Filters
      </Link>
    </div>
  );
}
