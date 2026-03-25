"use client";

import { useState } from "react";
import { ROLES } from "@/lib/profiles";

export default function AddProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      location: formData.get("location"),
      bio: formData.get("bio"),
      skills: formData.get("skills"),
      github: formData.get("github"),
    };

    try {
      const response = await fetch("/api/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-lab-client": "add-profile-form",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to create profile.");
      }

      setMessageType("success");
      setMessage(`Saved! New profile id: ${result.data.id}`);
      event.currentTarget.reset();
    } catch (error) {
      setMessageType("error");
      setMessage(error.message || "Something went wrong while saving profile.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="form-field">
          <span>Full Name</span>
          <input
            name="name"
            type="text"
            placeholder="e.g. Jordan Lee"
            required
          />
        </label>

        <label className="form-field">
          <span>Email</span>
          <input
            name="email"
            type="email"
            placeholder="jordan@example.com"
            required
          />
        </label>

        <label className="form-field">
          <span>Role</span>
          <select name="role" defaultValue="" required>
            <option value="" disabled>
              Select a role
            </option>
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
            placeholder="e.g. Nairobi, Kenya"
            required
          />
        </label>

        <label className="form-field form-field-full">
          <span>Bio</span>
          <textarea
            name="bio"
            rows="5"
            placeholder="Share a short intro, strengths, and what this person brings to the team."
            required
          />
        </label>

        <label className="form-field form-field-full">
          <span>Skills</span>
          <input
            name="skills"
            type="text"
            placeholder="React, Product Design, Node.js"
          />
        </label>

        <label className="form-field form-field-full">
          <span>GitHub</span>
          <input
            name="github"
            type="text"
            placeholder="github.com/your-username"
          />
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Profile"}
        </button>
        <p>
          Posts to <strong>/api/profiles</strong> and returns JSON + status
          codes.
        </p>
      </div>

      {message && (
        <p className={`form-message form-message-${messageType}`}>{message}</p>
      )}
    </form>
  );
}
