import { keywords } from "../../constants/constant";
import { getTranslations } from "next-intl/server";
import ShopPage from "../../page-components/shop/page";

const url = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";
export const metadata = {
  metadataBase: new URL(`${url}`),
  title: {
    default: "MellyCrochets Shop - Handmade Crochet Fashion & Accessories",
    template: "%s | MellyCrochets Shop",
  },
  description:
    "Discover our stunning range of handmade crochet clothing, accessories, and home decor. Crafted with love and sustainability in mind, MellyCrochets delivers timeless fashion with a personal touch.",
  keywords: [
    "crochet shop",
    "handmade crochet",
    "crochet clothing",
    "crochet accessories",
    "crochet fashion",
    ...keywords,
  ].join(", "),
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: `${url}/shop`,
  },
  openGraph: {
    title: "MellyCrochets Shop - Unique Handmade Crochet Creations",
    description:
      "Discover our collection of beautifully handmade crochet clothing, accessories, and home decor. Ethically crafted, sustainable fashion for every style.",
    url: `${url}/shop`,
    type: "website",
    siteName: "MellyCrochets",
    locale: "en_US",
    images: [
      {
        url: `${url}/uploads/shop/diasy-crochet-trousers.jpg`,
        width: 1200,
        height: 630,
        alt: "MellyCrochets shop featuring various crochet products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mellycrochets", // Replace with actual Twitter handle if available
    creator: "@mellycrochets",
    title: "MellyCrochets Shop - Handmade Crochet Fashion",
    description:
      "Shop unique, handmade crochet pieces - from clothing to accessories. Sustainable fashion with love.",
    images: [
      `${url}/uploads/crochets/diasy-crochet-trousers.jpg`,
      `${url}/uploads/crochets/granny-sq-cropped-top-4.jpg`,
      `${url}/uploads/crochets/cameroon.jpg`,
    ],
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

export default async function IndexPage() {
  const t = await getTranslations("shop");
  return <ShopPage title={t("heroTitle")} description={t("heroDescription")} />;
}
