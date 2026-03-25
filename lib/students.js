export let students = [
  { id: 1, name: "Ava Lee", major: "CS", year: 2, gpa: 3.6 },
  { id: 2, name: "Ben Park", major: "CGT", year: 3, gpa: 3.2 },
];

export function getStudents(filters = {}) {
  let results = [...students];

  if (filters.major) {
    const major = String(filters.major).toLowerCase();
    results = results.filter(
      (student) => student.major.toLowerCase() === major,
    );
  }

  if (
    filters.year !== undefined &&
    filters.year !== null &&
    filters.year !== ""
  ) {
    const year = Number(filters.year);
    if (Number.isFinite(year)) {
      results = results.filter((student) => student.year === year);
    }
  }

  if (filters.name) {
    const name = String(filters.name).toLowerCase();
    results = results.filter((student) =>
      student.name.toLowerCase().includes(name),
    );
  }

  return results;
}

export function getStudentById(id) {
  const numericId = Number(id);
  return students.find((student) => student.id === numericId) ?? null;
}

export function addStudent(input) {
  const student = {
    id: Date.now(),
    name: input.name,
    major: input.major,
    year: input.year,
    gpa: input.gpa,
  };

  students.push(student);
  return student;
}

export function updateStudentById(id, updates) {
  const student = getStudentById(id);

  if (!student) {
    return null;
  }

  Object.assign(student, updates);
  return student;
}

export function deleteStudentById(id) {
  const numericId = Number(id);
  const index = students.findIndex((student) => student.id === numericId);

  if (index === -1) {
    return null;
  }

  const [removed] = students.splice(index, 1);
  return removed;
}
