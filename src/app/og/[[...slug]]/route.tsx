import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { metadataImage } from "@/utils/metadata";
import { ImageResponse } from "next/og";

const noto = await readFile(
  resolve(process.cwd(), "./public/noto-sans-semi-bold.woff"),
);

export const GET = metadataImage.createAPI((page) => {
  return new ImageResponse(
    (
      <div
        tw="flex h-full w-full p-12"
        style={{ background: "hsl(0 0% 3.9%)", color: "hsl(0 0% 98%)" }}
      >
        <div
          tw="flex flex-col items-center text-center justify-center w-full h-full p-20 rounded-2xl border border-gray-900"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.1))",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-cloud-sun"
          >
            <path d="M12 2v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="M20 12h2" />
            <path d="m19.07 4.93-1.41 1.41" />
            <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
            <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
          </svg>

          <p tw="text-white font-bold text-6xl">{page.data.title}</p>
          <p tw="text-2xl" style={{ color: "hsl(0 0% 63.9%)" }}>
            {page.data.description}
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Noto Sans TC",
          data: noto,
        },
      ],
    },
  );
});

export function generateStaticParams() {
  return metadataImage.generateParams();
}
