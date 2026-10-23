/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 90 keeps the line art in post images crisp; 75 is the default for everything else.
  images: {
    qualities: [75, 90],
    // Thumbnails of the latest YouTube video on the home page.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
}

export default nextConfig
