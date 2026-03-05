import CartPage from "../../page-components/cart/page";
import { keywords } from "../../constants/constant";

const url = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";

export const metadata = {
  metadataBase: new URL(url),
  title: "Shopping Cart | MellyCrochets",
  description:
    "Review your handcrafted crochet items at MellyCrochets. Complete your order and get unique crochet fashion delivered worldwide.",
  keywords: ["shopping cart", "crochet checkout", "handmade crochet order", ...keywords].join(", "),
  alternates: { canonical: "/cart" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Shopping Cart | MellyCrochets",
    description: "Review your handcrafted crochet items. Complete your order and get unique crochet fashion delivered worldwide.",
    url: `${url}/cart`,
    type: "website",
    siteName: "MellyCrochets",
    locale: "en_US",
    images: [
      { url: `${url}/uploads/crochets/crochet-dress-main.jpg`, width: 1200, height: 630, alt: "MellyCrochets cart" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopping Cart | MellyCrochets",
    description: "Review your handcrafted crochet items and complete your order.",
    images: [`${url}/uploads/crochets/crochet-dress-main.jpg`],
    site: "@mellycrochets",
    creator: "@mellycrochets",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function CartPageWrapper() {
  return <CartPage />;
}
