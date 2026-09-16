import { PrismaClient, Gender } from "@prisma/client";

const prisma = new PrismaClient();

const sampleDoctors = [
  {
    name: "Dr. Ananya Sharma",
    email: "ananya.sharma@dentalai.com",
    phone: "+91 98765 43210",
    speciality: "General & Cosmetic Dentistry",
    bio: "Experienced in restorative and cosmetic dentistry with a focus on comfortable, patient-centered care.",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
    gender: Gender.FEMALE,
    isActive: true,
  },
  {
    name: "Dr. Rahul Mehta",
    email: "rahul.mehta@dentalai.com",
    phone: "+91 98234 56789",
    speciality: "Orthodontics",
    bio: "Specialist in braces, clear aligners, and bite correction for teenagers and adults.",
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1170&auto=format&fit=crop",
    gender: Gender.MALE,
    isActive: true,
  }
];
async function main() {
  console.log("Seeding doctors...");
  for (const doc of sampleDoctors) {
    await prisma.doctor.upsert({
      where: { email: doc.email },
      update: doc,
      create: doc,
    });
  }
  console.log("Sample doctors seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
