import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KenChaTech | Lüks Teknoloji Mağazası",
  description: "En yeni teknoloji ürünleri, lüks ve güvenilir alışveriş deneyimiyle KenChaTech'te.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} antialiased bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100`}>
        {children}
      </body>
    </html>
  );
}