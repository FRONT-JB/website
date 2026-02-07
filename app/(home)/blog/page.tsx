import Link from "next/link";
import { blog } from "@/lib/source";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { BlogItem } from "@/components/blog-item";

export default function Page() {
  const pages = [...blog.getPages()].sort(
    (a, b) =>
      new Date(b.data.date ?? b.file.name).getTime() -
      new Date(a.data.date ?? a.file.name).getTime(),
  );
  return (
    <main className="flex flex-1 flex-col pb-20">
      <div className="relative py-16">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)] bg-[size:20px_20px]" />

        <h1 className="mb-8 text-center text-4xl font-bold md:text-5xl">
          블로그
        </h1>

        <div className="flex flex-row justify-center gap-2.5 max-sm:flex-col max-sm:items-stretch">
          <Link
            href="/blog/tags"
            className={cn(buttonVariants({ color: "primary" }), "gap-1")}
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
