import { NextResponse } from "next/server";
import {
  deleteStudentById,
  getStudentById,
  updateStudentById,
} from "@/lib/students";

function validateStudent(payload, { partial = false } = {}) {
  const errors = [];

  if (!partial || payload.name !== undefined) {
    if (typeof payload.name !== "string" || payload.name.trim() === "") {
      errors.push("name must be a non-empty string");
    }
  }

  if (!partial || payload.major !== undefined) {
    if (typeof payload.major !== "string" || payload.major.trim() === "") {
      errors.push("major must be a non-empty string");
    }
  }

  if (!partial || payload.year !== undefined) {
    const year = Number(payload.year);
    if (!Number.isFinite(year) || year < 1 || year > 4) {
      errors.push("year must be a number between 1 and 4");
    }
  }

  if (!partial || payload.gpa !== undefined) {
    const gpa = Number(payload.gpa);
    if (!Number.isFinite(gpa) || gpa < 0 || gpa > 4) {
      errors.push("gpa must be a number between 0 and 4");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function normalizeStudent(payload, { partial = false } = {}) {
  const normalized = {};

  if (!partial || payload.name !== undefined) {
    normalized.name = String(payload.name).trim();
  }

  if (!partial || payload.major !== undefined) {
    normalized.major = String(payload.major).trim();
  }

  if (!partial || payload.year !== undefined) {
    normalized.year = Number(payload.year);
  }

  if (!partial || payload.gpa !== undefined) {
    normalized.gpa = Number(payload.gpa);
  }

  return normalized;
}

export async function GET(_request, { params }) {
  const { id } = await params;
  const student = getStudentById(id);

  if (!student) {
    return NextResponse.json(
      {
        success: false,
        message: "Student not found.",
      },
      { status: 404 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      data: student,
    },
    { status: 200 },
  );
}

export async function PATCH(request, { params }) {
  const { id } = await params;

  if (!getStudentById(id)) {
    return NextResponse.json(
      {
        success: false,
        message: "Student not found.",
      },
      { status: 404 },
    );
  }

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

  if (Object.keys(payload).length === 0) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing or invalid fields.",
      },
      { status: 400 },
    );
  }

  const validation = validateStudent(payload, { partial: true });

  if (!validation.valid) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing or invalid fields.",
        errors: validation.errors,
      },
      { status: 400 },
    );
  }

  const updated = updateStudentById(
    id,
    normalizeStudent(payload, { partial: true }),
  );

  return NextResponse.json(
    {
      success: true,
      data: updated,
    },
    { status: 200 },
  );
}

export async function PUT(request, context) {
  return PATCH(request, context);
}

export async function DELETE(_request, { params }) {
  const { id } = await params;
  const removed = deleteStudentById(id);

  if (!removed) {
    return NextResponse.json(
      {
        success: false,
        message: "Student not found.",
      },
      { status: 404 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      data: removed,
    },
    { status: 200 },
  );
}
