import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import { Heading1Icon, Heading2Icon, TrendingUpIcon } from "lucide-react";

const TAB_CONFIG = {
  인사이트: {
    description: "기술 생태계의 최신 트렌드와 인사이트를 수집하고 분석합니다",
    icon: <TrendingUpIcon className="mb-3 size-4" />,
  },
  기록: {
    description: "개인적인 기록을 하나로 모아봅니다.",
    icon: <Heading1Icon className="mb-3 size-4" />,
  },
  프론트엔드: {
    description: "프론트엔드 기술에 대한 기록을 하나로 모아봅니다.",
    icon: <Heading2Icon className="mb-3.5 size-4 md:mb-7" />,
  },
} as const;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={source.pageTree}
      sidebar={{
        defaultOpenLevel: 0,
        tabs: {
          transform: (option) => {
            const config = TAB_CONFIG[option.title as keyof typeof TAB_CONFIG];
            return {
              ...option,
              description: config?.description || option.description,
              icon: config?.icon,
            };
          },
        },
      }}
    >
      {children}
    </DocsLayout>
  );
}
