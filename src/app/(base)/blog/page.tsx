import { BlogItem } from "@/components/blog/blog-item";
import { EyeIcon } from "lucide-react";
import { domain } from "@config";
import type { Metadata } from "next";
import { blog } from "@/app/source";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  alternates: {
    canonical: `${domain}/blog`,
  },
};

export default function BlogIndex() {
  const pages = blog
    .getPages()
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return (
    <main className="flex flex-1 flex-col pb-20">
      <div className="relative py-16">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]" />

        <h1 className="mb-8 text-center text-4xl font-bold md:text-5xl">
          블로그
        </h1>

        <div className="flex flex-row justify-center gap-2.5 max-sm:flex-col max-sm:items-stretch">
          <Link
            href="/blog/tags"
            className={cn(buttonVariants({ color: "primary" }))}
          >
            <EyeIcon className="size-4" />
            태그 모아보기
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <BlogItem key={page.url} page={page} />
        ))}
      </div>
    </main>
  );
}
