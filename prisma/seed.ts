import { PrismaClient } from "../src/generated/prisma";
const prisma = new PrismaClient();

async function main() {
  await prisma.language.createMany({
    data: [
      { name: "English" },
      { name: "Ukrainian" },
      { name: "German" },
      { name: "Polish" },
      { name: "Spanish" },
      { name: "French" },
      { name: "Italian" },
      { name: "Portuguese" },
      { name: "Dutch" },
      { name: "Russian" },
      { name: "Turkish" },
      { name: "Arabic" },
      { name: "Chinese" },
      { name: "Japanese" },
      { name: "Korean" },
      { name: "Hindi" },
      { name: "Greek" },
      { name: "Swedish" },
      { name: "Norwegian" },
      { name: "Finnish" },
    ],
  });

  await prisma.languageLevel.createMany({
    data: [
      { name: "Basic" },
      { name: "Intermediate" },
      { name: "Advanced" },
      { name: "Fluent" },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
