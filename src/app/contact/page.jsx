import { keywords } from "../../constants/constant";
import { getTranslations } from "next-intl/server";
import ContactPage from "../../page-components/contact/page";

const url = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";

export const metadata = {
  metadataBase: new URL(`${url}`),
  title: "Contact Us | MellyCrochets",
  description:
    "Get in touch with MellyCrochets for inquiries about our handcrafted crochet fashion and custom orders.",

  alternates: {
    canonical: `${url}/contact`,
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "crochet contact",
    "handmade fashion inquiries",
    "crochet designer contact",
    "custom crochet orders",
    ...keywords,
  ].join(", "),

  // OpenGraph Metadata
  openGraph: {
    title: "Contact Us | MellyCrochets",
    description:
      "Reach out to MellyCrochets for custom crochet orders, inquiries, and collaborations.",
    images: [
      {
        url: `${url}/uploads/crochets/crochet-dress-main.jpg`,
        width: 1200,
        height: 630,
        alt: "MellyCrochets contact page",
      },
    ],
    url: `${url}/contact`,
    type: "website",
    siteName: "MellyCrochets",
    locale: "en_US",
  },

  // Icons for different platforms
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },

  // Twitter Card Metadata
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | MellyCrochets",
    description:
      "Get in touch for custom crochet orders, inquiries, or collaborations.",
    images: [`${url}/uploads/crochets/crochet-dress-main.jpg`],
    site: "@mellycrochets", // Add actual Twitter handle if available
    creator: "@mellycrochets", // Add creator handle if available
  },
};

export default async function Contact() {
  return <ContactPage />;
}
