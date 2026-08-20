import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // --- Users ---
  const passwordHash = await bcrypt.hash("Password123!", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      passwordHash,
      role: "ADMIN",
    },
  });

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@example.com",
      passwordHash,
      role: "USER",
    },
  });

  // --- Cars ---
  const carsData = [
    {
      make: "Tesla",
      model: "Model 3",
      year: 2024,
      pricePerDay: 85,
      imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89",
      description: "Electric sedan with autopilot and long range.",
    },
    {
      make: "Toyota",
      model: "Corolla",
      year: 2023,
      pricePerDay: 45,
      imageUrl: "https://images.unsplash.com/photo-1623869675184-6ba6a3ce6d9f",
      description: "Reliable, fuel-efficient compact sedan.",
    },
    {
      make: "BMW",
      model: "X5",
      year: 2024,
      pricePerDay: 120,
      imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e",
      description: "Luxury SUV with premium interior and performance.",
    },
    {
      make: "Ford",
      model: "Mustang",
      year: 2022,
      pricePerDay: 95,
      imageUrl: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd",
      description: "Iconic muscle car, thrilling on open roads.",
    },
  ];

  const cars = [];
  for (const c of carsData) {
    const car = await prisma.car.create({ data: c });
    cars.push(car);
  }

  // --- Bookings ---
  await prisma.booking.create({
    data: {
      userId: demoUser.id,
      carId: cars[0].id,
      startDate: new Date("2026-09-01"),
      endDate: new Date("2026-09-05"),
      totalPrice: cars[0].pricePerDay * 4,
      status: "CONFIRMED",
    },
  });

  await prisma.booking.create({
    data: {
      userId: demoUser.id,
      carId: cars[2].id,
      startDate: new Date("2026-09-10"),
      endDate: new Date("2026-09-12"),
      totalPrice: cars[2].pricePerDay * 2,
      status: "PENDING",
    },
  });

  console.log("Seed complete:", { admin: admin.email, demoUser: demoUser.email, cars: cars.length });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
