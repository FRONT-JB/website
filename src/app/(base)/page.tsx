import type { Metadata } from "next";
import { domain } from "@config";

export const metadata: Metadata = {
  alternates: {
    canonical: domain,
  },
};

export default function HomePage() {
  return (
    <main className="overflow-x-clip">
      <div className="mx-auto flex max-w-[1400px] flex-col px-3 md:px-6">
        <h1>Hello World</h1>
      </div>
    </main>
  );
}
