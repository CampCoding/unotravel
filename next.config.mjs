// next.config.mjs (or next.config.ts)
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/dbz6ebekj/**' },
      ],
    },
  };
  
  export default nextConfig;
  