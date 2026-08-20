import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "DriveHub — Rent your perfect car",
  description:
    "Browse and book verified rental cars in minutes. Instant confirmation, transparent pricing, 24/7 support.",
  keywords: ["car rental", "rent a car", "car booking", "DriveHub"],
  openGraph: {
    title: "DriveHub — Rent your perfect car",
    description: "Browse and book verified rental cars in minutes.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
