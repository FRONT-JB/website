import type { FooterCategory } from "@/components/footer";

export const urlBase = new URL(
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
);

export const domain = "https://yeecord.com";

export const footer: FooterCategory[] = [
  {
    title: "링크",
    items: [
      {
        label: "블로그",
        href: "/blog/",
      },
      {
        label: "GitHub",
        href: "https://github.com/FRONT-JB",
        newWindow: true,
      },
    ],
  },
];

export const blogAuthors: Record<string, AuthorData> = {
  kane: {
    name: "FRONT-JB",
    title: "프론트엔드",
    url: "https://github.com/FRONT-JB",
    image_url: "https://avatars.githubusercontent.com/u/85790271?v=4",
  },
};

export type AuthorData = {
  name: string;
  url?: string;
  title?: string;
  image_url?: string;
};
