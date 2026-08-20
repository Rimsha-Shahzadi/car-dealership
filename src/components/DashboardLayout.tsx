"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
  userName,
}: {
  children: ReactNode;
  userName?: string | null;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <aside
        aria-label="Dashboard navigation"
        className="hidden w-60 flex-col border-r border-gray-200 bg-white p-6 sm:flex dark:border-gray-800 dark:bg-gray-900"
      >
        <Link href="/" className="mb-8 text-xl font-bold text-brand-600">DriveHub</Link>
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
            Overview
          </Link>
          <Link href="/dashboard#bookings" className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
            My Bookings
          </Link>
        </nav>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-auto rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          Sign out
        </button>
      </aside>

      <main className="flex-1 p-6 sm:p-10">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome back{userName ? `, ${userName}` : ""} 👋
          </h1>
        </header>
        {children}
      </main>
    </div>
  );
}
