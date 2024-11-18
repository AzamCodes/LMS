/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Unsplash
      },
      {
        protocol: "https",
        hostname: "pixabay.com", // Pixabay
      },
      {
        protocol: "https",
        hostname: "images.pexels.com", // Pexels
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com", // Pixabay CDN
      },
      {
        protocol: "https",
        hostname: "cdn.pexels.com", // Pexels CDN
      },
    ],
  },
};

export default nextConfig;
