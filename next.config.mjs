/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dbz6ebekj/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "api.unotravelsweden.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "api.unotravelsweden.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "camp-coding.site",
        pathname: "/uno-travel/uploads/**",
      },
      {
        protocol: "https",
        hostname: "camp-coding.site",
        pathname: "/uno-travel/uploads/**",
      },
    ],
  },
};

export default nextConfig;
