import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AgroPulse — AI-Powered Farm Marketplace",
  description:
    "Connect farmers directly with buyers and delivery riders. Real-time produce demand forecasting and smart payment coordination for the intelligent agricultural economy.",
  keywords: [
    "agriculture marketplace",
    "farm direct",
    "produce buyers",
    "farm delivery",
    "AI farming",
    "demand forecasting",
  ],
  openGraph: {
    title: "AgroPulse — AI-Powered Farm Marketplace",
    description:
      "Connect farmers directly with buyers and delivery riders. AI-powered produce demand forecasting.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
