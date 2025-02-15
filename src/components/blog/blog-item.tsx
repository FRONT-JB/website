import Link from "next/link";
import Image from "next/image";
import type { blog } from "@/app/source";
import type { InferPageType } from "fumadocs-core/source";
import { blogAuthors } from "@config";
import { cn } from "@/utils/cn";

export function BlogItem({ page }: { page: InferPageType<typeof blog> }) {
  return (
    <Link
      href={page.url}
      className="flex flex-col overflow-hidden rounded-lg bg-card text-card-foreground shadow-lg transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <div className="relative aspect-video h-auto w-full">
        {page.data.image != null ? (
          <Image
            alt="image"
            src={page.data.image}
            className="h-full object-cover"
            fill
            sizes="(max-width: 760px) 90vw, 400px"
          />
        ) : (
          <div className="relative flex h-full items-center justify-center font-mono text-4xl text-foreground">
            <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)]" />
            Afaik
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 rounded-b-lg border-x border-b p-4">
        <p className="font-semibold">{page.data.title}</p>
        <p className="truncate text-sm text-muted-foreground">
          {page.data.description}
        </p>

        <div className="mt-auto flex flex-row items-end pt-2">
          {page.data.authors.flatMap((author, i) => {
            const info = blogAuthors[author];
            if (!info?.image_url) return [];

            return (
              <Image
                key={info.name}
                src={info.image_url}
                alt={info.name}
                width={30}
                height={30}
                className={cn(
                  "rounded-full border-4 border-background",
                  i !== 0 && "-ml-4",
                )}
              />
            );
          })}

          <p className="ml-auto text-xs text-muted-foreground">
            {new Date(
              page?.data?.lastModified || page?.data?.date,
            ).toLocaleDateString("ko-KR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </Link>
  );
}
