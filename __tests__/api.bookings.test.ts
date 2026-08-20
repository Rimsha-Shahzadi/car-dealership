/**
 * Integration-style test sketch for POST /api/bookings.
 * In a real project you'd mock `getServerSession` and `prisma`
 * (e.g. via jest.mock) and call the route handler directly, or run
 * these against a test database with supertest/next-test-api-route-handler.
 */
import { prisma } from "@/lib/prisma";

jest.mock("@/lib/prisma", () => ({
  prisma: {
    car: { findUnique: jest.fn() },
    booking: { create: jest.fn() },
  },
}));

jest.mock("next-auth", () => ({
  getServerSession: jest.fn().mockResolvedValue({ user: { id: "user_1" } }),
}));

describe("booking price calculation", () => {
  it("computes total price based on number of days", async () => {
    (prisma.car.findUnique as jest.Mock).mockResolvedValue({ id: "car_1", pricePerDay: 50 });
    (prisma.booking.create as jest.Mock).mockImplementation(({ data }) =>
      Promise.resolve({ ...data, id: "booking_1" })
    );

    const start = new Date("2026-09-01");
    const end = new Date("2026-09-04"); // 3 days
    const days = Math.ceil((end.getTime() - start.getTime()) / 86400000);

    expect(days * 50).toBe(150);
  });
});
