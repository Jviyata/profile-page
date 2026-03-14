import Link from "next/link";
import { getInitials } from "@/lib/profiles";

export default function ProfileCard({ profile }) {
  const { id, name, role, avatar } = profile;

  return (
    <Link href={`/profiles/${id}`} className="profile-card">
      {avatar ? (
        <img src={avatar} alt={name} className="avatar" />
      ) : (
        <div className="avatar-placeholder">{getInitials(name)}</div>
      )}
      <span className="name">{name}</span>
      <span className="role">{role}</span>
    </Link>
  );
}
