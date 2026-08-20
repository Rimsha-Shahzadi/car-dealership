import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/cars -> list all cars (supports ?available=true)
export async function GET(req: NextRequest) {
  const available = req.nextUrl.searchParams.get("available");
  const cars = await prisma.car.findMany({
    where: available ? { available: available === "true" } : undefined,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ cars });
}

// POST /api/cars -> create a new car (admin only in a real app)
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const car = await prisma.car.create({ data });
    return NextResponse.json({ car }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not create car" }, { status: 500 });
  }
}
