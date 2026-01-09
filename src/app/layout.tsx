import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";
import PageTransition from "@/components/PageTransition";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KenChaTech | Lüks Teknoloji",
  description: "En yeni teknoloji ürünleri, lüks ve güvenilir alışveriş deneyimiyle KenChaTech'te.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-slate-50 text-slate-900 dark:bg-[#0B1120] dark:text-slate-100`}>
        <SplashScreen />
        <Toaster position="top-right" richColors theme="dark" />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
