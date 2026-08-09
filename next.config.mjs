/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Unsplash is the stock source for the hero card field
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // premium_photo host used by the profile-card primitive default image
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;
