import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://peerproducts.in"),
  title: {
    default: "PeerProducts | Discover products through real recommendations",
    template: "%s | PeerProducts",
  },
  description: "A social network where people discover products through real user recommendations and reviews",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "PeerProducts | Discover products through real recommendations",
    description: "A social network where people discover products through real user recommendations and reviews",
    url: "https://peerproducts.in",
    siteName: "PeerProducts",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PeerProducts | Discover products through real recommendations",
    description: "A social network where people discover products through real user recommendations and reviews",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-300">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
