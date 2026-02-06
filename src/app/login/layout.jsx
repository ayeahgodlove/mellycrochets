// import authOptions from "@app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import React from "react";
import authOptions from "../../lib/options";
import { keywords } from "../../constants/constant";

const baseUrl = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";
const pageUrl = `${baseUrl}/login`;
const defaultImage = `${baseUrl}/uploads/crochets/beach-wares.jpg`;
// � Login Page Metadata
export const metadata = {
  title: "Login | MellyCrochets Account",
  description:
    "Sign in to your MellyCrochets account to access your favorites, orders, and exclusive patterns",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Login | MellyCrochets Account",
    description:
      "Access your MellyCrochets account to manage your crochet patterns, purchases, and wishlist",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: defaultImage,
        width: 1200,
        height: 630,
        alt: "MellyCrochets Login - Handmade Crochet Community",
      },
    ],
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Login to Your MellyCrochets Account",
    description:
      "Join our community of crochet enthusiasts - access your patterns and purchases",
    images: [defaultImage],
  },
  keywords: [
    "crochet login",
    "MellyCrochets account",
    "sign in crochet patterns",
    "crochet community login",
    "handmade crafts account",
    ...keywords,
  ].join(", "),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  other: {
    "theme-color": "#f5d5f0",
  },
};

export default async function LoginLayout({ children }) {
  const data = await getData();

  if (data.session?.user) {
    return redirect("/");
  }

  return <>{children}</>;
}

async function getData() {
  const session = await getServerSession(authOptions);

  return {
    session,
  };
}
