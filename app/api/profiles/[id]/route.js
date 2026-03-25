import { NextResponse } from "next/server";
import {
  deleteProfileById,
  getProfileById,
  updateProfileById,
} from "@/lib/profiles";

function parseSkills(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value !== "string") {
    return undefined;
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeUpdates(payload) {
  const updates = {};

  const fields = [
    "name",
    "role",
    "email",
    "location",
    "bio",
    "github",
    "avatar",
  ];

  for (const field of fields) {
    if (payload[field] !== undefined) {
      updates[field] = String(payload[field]).trim();
    }
  }

  if (payload.skills !== undefined) {
    const parsedSkills = parseSkills(payload.skills);
    if (parsedSkills) {
      updates.skills = parsedSkills;
    }
  }

  return updates;
}

export async function GET(_request, { params }) {
  const { id } = await params;
  const profile = getProfileById(id);

  if (!profile) {
    return NextResponse.json(
      {
        success: false,
        message: `Profile with id ${id} was not found.`,
      },
      { status: 404 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      data: profile,
    },
    { status: 200 },
  );
}

export async function PATCH(request, { params }) {
  const { id } = await params;

  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid JSON body.",
      },
      { status: 400 },
    );
  }

  const updates = normalizeUpdates(payload);

  if (Object.keys(updates).length === 0) {
    return NextResponse.json(
      {
        success: false,
        message: "No updatable fields were provided.",
      },
      { status: 400 },
    );
  }

  const updated = updateProfileById(id, updates);

  if (!updated) {
    return NextResponse.json(
      {
        success: false,
        message: `Profile with id ${id} was not found.`,
      },
      { status: 404 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Profile updated successfully.",
      data: updated,
    },
    { status: 200 },
  );
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  const removed = deleteProfileById(id);

  if (!removed) {
    return NextResponse.json(
      {
        success: false,
        message: `Profile with id ${id} was not found.`,
      },
      { status: 404 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Profile deleted successfully.",
      data: removed,
    },
    { status: 200 },
  );
}
