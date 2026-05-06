import { NextResponse } from "next/server";
import { addProfile, getProfiles } from "@/lib/profiles";

function parseSkills(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).map((item) => String(item).trim());
  }

  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function validateNewProfile(payload) {
  const requiredFields = ["name", "role", "email", "location", "bio"];
  const missingFields = requiredFields.filter((field) => {
    return !payload?.[field] || String(payload[field]).trim() === "";
  });

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get("title") ?? "";
  const search = searchParams.get("search") ?? "";
  const limit = Number.parseInt(searchParams.get("limit") ?? "", 10);
  const includeMeta = searchParams.get("meta") === "1";

  const filtered = getProfiles({ title, search });
  const data =
    Number.isFinite(limit) && limit > 0 ? filtered.slice(0, limit) : filtered;

  const response = {
    success: true,
    count: data.length,
    data,
  };

  if (includeMeta) {
    response.meta = {
      title,
      search,
      limit: Number.isFinite(limit) && limit > 0 ? limit : null,
      requestedBy: request.headers.get("x-lab-client") ?? "unknown",
      userAgent: request.headers.get("user-agent") ?? "unknown",
    };
  }

  return NextResponse.json(response, { status: 200 });
}

export async function POST(request) {
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

  const validation = validateNewProfile(payload);

  if (!validation.isValid) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing required fields.",
        missingFields: validation.missingFields,
      },
      { status: 400 },
    );
  }

  const created = addProfile({
    name: String(payload.name).trim(),
    role: String(payload.role).trim(),
    email: String(payload.email).trim(),
    location: String(payload.location).trim(),
    bio: String(payload.bio).trim(),
    skills: parseSkills(payload.skills),
    github: payload.github ? String(payload.github).trim() : "",
    avatar: payload.avatar ? String(payload.avatar).trim() : null,
  });

  return NextResponse.json(
    {
      success: true,
      message: "Profile created successfully.",
      data: created,
    },
    { status: 201 },
  );
}
