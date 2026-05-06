"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROLES } from "@/lib/profiles";

function skillsToString(skills) {
  if (Array.isArray(skills)) return skills.join(", ");
  if (typeof skills === "string") return skills;
  return "";
}

export default function EditProfileForm({ profile }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  async function handleSave(event) {
    event.preventDefault();
    setIsSaving(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      role: formData.get("role"),
      email: formData.get("email"),
      location: formData.get("location"),
      bio: formData.get("bio"),
      skills: formData.get("skills"),
      github: formData.get("github"),
      avatar: formData.get("avatar"),
    };

    try {
      const response = await fetch(`/api/profiles/${profile.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to update profile.");
      }

      router.push(`/profiles/${profile.id}`);
      router.refresh();
    } catch (error) {
      setMessageType("error");
      setMessage(error.message || "Something went wrong while updating.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this profile permanently? This action cannot be undone.",
    );

    if (!confirmed) return;

    setIsDeleting(true);
    setMessage("");

    try {
      const response = await fetch(`/api/profiles/${profile.id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to delete profile.");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setMessageType("error");
      setMessage(error.message || "Something went wrong while deleting.");
      setIsDeleting(false);
    }
  }

  return (
    <form className="profile-form" onSubmit={handleSave}>
      <div className="form-grid">
        <label className="form-field">
          <span>Full Name</span>
          <input name="name" type="text" defaultValue={profile.name} required />
        </label>

        <label className="form-field">
          <span>Email</span>
          <input
            name="email"
            type="email"
            defaultValue={profile.email}
            required
          />
        </label>

        <label className="form-field">
          <span>Role</span>
          <select name="role" defaultValue={profile.role} required>
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span>Location</span>
          <input
            name="location"
            type="text"
            defaultValue={profile.location}
            required
          />
        </label>

        <label className="form-field form-field-full">
          <span>Bio</span>
          <textarea name="bio" rows="5" defaultValue={profile.bio} required />
        </label>

        <label className="form-field form-field-full">
          <span>Skills</span>
          <input
            name="skills"
            type="text"
            defaultValue={skillsToString(profile.skills)}
            placeholder="React, Product Design, Node.js"
          />
        </label>

        <label className="form-field form-field-full">
          <span>GitHub</span>
          <input
            name="github"
            type="text"
            defaultValue={profile.github}
            placeholder="github.com/your-username"
          />
        </label>

        <label className="form-field form-field-full">
          <span>Avatar URL</span>
          <input
            name="avatar"
            type="url"
            defaultValue={profile.avatar ?? ""}
            placeholder="https://example.com/avatar.jpg"
          />
        </label>
      </div>

      <div className="form-actions">
        <div className="form-button-group">
          <button type="submit" className="btn-primary" disabled={isSaving || isDeleting}>
            {isSaving ? "Saving..." : "Update Profile"}
          </button>
          <button
            type="button"
            className="btn-danger"
            onClick={handleDelete}
            disabled={isSaving || isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Profile"}
          </button>
        </div>
      </div>

      {message && (
        <p className={`form-message form-message-${messageType}`}>{message}</p>
      )}
    </form>
  );
}
