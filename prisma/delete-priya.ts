import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.doctor.deleteMany({
    where: {
      email: "priya.deshmukh@dentalai.com"
    }
  });
  console.log("Deleted Dr Priya");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
