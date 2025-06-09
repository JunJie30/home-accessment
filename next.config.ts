import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.themealdb.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  // Ensure proper handling of dynamic routes
  trailingSlash: false,
  // Ensure the app is optimized for dynamic content
  experimental: {
    // Enable modern features for better dynamic routing
    optimizePackageImports: ['@tanstack/react-query'],
  },
};

export default nextConfig;
