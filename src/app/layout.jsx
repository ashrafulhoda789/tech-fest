
import { Ubuntu } from "next/font/google";
import "./globals.css";
import AppThemeProvider from "../components/common/AppThemeProvider";
import Navbar from "@/components/common/Navbar";
import TopBar from "@/components/common/TopBar";
import Footer from "@/components/common/Footer";

const ubuntu = Ubuntu({
	variable: "--font-ubuntu",
	subsets: ["latin"],
	weight: ['300', '400', '500', '700']
});

export const metadata = {
	title: "Tech Fest",
	description: "BGC Trust University Tech Fest 2026",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${ubuntu.className} antialiased bg-background text-foreground min-h-screen flex flex-col`}
			>
				<AppThemeProvider>
					<TopBar />
					<Navbar />
					<main className="flex-1">
						{children}
					</main>
					<Footer />
				</AppThemeProvider>
			</body>
		</html>
	);
}
