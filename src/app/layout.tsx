import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "舞バズ | 日本舞踊をもっと気軽にもっと手軽に",
  description: "日本舞踊のエントリー・プラットフォーム ✕ 教室運営SaaS",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "舞バズ",
  },
};

export const viewport: Viewport = {
  themeColor: "#1D3557",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // アプリっぽくズームを無効化
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="antialiased selection:bg-[#E63946] selection:text-white">
        {children}
      </body>
    </html>
  );
}