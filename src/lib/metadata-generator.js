export const generatePageMetadata = ({
  title = "Handmade Crochet Item - Buy Unique Designs",
  description = "Discover unique handmade crochet products crafted with love. Shop now for the best crochet designs.",
  slug,
  image = "/uploads/crochets/crochet-dress-main.jpg",
  images,
  keywords = "crochet, handmade, knitting, unique designs, custom crochet",
  type = "product",
  publishedTime,
  modifiedTime,
  url,
  alternates,
  openGraph,
  twitter,
  robots,
  icons,
  schema,
}) => {
  const baseUrl = process.env.NEXTAUTH_URL || "";
  const resolvedUrl = url || (slug ? `${baseUrl}/crochets/${slug}` : baseUrl);
  const resolvedImages =
    images && images.length > 0
      ? images
      : image
        ? [{ url: image, alt: title }]
        : [];

  return {
    title,
    description,
    keywords,
    alternates: alternates || (resolvedUrl ? { canonical: resolvedUrl } : undefined),
    robots: robots || {
      index: true,
      follow: true,
    },
    icons,
    openGraph: {
      type: "website",
      title,
      description,
      url: resolvedUrl,
      images: resolvedImages,
      siteName: "MellyCrochets",
      locale: "en_US",
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(openGraph || {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: resolvedImages.map((img) => (img.url ? img.url : img)),
      ...(twitter || {}),
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": type === "article" ? "Article" : "Website",
      name: title,
      description,
      url: resolvedUrl,
      image,
      ...(publishedTime && { datePublished: publishedTime }),
      ...(modifiedTime && { dateModified: modifiedTime }),
      brand: {
        "@type": "Brand",
        name: "MellyCrochets",
      },
      ...(schema || {}),
    },
  };
};
