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
        tabs: {
          transform: (option) => ({
            ...option,
            description:
              option.title === "기록"
                ? "개인적인 기록을 하나로 모아봅니다."
                : "프론트엔드 기술에 대한 기록을 하나로 모아봅니다.",
            icon:
              option.title === "기록" ? (
                <Heading1Icon className="mb-3 size-4" />
              ) : (
                <Heading2Icon className="mb-3.5 size-4 md:mb-7" />
              ),
          }),
        },
      }}
    >
      {children}
    </DocsLayout>
  );
}
