import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Asiami — アジアミ | Asia's Market in Japan",
  description: "Pan-Asian marketplace in Japan connecting Asian-owned businesses with Asian diaspora communities. Shop authentic products from Myanmar, Vietnam, Nepal, China, Thailand, Indonesia, and more.",
  keywords: "Asian market Japan, Myanmar shop Japan, Vietnamese food Japan, Nepali products Japan, アジア マーケット 日本",
  openGraph: {
    title: "Asiami — Asia's Market in Japan",
    description: "Authentic Asian products from community-verified sellers across Japan",
    siteName: "Asiami",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-brand-cream`}>
        {children}
      </body>
    </html>
  );
}
