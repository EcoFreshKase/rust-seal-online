import type { Metadata } from "next";
import { FileProvider } from "@/context/FileContext";
import { PasswordProvider } from "../context/PasswordContext";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seal Online",
  description: "Created by EcoFreshKase (GitHub)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FileProvider>
          <PasswordProvider>
            {children}
          </PasswordProvider>
        </FileProvider>
      </body>
    </html>
  );
}
