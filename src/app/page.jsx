import { getTranslations } from "next-intl/server";
import HomePage from "../page-components/home/page";
import { keywords } from "../constants/constant";
import { CrochetRepository } from "../data/repositories/crochet.repository";

const url = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";

function buildHeroImages(crochets, baseUrl) {
  if (!Array.isArray(crochets) || crochets.length === 0) return [];
  const uploads = `${baseUrl}/uploads/crochets`;
  return crochets.slice(0, 8).map((c) => {
    const urls = c.imageUrls;
    const arr = Array.isArray(urls) ? urls : (typeof urls === "string" ? [urls] : []);
    const first = arr[0];
    if (!first) return null;
    const imgUrl = first.startsWith("http") ? first : `${uploads}/${first}`;
    return { url: imgUrl, alt: c.name || "MellyCrochets product" };
  }).filter(Boolean);
}
export const metadata = {
  metadataBase: new URL(`${url}`),
  title: {
    default: "Handcrafted Crochet Fashion | MellyCrochets",
    template: "%s | MellyCrochets",
  },
  description:
    "Explore a collection of handcrafted crochet outfits at MellyCrochets. Trendy, stylish, and comfortable crochet wear for every occasion.",
  keywords: [
    "crochet fashion",
    "handcrafted crochet",
    "MellyCrochets",
    "trendy crochet outfits",
    "custom crochet clothing",
    ...keywords,
  ].join(", "),
  manifest: `${url}/site.webmanifest`,
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    title: "MellyCrochets",
    statusBarStyle: "default",
    capable: true,
    startupImage: "/apple-touch-icon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "MellyCrochets",
    description:
      "Explore a collection of handcrafted crochet outfits at MellyCrochets. Trendy, stylish, and comfortable crochet wear for every occasion.",
    images: [`${url}/uploads/crochets/crochet-dress-main.jpg`],
    site: "@mellycrochets",
    creator: "@mellycrochets",
  },
  alternates: {
    canonical: `${url}`,
  },
  openGraph: {
    title: "MellyCrochets",
    description:
      "Explore a collection of handcrafted crochet outfits at MellyCrochets. Trendy, stylish, and comfortable crochet wear for every occasion.",
    images: [
      {
        url: `${url}/uploads/crochets/crochet-dress-main.jpg`,
        width: 1200,
        height: 630,
        alt: "MellyCrochets crochet dress",
      },
    ],
    siteName: "MellyCrochets",
    locale: "en_US",
    url: url,
    type: "website",
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
  const t = await getTranslations("social");
  let heroImages = [];
  try {
    const crochetRepository = new CrochetRepository();
    const crochets = await crochetRepository.getAll();
    heroImages = buildHeroImages(crochets || [], url);
  } catch (e) {
    // Hero falls back to default image
  }

  return <HomePage t={t} heroImages={heroImages} />;
}
