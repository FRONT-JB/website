import { layoutProps } from "@/app/layout.shared";
import { DocsLayout, DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "../source";

const docsOptions: DocsLayoutProps = {
  ...layoutProps,
  tree: source.pageTree,
  sidebar: {
    defaultOpenLevel: 0,
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsLayout {...docsOptions}>{children}</DocsLayout>;
}
