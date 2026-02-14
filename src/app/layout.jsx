import { cookies } from "next/headers";
import React, { Suspense } from "react";
import { RefineContext } from "../contexts/refine-context";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "../assets/css/globals.css";
import "../assets/css/main.css";
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
    "Handcrafted crochet fashion from Cameroon – MellyCrochets. Crocheters in Cameroon & Bamenda. Trendy, stylish crochet wear for every occasion. Shop handmade crochet worldwide.",
  keywords: [
    "crochet fashion",
    "handcrafted crochet",
    "crochets cameroon",
    "crocheters in cameroon",
    "crochets bamenda",
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
      "Handcrafted crochet fashion from Cameroon. Crocheters in Cameroon & Bamenda – trendy crochet wear. Shop MellyCrochets worldwide.",
    images: [`${url}/uploads/crochets/crochet-dress-main.jpg`],
    creator: "@mellycrochets",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: "MellyCrochets",
    description:
      "Handcrafted crochet fashion from Cameroon. Crocheters in Cameroon & Bamenda – trendy crochet wear. Shop MellyCrochets worldwide.",
    images: [
      {
        url: `${url}/uploads/crochets/crochet-dress-main.jpg`,
        width: 1200,
        height: 630,
        alt: "MellyCrochets handcrafted crochet fashion",
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

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme");
  const defaultMode = theme?.value === "dark" ? "dark" : "light";

  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#82181a" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="alternate" type="application/rss+xml" title="MellyCrochets Blog RSS" href={`${url}/feed.xml`} />
        <link rel="alternate" type="application/rss+xml" title="MellyCrochets Blog RSS" href={`${url}/rss.xml`} />
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
        <meta
          name="google-site-verification"
          content="ldebmFeO6kY68u7FbCml3aurSI0q3u4SflpJm11J458"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${url}/#organization`,
              name: "MellyCrochets",
              alternateName: "MellyCrochets ETS",
              url: url,
              logo: `${url}/logo.png`,
              image: `${url}/uploads/crochets/crochet-dress-main.jpg`,
              description: "Handcrafted crochet fashion and accessories from Cameroon. Crocheters in Bamenda and Cameroon – sustainable, eco-friendly pieces for every style. MellyCrochets.",
              telephone: "+237681077051",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bamenda",
                addressRegion: "North West",
                postalCode: "237",
                streetAddress: "Mile 4 Nkwen",
                addressCountry: "Cameroon",
              },
              sameAs: [
                "https://www.instagram.com/mellycrochets_",
                "https://facebook.com/MellycrochetsETS",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "MellyCrochets",
              url: url,
              description: "Handcrafted crochet fashion from Cameroon. Crocheters in Cameroon and Bamenda – shop MellyCrochets for handmade crochet wear worldwide.",
              publisher: { "@id": `${url}/#organization` },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${url}/shop?name={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "MellyCrochets",
              image: `${url}/uploads/crochets/crochet-dress-main.jpg`,
              description: "Handcrafted crochet fashion from Cameroon. Crocheters in Bamenda – handmade crochet wear and accessories. MellyCrochets.",
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
        <Suspense fallback={null}>
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
