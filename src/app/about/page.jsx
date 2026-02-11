import { keywords } from "../../constants/constant";
import { getTranslations } from "next-intl/server";
import AboutPage from "../../page-components/about/page";

const url = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";

export async function generateMetadata() {
  return {
    metadataBase: new URL(`${url}`),
    title: "About Us | MellyCrochets",
    description:
      "Learn about MellyCrochets - our mission, values, and the story behind our handcrafted crochet fashion.",
    keywords: [
      "about mellycrochets",
      "crochet brand story",
      "sustainable fashion",
      "handmade crochet",
      "eco-friendly clothing",
      ...keywords,
    ].join(", "),
    alternates: {
      canonical: `${url}/about`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "About MellyCrochets | Handcrafted Sustainable Fashion",
      description:
        "Discover the story behind MellyCrochets and our commitment to eco-friendly, handmade crochet fashion.",
      images: [
        {
          url: `${url}/mellycrochets/ten.jpg`,
          width: 1200,
          height: 630,
          alt: "MellyCrochets founder and mission",
        },
      ],
      url: `${url}/about`,
      type: "website",
      siteName: "MellyCrochets",
      locale: "en_US",
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
      shortcut: "/favicon.ico",
    },
    twitter: {
      card: "summary_large_image",
      title: "About MellyCrochets | Handcrafted Sustainable Fashion",
      description:
        "Discover the story behind MellyCrochets and our commitment to eco-friendly, handmade crochet fashion.",
      images: [`${url}/mellycrochets/ten.jpg`],
      site: "@mellycrochets",
      creator: "@mellycrochets",
    },
  };
}

export default async function About() {
  return <AboutPage />;
}
