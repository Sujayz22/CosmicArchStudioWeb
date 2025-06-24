import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./marquee-animations.css";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Analytics} from "@vercel/analytics/next";
import ClientLayout from "./components/ClientLayout";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: "Cosmic Arch Studio - Modern Architectural Design",
  description: "Transform your space with innovative architectural design solutions from Cosmic Arch Studio.",
  icons: {
    icon: [
      {
        url: '/tablogo.webp',
        type: 'image/webp',
      }
    ],
    apple: [
      {
        url: '/tablogo.webp',
        type: 'image/webp',
      }
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/tablogo.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/tablogo.webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://calm-addition-271c24a97d.strapiapp.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={cn(
        "min-h-screen bg-neutral-light antialiased",
        inter.className,
      )}>
        <ClientLayout>
          {children}
          <SpeedInsights />
          <Analytics />
          <SmoothCursor />
        </ClientLayout>
      </body>
    </html>
  );
} 