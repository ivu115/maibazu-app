import type { Metadata } from "next";
import { Noto_Sans_JP, Geist } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "舞バズ | 日本舞踊を、かつての歌舞伎のようにポップな文化へ",
  description:
    "敷居が高い・月謝が不明・着物がない——一歩目の不安を解消する、日本舞踊の入口プラットフォーム。完全明朗会計・手ぶらOK・J-POP対応の3回完結体験パッケージ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={cn("h-full", "antialiased", notoSansJP.variable, "font-sans", geist.variable)}>
      <body className="min-h-full bg-maibazu-bg text-maibazu-ink">{children}</body>
    </html>
  );
}
