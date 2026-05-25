import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/api/",
          "/auth/",
          "/profil",
          "/sepet",
          "/odeme",
          "/siparislerim",
          "/siparis-onay/",
        ],
      },
    ],
    sitemap: "https://www.onrmucevherat.com/sitemap.xml",
  };
}
