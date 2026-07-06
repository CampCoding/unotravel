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
        hostname: "api.iconify.design",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "loremflickr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
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
        protocol: "https",
        hostname: "admin.unotravelsweden.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "admin.unotravelsweden.com",
        pathname: "/uploads/**",
      },

      {
        protocol: "https",
        hostname: "unotravelsweden.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "unotravelsweden.com",
        pathname: "/uploads/**",
      },

      {
        protocol: "https",
        hostname: "www.unotravelsweden.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "www.unotravelsweden.com",
        pathname: "/uploads/**",
      },

      {
        protocol: "https",
        hostname: "camp-coding.site",
        pathname: "/uno-travel/uploads/**",
      },
      {
        protocol: "http",
        hostname: "camp-coding.site",
        pathname: "/uno-travel/uploads/**",
      },

      {
        protocol: "http",
        hostname: "localhost",
        port: "80",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;