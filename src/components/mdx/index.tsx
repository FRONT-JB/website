import { ErrorCallout, Info, Tip, Warning } from "@/components/mdx/admonition";
import { LinkButton } from "@/components/mdx/link-button";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { FC, ImgHTMLAttributes } from "react";

export * from "./admonition";
export * from "./link-button";

export const mdxComponents = {
  ...defaultMdxComponents,
  Error: ErrorCallout,
  Info,
  LinkButton,
  img: ImageZoom as FC<ImgHTMLAttributes<HTMLImageElement>>,
  Tip,
  Warning,
};
