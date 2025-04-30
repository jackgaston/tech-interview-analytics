/**
 * Root Layout Component
 * This is the top-level layout component that wraps all pages in the application.
 * It provides the basic HTML structure and global styles.
 * 
 * Features:
 * - Custom font loading (Geist Sans and Geist Mono)
 * - Global CSS imports
 * - Meta tags configuration
 * - Basic HTML structure
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

// Initialize Geist Sans font with Latin subset
const geistSans = Geist({
  variable: "--font-geist-sans", // CSS variable for font family
  subsets: ["latin"],
});

// Initialize Geist Mono font for monospace text
const geistMono = Geist_Mono({
  variable: "--font-geist-mono", // CSS variable for monospace font
  subsets: ["latin"],
});

// Configure metadata for SEO and social sharing
export const metadata: Metadata = {
  title: "CRM Dashboard - Modern Customer Management",
  description: "A powerful CRM dashboard built with Next.js, featuring customer management, notes, and analytics.",
};

// Root layout component that wraps all pages
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // Type for child components
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
