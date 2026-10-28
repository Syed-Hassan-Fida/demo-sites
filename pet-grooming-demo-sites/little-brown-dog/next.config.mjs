/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "lbdog.com" },
      { protocol: "https", hostname: "secure.gravatar.com" },
    ],
  },
};
export default nextConfig;
