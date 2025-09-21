import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { Heading1Icon, Heading2Icon } from "lucide-react";

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={source.pageTree}
      sidebar={{
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
      }}
    >
      {children}
    </DocsLayout>
  );
}
