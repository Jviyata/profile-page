import Link from "next/link";
import { getProfileById } from "@/lib/profiles";
import { notFound } from "next/navigation";
import EditProfileForm from "@/components/EditProfileForm";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const profile = getProfileById(id);

  if (!profile) {
    return { title: "Profile Not Found" };
  }

  return {
    title: `Edit ${profile.name}`,
    description: `Update details for ${profile.name}.`,
  };
}

export default async function EditProfilePage({ params }) {
  const { id } = await params;
  const profile = getProfileById(id);

  if (!profile) {
    notFound();
  }

  return (
    <div className="form-page-shell">
      <div className="page-header page-header-compact">
        <h1>Edit Profile</h1>
        <p>Update profile details or remove this profile.</p>
      </div>

      <div className="form-card">
        <Link href={`/profiles/${id}`} className="back-link">
          ← Back to Profile
        </Link>
        <EditProfileForm profile={profile} />
      </div>
    </div>
  );
}
