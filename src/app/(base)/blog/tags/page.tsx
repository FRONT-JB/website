import Link from "next/link";
import { getTagHref, getTags, type TagInfo } from "@/utils/tags";
import { domain } from "@config";
import type { Metadata } from "next";
import { cn } from "@/utils/cn";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  alternates: {
    canonical: `${domain}/blog/tags`,
  },
};

export default function AllTags() {
  const tags: [string, TagInfo][] = [...getTags().entries()].sort(
    (a, b) => b[1].count - a[1].count,
  );

  return (
    <main className="my-16 flex w-full flex-col gap-3">
      <div className="mb-3 flex flex-col items-center gap-3 text-center">
        <h1 className="mb-4 text-5xl font-bold">전체 태그</h1>

        <Link href="/blog" className={cn(buttonVariants({ color: "primary" }))}>
          돌아가기
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {tags.map(([tag, info]) => (
          <Link
            key={tag}
            href={getTagHref(tag)}
            className="flex flex-row justify-between gap-3 rounded-md border bg-card p-2 text-card-foreground"
          >
            <span className="font-medium">{tag}</span>
            <span className="text-sm text-muted-foreground">{info.count}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
