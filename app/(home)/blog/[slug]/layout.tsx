import { AuthorData, blogAuthors } from "@/lib/config";
import { blog } from "@/lib/source";
import { getTagHref } from "@/lib/tags";
import type { InferPageType } from "fumadocs-core/source";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Fragment } from "react";

export default async function BlogLayout({
  params,
  children,
}: {
  params: Promise<{ slug: string }>;
  children: ReactNode;
}) {
  const page = blog.getPage([(await params).slug]);

  if (!page) notFound();

  return (
    <main
      className="relative mx-auto w-full max-w-[800px] py-10 sm:py-20"
      itemType="http://schema.org/Article"
      itemScope
    >
      <div className="absolute inset-0 -z-10 h-[225px] w-full bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)] bg-[size:20px_20px]" />

      <h1 className="mb-2 text-3xl leading-normal font-bold" itemProp="name">
        {page.data.title}
      </h1>

      <div className="mt-3 mb-3 flex flex-row flex-wrap items-center gap-1">
        <div className="flex flex-row flex-wrap gap-1">
          {page.data.authors.map((author, i) => (
            <Fragment key={i}>
              {i !== 0 && <span className="mx-1">+</span>}
              <SmallAuthor author={blogAuthors[author]} />
            </Fragment>
          ))}
        </div>

        <p className="text-muted-foreground text-sm">
          <span className="mr-1">•</span>
          <span itemProp="datePublished">
            {new Date(
              page?.data?.lastModified || page?.data?.date,
            ).toLocaleDateString("ko-KR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <InlineTOC items={page.data.toc}>목차</InlineTOC>
        {children}
      </div>

      <Footer page={page} />
    </main>
  );
}

function SmallAuthor({ author }: { author: AuthorData }) {
  return (
    <a
      className="text-foreground flex flex-row items-center gap-1.5"
      href={author.url ?? "#"}
      rel="nofollow noreferrer"
      target="_blank"
      itemProp="author"
    >
      {author.image_url != null && (
        <Image
          alt="avatar"
          src={author.image_url}
          width={25}
          height={25}
          className="h-full rounded-full"
        />
      )}
      {author.name}
    </a>
  );
}

function Footer({ page }: { page: InferPageType<typeof blog> }) {
  return (
    <div className="mt-[5rem] flex flex-col gap-6">
      <div className="flex flex-row flex-wrap gap-2 text-base">
        {page.data.tags?.map((tag) => (
          <Link
            key={tag}
            href={getTagHref(tag)}
            className="bg-primary/10 text-primary rounded-md px-1 py-0.5 text-sm"
          >
            # {tag}
          </Link>
        ))}
      </div>

      {page.data.authors
        .map((author) => blogAuthors[author])
        .map((author, i) => (
          <a
            key={i}
            className="bg-card text-card-foreground flex flex-row gap-2 rounded-xl p-4"
            href={author.url ?? "#"}
            target="_blank"
            rel="nofollow noreferrer"
          >
            {author.image_url != null && (
              <Image
                itemProp="image"
                alt="avatar"
                src={author.image_url}
                width={40}
                height={40}
                className="h-full rounded-full"
              />
            )}

            <div>
              <p itemProp="name" className="font-medium">
                {author.name}
              </p>
              <p itemProp="jobTitle" className="text-muted-foreground text-sm">
                {author.title}
              </p>
            </div>
          </a>
        ))}
    </div>
  );
}
