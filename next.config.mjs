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
