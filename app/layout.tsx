import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/cart/CartDrawer";
import AuthProvider from "@/components/auth/AuthProvider";
import AuthModal from "@/components/auth/AuthModal";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const BASE_URL = "https://www.onrmucevherat.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ONR Mücevherat — Sonsuzluğun Estetiği",
    template: "%s | ONR Mücevherat",
  },
  description:
    "ONR Mücevherat, Ankara merkezli ultra-lüks bir mücevher markasıdır. Pırlanta yüzük, altın kolye, bilezik, küpe ve inci koleksiyonları ile özel tasarım mücevherler.",
  keywords: [
    "ONR Mücevherat",
    "lüks mücevher Ankara",
    "pırlanta yüzük",
    "pırlanta bilezik",
    "altın kolye",
    "pırlanta küpe",
    "mücevher mağazası Ankara",
    "özel tasarım mücevher",
    "nişan yüzüğü",
    "pırlanta tektaş",
    "lüks mücevher",
    "inci koleksiyonu",
    "platin yüzük",
    "gül altın bilezik",
    "mücevher hediye",
    "Türk mücevher markası",
    "GIA sertifikalı pırlanta",
    "Ankara kuyumcu",
    "altın yüzük",
    "düğün mücevherleri",
    "exclusive mücevher",
    "özel seri mücevher",
  ],
  openGraph: {
    title: "ONR Mücevherat — Sonsuzluğun Estetiği",
    description:
      "Pırlanta yüzük, altın kolye, bilezik ve küpe koleksiyonları. Ankara merkezli ultra-lüks mücevher markası.",
    type: "website",
    locale: "tr_TR",
    url: BASE_URL,
    siteName: "ONR Mücevherat",
    images: [
      {
        url: "/images/mucevher/mucevher.jpg",
        width: 1200,
        height: 630,
        alt: "ONR Mücevherat — Lüks Mücevher Koleksiyonu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ONR Mücevherat — Sonsuzluğun Estetiği",
    description:
      "Pırlanta yüzük, altın kolye, bilezik ve küpe koleksiyonları. Ankara merkezli ultra-lüks mücevher markası.",
    images: ["/images/mucevher/mucevher.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: "ONR Mücevherat",
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo/onr-logo-siyah.png`,
  image: `${BASE_URL}/images/mucevher/mucevher.jpg`,
  description:
    "Ankara merkezli ultra-lüks mücevher markası. Pırlanta, altın ve inci koleksiyonları.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Güvenlik Caddesi 34/A, A.Ayrancı",
    addressLocality: "Çankaya",
    addressRegion: "Ankara",
    postalCode: "06550",
    addressCountry: "TR",
  },
  telephone: "+903124264666",
  email: "info@onrmucevherat.com",
  sameAs: ["https://www.instagram.com/onrmucevherat/"],
  priceRange: "₺₺₺₺",
  currenciesAccepted: "TRY",
  paymentAccepted: "Nakit, Kredi Kartı",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "19:00",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ONR Mücevherat",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/koleksiyonlar?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-sans antialiased bg-ivory-100 text-charcoal">
        <AuthProvider>
          {children}
          <CartDrawer />
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
