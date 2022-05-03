import { prisma } from "../src/database.js";

async function seed() {
  console.log(process.env.DATABASE_URL);

  await prisma.category.deleteMany({});
  await prisma.category.createMany({
    data: [{ name: "P1" }, { name: "P2" }, { name: "P3" }],
  });

  await prisma.teacher.deleteMany({});
  await prisma.teacher.createMany({
    data: [
      { id: 1, name: "teacher 1" },
      { id: 2, name: "teacher 2" },
      { id: 3, name: "teacher 3" },
    ],
  });

  await prisma.term.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      number: 1,
    },
  });

  await prisma.discipline.deleteMany({});
  await prisma.discipline.createMany({
    data: [
      { id: 1, name: "Discipline 1", termId: 1 },
      { id: 2, name: "Discipline 2", termId: 1 },
      { id: 3, name: "Discipline 3", termId: 1 },
    ],
  });

  await prisma.teacherDiscipline.deleteMany({});
  await prisma.teacherDiscipline.createMany({
    data: [
      { teacherId: 1, disciplineId: 1 },
      { teacherId: 2, disciplineId: 2 },
      { teacherId: 3, disciplineId: 3 },
    ],
  });
}

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
