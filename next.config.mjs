import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
      {
        protocol: "https",
        hostname: "img.shields.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "shields.io",
        port: "",
      },
    ],
  },
};

export default withMDX(config);
