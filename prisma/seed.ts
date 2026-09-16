import { PrismaClient, Gender } from "@prisma/client";

const prisma = new PrismaClient();

const sampleDoctors = [
  {
    name: "Dr. Sarah Mitchell",
    email: "sarah.mitchell@dentwise.com",
    phone: "+1 (555) 234-5678",
    speciality: "General & Cosmetic Dentistry",
    bio: "Over 12 years of experience in restorative and aesthetic dentistry with gentle care.",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
    gender: Gender.FEMALE,
    isActive: true,
  },
  {
    name: "Dr. James Wilson",
    email: "james.wilson@dentwise.com",
    phone: "+1 (555) 876-5432",
    speciality: "Orthodontist",
    bio: "Specialist in braces, clear aligners, and bite correction for teens and adults.",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
    gender: Gender.MALE,
    isActive: true,
  },
  {
    name: "Dr. Elena Rostova",
    email: "elena.rostova@dentwise.com",
    phone: "+1 (555) 345-6789",
    speciality: "Pediatric Dentistry & Implants",
    bio: "Passionate about pain-free dental procedures and preventive oral healthcare.",
    imageUrl: "https://images.unsplash.com/photo-1594824813627-995b0bfcf693?auto=format&fit=crop&q=80&w=300",
    gender: Gender.FEMALE,
    isActive: true,
  },
];

async function main() {
  console.log("Seeding doctors...");
  for (const doc of sampleDoctors) {
    await prisma.doctor.upsert({
      where: { email: doc.email },
      update: {},
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
