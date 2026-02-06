import { cookies } from "next/headers";
import React, { Suspense } from "react";
import { RefineContext } from "../contexts/refine-context";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "../assets/css/globals.css";
import "../assets/css/main.css";
import { Spin } from "@/components/ui";
import { Loader2 } from "lucide-react";
import AppShell from "../components/layout/app-shell";
import "../lib/polyfils";
import { keywords } from "../constants/constant";

const url = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";
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
    creator: "@mellycrochets",
  },
  openGraph: {
    title: "MellyCrochets",
    description:
      "Explore a collection of handcrafted crochet outfits at MellyCrochets. Trendy, stylish, and comfortable crochet wear for every occasion.",
    images: [`${url}/uploads/crochets/crochet-dress-main.jpg`],
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

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme");
  const defaultMode = theme?.value === "dark" ? "dark" : "light";

  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang="en">
      <head>
        {/* Viewport for responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* SEO metadata */}
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#82181a" />

        {/* PWA support */}
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Font optimization */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />

        {/* Optional content security policy (customize if needed) */}
        {/* <meta
          http-equiv="content-security-policy"
          content="default-src https:; script-src 'sha256-cPpRrcp58qOLBGbg0daTQMB+cvBxtwl2c5F22Cbohzk='"
        /> */}
        {/* google verification */}
        <meta
          name="google-site-verification"
          content="ldebmFeO6kY68u7FbCml3aurSI0q3u4SflpJm11J458"
        />

        {/* Structured data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "MellyCrochets",
              image: `${url}/uploads/crochets/crochet-dress-main.jpg`,
              description: "Handcrafted crochet fashion and accessories",
              url: url,
              telephone: "+237681077051",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bamenda",
                addressRegion: "North West",
                postalCode: "237",
                streetAddress: "Mile 4 Nkwen",
                addressCountry: "Cameroon",
              },
              openingHours: "Mo,Tu,We,Th,Fr 09:00-17:00",
              priceRange: "$$",
            }),
          }}
        />
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KMES0JLGEB"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-KMES0JLGEB');
            `,
          }}
        />
      </head>

      <body>
        <Suspense
          fallback={
            <Spin
              size="large"
              indicator={<Loader2 size={48} className="animate-spin text-gray-500" />}
              style={{
                minHeight: "65vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              fullscreen
            />
          }
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <RefineContext defaultMode={defaultMode}>
              <AppShell>{children}</AppShell>
            </RefineContext>
          </NextIntlClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
