import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF/WebP — ürün fotoğraflarında JPEG'e göre belirgin kazanç.
    formats: ["image/avif", "image/webp"],
    // Optimize edilmiş varyantlar 1 yıl cache'lensin; dosya adları benzersiz.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "zysgrwxhnjcanqogvxyz.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
