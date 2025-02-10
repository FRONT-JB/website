import { blog } from "@/app/source";
import { BlogItem } from "@/components/blog/blog-item";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { getTags } from "@/utils/tags";
import { domain } from "@config";
import Link from "next/link";

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const decodedTag = decodeURIComponent((await params).tag);
  const pages = blog
    .getPages()
    .filter((blog) =>
      blog.data.tags.some((tag) => tag.toLowerCase() === decodedTag),
    );

  return (
    <main className="my-16 flex w-full flex-1 flex-col gap-5">
      <div className="mb-5 flex flex-col items-center gap-5 text-center">
        <h1 className="mb-4 text-3xl font-bold">{`「 ${decodedTag} 」`}</h1>

        <Link
          href="/blog/tags"
          className={cn(buttonVariants({ color: "primary" }))}
        >
          돌아가기
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <BlogItem key={page.url} page={page} />
        ))}
      </div>
    </main>
  );
}

export function generateStaticParams() {
  const tags = [...getTags().keys()];

  return tags.map((key) => ({
    // Next.js in dev mode will encode the component automatically
    tag:
      process.env.NODE_ENV === "production"
        ? key.toLowerCase()
        : encodeURIComponent(key.toLowerCase()),
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;
  const decodedTag = decodeURIComponent(params.tag);

  return {
    title: `「 ${decodedTag} 」`,
    alternates: {
      canonical: `${domain}/blog/tags/${params.tag}`,
    },
    openGraph: {
      images: "/afaik-og-image.png",
      title: `「 ${decodedTag} 」`,
    },
  };
}
