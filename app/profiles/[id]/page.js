import { getProfileById, getInitials, PROFILES } from "@/lib/profiles";
import Link from "next/link";
import { notFound } from "next/navigation";

// Generate static params for all known profiles
export async function generateStaticParams() {
  return PROFILES.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const profile = getProfileById(id);
  if (!profile) return { title: "Profile Not Found" };
  return {
    title: profile.name,
    description: profile.bio,
  };
}

export default async function ProfileDetailPage({ params }) {
  const { id } = await params;
  const profile = getProfileById(id);

  if (!profile) notFound();

  const { name, role, bio, email, location, skills, github, avatar } = profile;

  return (
    <div className="profile-detail">
      <Link href="/" className="back-link">
        ← Back to Profiles
      </Link>

      <div className="profile-detail-card">
        {avatar ? (
          <img src={avatar} alt={name} className="avatar-large" />
        ) : (
          <div
            className="avatar-placeholder"
            style={{
              width: 130,
              height: 130,
              fontSize: "2.5rem",
              flexShrink: 0,
            }}
          >
            {getInitials(name)}
          </div>
        )}

        <div className="profile-detail-info">
          <h1>{name}</h1>
          <span className="role-badge">{role}</span>
          <p className="bio">{bio}</p>

          <div className="profile-detail-meta">
            {email && (
              <div className="meta-item">
                <strong>Email</strong>
                <a href={`mailto:${email}`} style={{ color: "var(--olive)" }}>
                  {email}
                </a>
              </div>
            )}
            {location && (
              <div className="meta-item">
                <strong>Location</strong>
                <span>{location}</span>
              </div>
            )}
            {github && (
              <div className="meta-item">
                <strong>GitHub</strong>
                <a
                  href={`https://${github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--olive)" }}
                >
                  {github}
                </a>
              </div>
            )}
            {skills?.length > 0 && (
              <div className="meta-item" style={{ alignItems: "flex-start" }}>
                <strong>Skills</strong>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}
                >
                  {skills.map((s) => (
                    <span key={s} className="tech-tag">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
