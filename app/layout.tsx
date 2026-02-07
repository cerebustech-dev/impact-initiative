import type { Metadata } from "next";
import { Source_Serif_4, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Impact Initiative | Leadership Development Program",
  description:
    "A 6-month leadership development journey for supervisors and managers, in partnership with Walsh College.",
  openGraph: {
    title: "The Impact Initiative | Leadership Development Program",
    description:
      "A 6-month leadership development journey for supervisors and managers, in partnership with Walsh College.",
    type: "website",
    url: "https://rodsaiclass.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
