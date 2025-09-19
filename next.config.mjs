import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    unoptimized: true,
  },
  serverExternalPackages: [
    'ajv',
    'ajv-draft-04',
    '@scalar/openapi-parser',
    'fumadocs-openapi'
  ],
};

export default withMDX(nextConfig);
