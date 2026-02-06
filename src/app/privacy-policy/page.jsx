import { keywords } from "../../constants/constant";
import PrivacyPolicyPage from "../../page-components/privacy-policy/page";

const url = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";

// Optional: Define your base keywords if not already declared elsewhere
const baseKeywords = [
  "crochet shop privacy",
  "handmade crochet privacy policy",
  "MellyCrochets data protection",
  "crochet store privacy information",
  "personal data usage crochet shop",
  ...keywords
];

export const metadata = {
  metadataBase: new URL(`${url}`),
  title: "Privacy Policy | MellyCrochets Shop",
  description:
    "Learn how MellyCrochets collects, uses, and protects your personal information. Your privacy is important to us.",
  keywords: baseKeywords.join(", "),
  alternates: {
    canonical: `${url}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy | MellyCrochets Shop",
    description:
      "Your privacy matters. Learn how we protect and use your information at MellyCrochets.",
    url: `${url}/privacy-policy`,
    type: "article",
    images: [
      {
        url: `${url}/uploads/crochets/cameroon.jpg`,
        width: 1200,
        height: 630,
        alt: "MellyCrochets Privacy Policy Information",
      },
    ],
    siteName: "MellyCrochets",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | MellyCrochets Shop",
    description:
      "How we protect your data when you shop our handmade crochet creations.",
    images: [`${url}/uploads/crochets/crochet-dress-main.jpg`],
    site: "@mellycrochets",
    creator: "@mellycrochets",
  },
  robots: {
    index: true,
    follow: true,
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

export default function IndexPage() {
  return <PrivacyPolicyPage />;
}
