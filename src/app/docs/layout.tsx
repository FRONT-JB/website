import { layoutProps } from "@/app/layout.shared";
import { DocsLayout, DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "../source";
import { Heading1Icon, Heading2Icon } from "lucide-react";

const docsOptions: DocsLayoutProps = {
  ...layoutProps,
  tree: source.pageTree,
  sidebar: {
    defaultOpenLevel: 0,
    tabs: [
      {
        title: "기록",
        description: "개인적인 기록을 하나로 모아봅니다.",
        icon: <Heading1Icon className="mb-3 size-4" />,
        url: "/docs/personal",
      },
      {
        title: "프론트엔드",
        description: "프론트엔드 기술에 대한 기록을 하나로 모아봅니다.",
        icon: <Heading2Icon className="mb-3.5 size-4 md:mb-7" />,
        url: "/docs/general",
      },
    ],
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsLayout {...docsOptions}>{children}</DocsLayout>;
}
