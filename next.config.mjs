/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  },

  images: {
    qualities: [100, 75],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4004',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
