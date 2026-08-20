"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
      >
        <Link href="/" className="text-xl font-bold text-brand-600 dark:text-brand-500" aria-label="DriveHub home">
          DriveHub
        </Link>

        <button
          className="sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block h-0.5 w-6 bg-gray-800 dark:bg-gray-100" />
        </button>

        <div className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-14 flex-col gap-4 bg-white p-4 shadow-md sm:static sm:flex sm:flex-row sm:items-center sm:gap-6 sm:bg-transparent sm:p-0 sm:shadow-none dark:bg-gray-950`}>
          <Link href="/#cars" className="text-sm font-medium hover:text-brand-600">Cars</Link>
          <Link href="/#features" className="text-sm font-medium hover:text-brand-600">Features</Link>

          {status === "authenticated" ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium hover:text-brand-600">Dashboard</Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:text-brand-600">Log in</Link>
              <Link
                href="/signup"
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
