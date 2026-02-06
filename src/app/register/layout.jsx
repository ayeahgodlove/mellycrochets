// import authOptions from "@app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import React from "react";
import authOptions from "../../lib/options";
import { keywords } from "../../constants/constant";

const baseUrl = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";
const pageUrl = `${baseUrl}/register`;
const defaultImage = `${baseUrl}/uploads/crochets/beach-wares.jpg`; // Different image from login

export const metadata = {
  title: "Join Our Community | MellyCrochets Registration",
  description:
    "Create your free MellyCrochets account to save favorite patterns, track orders, and access exclusive crochet tutorials",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Join Our Crochet Community | MellyCrochets",
    description:
      "Register for free to access premium patterns, member discounts, and connect with fellow crochet enthusiasts",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: defaultImage,
        width: 1200,
        height: 630,
        alt: "Welcome to MellyCrochets - Join Our Crochet Community",
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
    title: "Become a MellyCrochets Member",
    description:
      "Sign up for free patterns, exclusive tutorials, and member-only discounts on handmade crochet goods",
    images: [defaultImage],
  },
  keywords: [
    "crochet sign up",
    "register for crochet patterns",
    "MellyCrochets membership",
    "free crochet account",
    "join crochet community",
    "handmade crafts register",
    ...keywords
  ].join(", "),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};
export default async function RegisterLayout({ children }) {
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
