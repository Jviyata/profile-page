export const metadata = {
  title: "About",
  description:
    "Learn about Profile App — what it does, how it was built, and the team behind it.",
};

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About Profile App</h1>
        <div className="about-divider" />
        <p>
          A clean, modern directory for discovering team members — their roles,
          skills, and everything in between. Built to showcase the power of
          Next.js server components and URL-driven state.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <div className="about-card-icon">🔍</div>
          <h3>Smart Filtering</h3>
          <p>
            Filter profiles by role or search by name — all powered by URL
            search params so results are shareable and bookmarkable.
          </p>
        </div>
        <div className="about-card">
          <div className="about-card-icon">⚡</div>
          <h3>Server Components</h3>
          <p>
            The homepage and detail pages are React Server Components, fetching
            data at the server level for instant performance.
          </p>
        </div>
        <div className="about-card">
          <div className="about-card-icon">🗂</div>
          <h3>Dynamic Routes</h3>
          <p>
            Each profile has its own URL at <code>/profiles/[id]</code>, with
            full metadata and static param generation.
          </p>
        </div>
        <div className="about-card">
          <div className="about-card-icon">🎨</div>
          <h3>Thoughtful Design</h3>
          <p>
            An olive and cream palette paired with Playfair Display and DM Sans
            for a refined, professional feel.
          </p>
        </div>
      </div>

      <div className="about-tech">
        <h2>Built With</h2>
        <div className="tech-tags" style={{ marginTop: "1rem" }}>
          {[
            "Next.js 15",
            "React 19",
            "Server Components",
            "Dynamic Routing",
            "CSS Modules",
            "Google Fonts",
            "Playfair Display",
            "DM Sans",
          ].map((t) => (
            <span key={t} className="tech-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
