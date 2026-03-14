import { Suspense } from "react";
import { getProfiles } from "@/lib/profiles";
import ProfileCard from "@/components/ProfileCard";
import FilterBar from "@/components/FilterBar";

export const metadata = {
  title: "Profiles",
  description: "Browse all team profiles. Filter by role or search by name.",
};

// Server component — reads searchParams from the URL (?title=developer&search=John)
export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const title = params?.title ?? "";
  const search = params?.search ?? "";

  const profiles = getProfiles({ title, search });

  return (
    <>
      <div className="page-header">
        <h1>Profiles</h1>
        {(title || search) && (
          <p>
            {profiles.length} result{profiles.length !== 1 ? "s" : ""}
            {title ? ` for role "${title}"` : ""}
            {search ? ` matching "${search}"` : ""}
          </p>
        )}
      </div>

      {/* Suspense needed because FilterBar uses useSearchParams */}
      <Suspense>
        <FilterBar currentTitle={title} currentSearch={search} />
      </Suspense>

      {profiles.length > 0 ? (
        <div className="profiles-grid">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No profiles found</h2>
          <p>Try adjusting your filters or search term.</p>
        </div>
      )}
    </>
  );
}
