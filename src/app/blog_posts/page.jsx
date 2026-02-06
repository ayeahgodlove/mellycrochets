import { getTranslations } from "next-intl/server";
import BlogPostsPage from "../../page-components/blog-posts/page";
import { keywords } from "../../constants/constant";

const url = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";

export const metadata = {
  metadataBase: new URL(`${url}`),
  title: {
    default: "Crochet Blog - Tips, Patterns & Inspiration | MellyCrochets",
    template: "%s | MellyCrochets Blog",
  },
  description:
    "Discover crochet patterns, tutorials, and creative inspiration from MellyCrochets. Perfect for crochet enthusiasts of all skill levels.",
  alternates: {
    canonical: `${url}/blog_posts`,
  },
  openGraph: {
    title: "Crochet Blog - Tips, Patterns & Inspiration",
    description:
      "Discover crochet patterns, tutorials, and creative inspiration from MellyCrochets. Perfect for crochet enthusiasts of all skill levels.",
    type: "article",
    url: `${url}/blog_posts`,
    siteName: "MellyCrochets",
    images: [
      {
        url: `${url}/uploads/posts/anastasia-shchukina-V_zqT-zXud0-unsplash.jpg`,
        width: 1200,
        height: 630,
        alt: "Crochet blog header image",
      },
    ],
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crochet Blog - Tips, Patterns & Inspiration | MellyCrochets",
    description:
      "Discover crochet patterns, tutorials, and creative inspiration from MellyCrochets.",
    images: [`${url}/uploads/posts/christian-bass-EgBvK_nNqg8-unsplash.jpg`],
    site: "@mellycrochets", // Replace with actual Twitter handle if exists
    creator: "@mellycrochets",
  },
  keywords: [
    "crochet blog",
    "crochet patterns",
    "crochet tutorials",
    ...keywords,
  ].join(", "),
  authors: [{ name: "MellyCrochets", url: `${url}` }],
  creator: "MellyCrochets",
  publisher: "MellyCrochets",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default async function IndexPage() {
  const t = await getTranslations("blog_posts");
  return <BlogPostsPage title={t("title")} description={t("description")} />;
}
