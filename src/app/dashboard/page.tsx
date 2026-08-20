import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardLayout from "@/components/DashboardLayout";
import StatsCard from "@/components/StatsCard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: { car: true },
    orderBy: { createdAt: "desc" },
  });

  const totalSpent = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const activeBookings = bookings.filter((b) => b.status === "CONFIRMED").length;

  return (
    <DashboardLayout userName={session.user.name}>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatsCard label="Total bookings" value={bookings.length} />
        <StatsCard label="Active bookings" value={activeBookings} />
        <StatsCard label="Total spent" value={`$${totalSpent.toFixed(2)}`} />
      </section>

      <section id="bookings" className="mt-10">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">My bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You haven&apos;t made any bookings yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-800">
              <caption className="sr-only">List of your car bookings</caption>
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left font-medium">Car</th>
                  <th scope="col" className="px-4 py-3 text-left font-medium">Dates</th>
                  <th scope="col" className="px-4 py-3 text-left font-medium">Status</th>
                  <th scope="col" className="px-4 py-3 text-left font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td className="px-4 py-3">{b.car.make} {b.car.model}</td>
                    <td className="px-4 py-3">
                      {b.startDate.toLocaleDateString()} – {b.endDate.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">${b.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}
