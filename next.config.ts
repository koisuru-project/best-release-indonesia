/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.myanimelist.net"
            },
            // Adding other potential AniList CDN domains for completeness
            {
                protocol: "https",
                hostname: "*.myanimelist.net"
            }
        ]
    }
    // Keep any other existing Next.js config options you might have
};

module.exports = nextConfig;
