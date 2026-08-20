import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CarCard from "@/components/CarCard";
import { prisma } from "@/lib/prisma";

export const revalidate = 60; // ISR: refresh car listing every 60s

export default async function HomePage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <section id="cars" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Available cars
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </section>

        <Features />
      </main>

      <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 dark:border-gray-800">
        © {new Date().getFullYear()} DriveHub. All rights reserved.
      </footer>
    </>
  );
}
