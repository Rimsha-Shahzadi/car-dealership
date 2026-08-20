import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Log in — DriveHub",
  description: "Log in to manage your bookings on DriveHub.",
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <h1 className="mb-8 text-center text-2xl font-bold">Welcome back</h1>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account? <a href="/signup" className="text-brand-600 hover:underline">Sign up</a>
        </p>
      </main>
    </>
  );
}
