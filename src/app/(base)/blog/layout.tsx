import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
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
    description: "Afaik - %s",
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <div className="container">{children}</div>;
}
