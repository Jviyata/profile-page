// lib/profiles.js
// In a real app this would be fetched from a database or API.

export const PROFILES = [
  {
    id: "1",
    name: "Arika Gibson",
    role: "Frontend Developer",
    email: "arika@example.com",
    location: "San Francisco, CA",
    bio: "Passionate about crafting pixel-perfect UIs and accessible web experiences. Loves React, CSS animations, and a good cup of matcha.",
    avatar: null, // Use initials placeholder
    skills: ["React", "TypeScript", "CSS", "Next.js"],
    github: "github.com/arikagibson",
  },
  {
    id: "2",
    name: "Julian Luzzader",
    role: "UX Designer",
    email: "julian@example.com",
    location: "Austin, TX",
    bio: "Designing intuitive digital products that put humans first. Fan of systems thinking, Figma prototypes, and long hikes on weekends.",
    avatar: null,
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    github: "github.com/julianluz",
  },
  {
    id: "3",
    name: "Viyata Ruta",
    role: "Backend Developer",
    email: "viyata@example.com",
    location: "New York, NY",
    bio: "Building robust APIs and scalable infrastructure. Loves distributed systems, clean architecture, and cooking elaborate dinners.",
    avatar: null,
    skills: ["Node.js", "PostgreSQL", "Docker", "AWS"],
    github: "github.com/viyataruta",
  },
  {
    id: "4",
    name: "Marco Delgado",
    role: "Full Stack Developer",
    email: "marco@example.com",
    location: "Chicago, IL",
    bio: "Bridging front and back to ship great products end-to-end. Enthusiast of open source, coffee, and basketball.",
    avatar: null,
    skills: ["React", "Python", "GraphQL", "PostgreSQL"],
    github: "github.com/marcodelgado",
  },
  {
    id: "5",
    name: "Sasha Petrova",
    role: "UX Designer",
    email: "sasha@example.com",
    location: "Seattle, WA",
    bio: "Turning complex problems into elegant, user-centered solutions. Motion design enthusiast and amateur ceramicist.",
    avatar: null,
    skills: ["Figma", "After Effects", "Interaction Design", "Illustration"],
    github: "github.com/sashapetrova",
  },
  {
    id: "6",
    name: "Devon Park",
    role: "DevOps Engineer",
    email: "devon@example.com",
    location: "Portland, OR",
    bio: "Keeping the trains running on time. Kubernetes, CI/CD pipelines, and late-night monitoring dashboards are my element.",
    avatar: null,
    skills: ["Kubernetes", "Terraform", "GitHub Actions", "Prometheus"],
    github: "github.com/devonpark",
  },
];

export const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "UX Designer",
  "DevOps Engineer",
];

/**
 * Get all profiles, optionally filtered by role title and/or name search.
 * Mirrors URL params: ?title=developer&search=John
 */
export function getProfiles({ title, search } = {}) {
  let results = [...PROFILES];

  if (title) {
    const t = title.toLowerCase();
    results = results.filter((p) => p.role.toLowerCase().includes(t));
  }

  if (search) {
    const s = search.toLowerCase();
    results = results.filter((p) => p.name.toLowerCase().includes(s));
  }

  return results;
}

export function getProfileById(id) {
  return PROFILES.find((p) => p.id === id) ?? null;
}

export function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
