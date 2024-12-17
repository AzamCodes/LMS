// @ts-ignore

import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Communication Skills" },
        { name: "Music" },
        { name: "Fitness" },
        { name: "Photography" },
        { name: "Accounting" },
        { name: "Engineering" },
      ],
      skipDuplicates: true,
    });
    console.log("Success");
  } catch (error) {
    console.log(error);
  } finally {
    await database.$disconnect();
  }
}
main();
