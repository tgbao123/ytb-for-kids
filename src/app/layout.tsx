import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MobileBottomNav from "@/components/MobileBottomNav";

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ["latin", "vietnamese"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "YouTube Shorts",
  description: "YouTube Shorts Clone",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "YT Shorts",
    statusBarStyle: "black-translucent",
  },
  icons: {
    apple: "/icon-192.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body className={`${roboto.variable} font-sans bg-[#0f0f0f] text-white min-h-screen flex flex-col overflow-hidden`}>
        <Header />
        {/* Adjusted height for mobile without bottom nav */}
        <div className="flex flex-1 overflow-hidden h-[calc(100vh-56px)] relative">
          <Sidebar />
          <main className="flex-1 overflow-y-auto no-scrollbar relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
