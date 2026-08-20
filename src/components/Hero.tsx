import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-brand-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
          Find your perfect ride,
          <span className="text-brand-600"> rent it in minutes.</span>
        </h1>
        <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Browse hundreds of verified cars, book instantly, and manage every trip from one simple dashboard.
        </p>
        <div className="flex gap-4">
          <Link
            href="/signup"
            className="rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white shadow hover:bg-brand-700"
            aria-label="Create a free account"
          >
            Get started free
          </Link>
          <Link
            href="#cars"
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800"
          >
            Browse cars
          </Link>
        </div>
      </div>
    </section>
  );
}
