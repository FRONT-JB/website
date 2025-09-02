import { ErrorCallout, Info, Tip, Warning } from "@/components/mdx/admonition";
import { LinkButton } from "@/components/mdx/link-button";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import { Mermaid } from "@/components/mdx/mermaid";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { FC, ImgHTMLAttributes } from "react";

export * from "./admonition";
export * from "./link-button";

export const mdxComponents = {
  Mermaid,
  ...defaultMdxComponents,
  ...TabsComponents,
  Error: ErrorCallout,
  Info,
  LinkButton,
  img: ImageZoom as FC<ImgHTMLAttributes<HTMLImageElement>>,
  Tip,
  Warning,
};
