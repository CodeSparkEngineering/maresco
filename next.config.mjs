/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Placeholder-friendly config. Add real remote hosts here when you connect
    // a CMS or asset pipeline (e.g. Vercel Blob, Cloudinary, S3).
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
