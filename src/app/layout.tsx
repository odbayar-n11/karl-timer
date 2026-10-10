import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DebateProvider } from "@/context/DebateContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Karl Popper Debate Timer",
  description: "Карл Попперын мэтгэлцээний цаг бүртгэгч",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="mn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <DebateProvider>
          <div className="min-h-screen text-[#720314] bg-white p-6">
            {children}
          </div>
        </DebateProvider>
      </body>
    </html>
  );
}
