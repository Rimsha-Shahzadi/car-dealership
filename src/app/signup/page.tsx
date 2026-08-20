import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Sign up — DriveHub",
  description: "Create your free DriveHub account to start booking cars.",
};

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-16 sm:px-6">
        <h1 className="mb-8 text-center text-2xl font-bold">Create your account</h1>
        <SignupForm />
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account? <a href="/login" className="text-brand-600 hover:underline">Log in</a>
        </p>
      </main>
    </>
  );
}
