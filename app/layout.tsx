import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/cart/CartDrawer";

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

export const metadata: Metadata = {
  title: "ONR Mücevherat — Sonsuzluğun Estetiği",
  description:
    "ONR Mücevherat, her bir parçayı bir sanat eseri olarak tasarlayan, Ankara kökenli ultra-lüks bir mücevher markasıdır.",
  keywords: "ONR Mücevherat, lüks mücevher, elmas, altın, pırlanta, Ankara",
  openGraph: {
    title: "ONR Mücevherat — Sonsuzluğun Estetiği",
    description: "Her parça, sonsuzluğa yazılmış bir şiirdir.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased bg-ivory-100 text-charcoal">
        {children}
        <CartDrawer />
      </body>
    </html>
  );
}
