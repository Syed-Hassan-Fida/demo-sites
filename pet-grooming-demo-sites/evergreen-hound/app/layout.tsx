import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Evergreen Hound | Force-free dog grooming & photography — East Austin",
  description:
    "Demo redesign for Evergreen Hound — Fear Free grooming, Austin spa add-ons, and pet photography in East Austin.",
  openGraph: {
    title: "Evergreen Hound — kinder grooming for Austin pups",
    description:
      "Force-free salon grooming + photography. Redesign demo for Noel & team.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${outfit.variable}`}>{children}</body>
    </html>
  );
}
