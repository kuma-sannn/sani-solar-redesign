import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Best Solar Panel Installation in Mumbai | Sani Solar Solutions",
  description: "Select Green Energy for Business Success and a Healthier Planet with Sani Solar. Get the best solar panel installation in Mumbai for residential and commercial.",
  keywords: ["Solar Panel Installation Mumbai", "Sani Solar Solutions", "Commercial Solar", "Residential Solar", "Solar ROI Calculator"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased text-foreground bg-background`}>
        {children}
      </body>
    </html>
  );
}
