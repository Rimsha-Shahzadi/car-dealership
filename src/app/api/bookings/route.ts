import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/bookings -> current user's bookings (with car + user relations)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: { car: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ bookings });
}

// POST /api/bookings -> create a booking for the logged-in user
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { carId, startDate, endDate } = await req.json();
    const car = await prisma.car.findUnique({ where: { id: carId } });
    if (!car) return NextResponse.json({ error: "Car not found" }, { status: 404 });

    const days = Math.max(
      1,
      Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000)
    );

    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        carId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice: days * car.pricePerDay,
      },
      include: { car: true },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not create booking" }, { status: 500 });
  }
}
