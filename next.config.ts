import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
  // i18n: {
  //   locales: ["en", "lt"],
  //   defaultLocale: "lt",
  // },
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "/",
        protocol: "https",
        port: "",
      },
    ],
  },
  /* config options here */
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
