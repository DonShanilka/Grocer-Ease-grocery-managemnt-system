import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

import StoreProvider from "@/src/store/StoreProvider";
import GrocerySidebar from "@/src/components/layout/GrocerySidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "GrocerEase",
  description: "Grocery Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased bg-gray-50`}
      >
        <StoreProvider>
          <div className="flex min-h-screen">
            {/* Sidebar */}
            {/* <GrocerySidebar /> */}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
