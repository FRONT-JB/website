import { urlBase } from "@config";
import type { Metadata } from "next";
import { Noto_Sans_TC } from "next/font/google";
import type { ReactNode } from "react";

import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";

const noto = Noto_Sans_TC({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: {
    template: "%s - Afaik",
    default: "Afaik",
    absolute: "Afaik",
  },
  description: "Afaik - As Far As I Know",
  openGraph: {
    images: "/afaik-og-image.png",
    title: {
      template: "%s - Afaik",
      absolute: "Afaik",
      default: "Afaik",
    },
    description: "Afaik - As Far As I Know",
  },
  metadataBase: urlBase,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={noto.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
