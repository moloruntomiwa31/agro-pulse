import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Toaster from "../components/ui/Toaster";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { RootClientWrapper } from "@/components/providers/RootClientWrapper";

const plusJakartaSans = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-plus-jakarta-sans",
	display: "swap",
	weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
	title: "AgroPulse — AI-Powered Farm Marketplace",
	description:
		"Connect farmers directly with buyers and delivery transporters. Real-time produce demand forecasting and smart payment coordination for the intelligent agricultural economy.",
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
			"Connect farmers directly with buyers and delivery transporters. AI-powered produce demand forecasting.",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${plusJakartaSans.variable}`}>
			<body className="antialiased">
				<QueryProvider>
					<RootClientWrapper>{children}</RootClientWrapper>
					<Toaster />
				</QueryProvider>
			</body>
		</html>
	);
}
