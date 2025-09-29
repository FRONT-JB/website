import { domain } from "@/lib/config";
import { metadataImage } from "@/lib/metadata";
import { source } from "@/lib/source";

import { getGithubLastEdit } from "fumadocs-core/server";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { DocsBody, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const page = source.getPage((await params).slug);
  if (!page) notFound();

  const Content = page.data.body;

  let lastEdit;
  try {
    lastEdit = await getGithubLastEdit({
      path: `content/docs/${page.path}`,
      owner: "front-jb",
      repo: "website",
      token: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
    });
  } catch (error) {
    console.warn("Failed to fetch last edit time from Git:", error);
    lastEdit = null;
  }

  return (
    <DocsPage
      toc={page.data.toc}
      tableOfContent={{
        style: "clerk",
      }}
      lastUpdate={lastEdit ?? undefined}
      editOnGithub={{
        sha: "master",
        owner: "front-jb",
        repo: "website",
        path: `content/docs/${page.path}`,
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsBody>
        <Content
          components={{
            ...defaultMdxComponents,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams(): { slug: string[] }[] {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  return metadataImage.withImage(params.slug ?? [], {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical: `${domain}/docs/${(params.slug ?? []).join("/")}`,
    },
    openGraph: {
      images: {
        url: `/og${page.url}.png`,
        width: 1200,
        height: 630,
        alt: "Banner",
      },
      title: page.data.title,
      description: page.data.description,
    },
  });
}
