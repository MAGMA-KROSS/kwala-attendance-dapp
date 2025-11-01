import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Plasma from "../../Plasma/Plasma";
import Navbar from "./Component/Navbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kwala PoP NFT Attendance",
  description: "Web3 Attendance System with Kwala Automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="hidden md:block" style={{ position: 'fixed', inset: 0, zIndex: -10 }}>
          <Plasma mouseInteractive={false} />
        </div>
        <main>
          <Navbar/>
          {children}
       
        </main>
      </body>
    </html>
  );
}
