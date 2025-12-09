import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
        protocol: "https",
        port: "",
      },
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

export default nextConfig;
