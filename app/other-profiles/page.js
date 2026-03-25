import ProfileCard from "@/components/ProfileCard";
import { PROFILES } from "@/lib/profiles";

export const metadata = {
  title: "Other Profiles",
  description: "Explore the full team directory grouped by role.",
};

export default function OtherProfilesPage() {
  const groupedProfiles = PROFILES.reduce((groups, profile) => {
    if (!groups[profile.role]) {
      groups[profile.role] = [];
    }

    groups[profile.role].push(profile);
    return groups;
  }, {});

  return (
    <div className="directory-page">
      <div className="page-header page-header-compact">
        <h1>Other Profiles</h1>
        <p>Browse the team by specialty and jump into any individual profile.</p>
      </div>

      <div className="directory-groups">
        {Object.entries(groupedProfiles).map(([role, profiles]) => (
          <section key={role} className="directory-group">
            <div className="directory-group-header">
              <h2>{role}</h2>
              <span>{profiles.length} profile{profiles.length === 1 ? "" : "s"}</span>
            </div>

            <div className="profiles-grid directory-grid">
              {profiles.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
