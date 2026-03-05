import CrochetDetailPage from "../../../page-components/crochets/crochet-detail-page";
import { fetchCrochetBySlug } from "../../../utils/data";
import { keywords } from "../../../constants/constant";
import { JsonLd } from "../../../components/seo/json-ld";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }

  let crochet;
  try {
    crochet = await fetchCrochetBySlug(slug);
  } catch {
    notFound();
  }

  if (!crochet) {
    notFound();
  }

  const baseUrl = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";
  const canonicalPath = `/crochets/${slug}`;
  const productUrl = `${baseUrl}${canonicalPath}`;
  const imageUrl = crochet.imageUrls?.[0]
    ? `${baseUrl}/uploads/crochets/${crochet.imageUrls[0]}`
    : `${baseUrl}/default-crochet-image.jpg`;
  const title = `${crochet.name} | MellyCrochets Shop`;
  const description = crochet.description || `Beautiful handmade ${crochet.name} crochet design`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: productUrl,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `MellyCrochets ${crochet.name}`
        }
      ],
      siteName: "MellyCrochets",
      locale: "en_US",
      publishedTime: crochet.createdAt ? new Date(crochet.createdAt).toISOString() : undefined,
      modifiedTime: crochet.updatedAt ? new Date(crochet.updatedAt).toISOString() : undefined
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      site: "@mellycrochets",
      creator: "@mellycrochets",
    },
    keywords: [
      crochet.name,
      `handmade ${crochet.name}`,
      `crochet ${crochet.name}`,
      `buy ${crochet.name}`,
      "MellyCrochets shop",
      ...(keywords || []) // Ensure keywords is defined
    ].filter(Boolean).join(", "),
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
      ],
      apple: "/apple-touch-icon.png"
    }
  };
}
function buildProductSchema(crochet, baseUrl) {
  const productUrl = `${baseUrl}/crochets/${crochet.slug}`;
  const images = (crochet.imageUrls || []).map(
    (img) => `${baseUrl}/uploads/crochets/${img}`
  );
  const mainImage = images[0] || `${baseUrl}/default-crochet-image.jpg`;
  const price = crochet.priceInUsd ?? crochet.priceInCfa;
  const priceCurrency = crochet.priceInUsd != null ? "USD" : "XAF";

  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: crochet.name,
    description: crochet.description || `Handmade ${crochet.name} by MellyCrochets`,
    image: images.length ? images : [mainImage],
    url: productUrl,
    sku: crochet.slug,
    brand: {
      "@type": "Brand",
      name: "MellyCrochets",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency,
      price: price ?? undefined,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
  return product;
}

function buildBreadcrumbSchema(crochet, baseUrl) {
  const typeName = crochet.crochetType?.name || "Shop";
  const typeSlug = crochet.crochetType?.slug;
  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "Shop", item: `${baseUrl}/shop` },
  ];
  if (typeSlug) {
    items.push({
      "@type": "ListItem",
      position: items.length + 1,
      name: typeName,
      item: `${baseUrl}/shop?type=${encodeURIComponent(typeSlug)}`,
    });
  }
  items.push({
    "@type": "ListItem",
    position: items.length + 1,
    name: crochet.name,
    item: `${baseUrl}/crochets/${crochet.slug}`,
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

export default async function IndexPage({ params }) {
  const { slug } = await params;

  let crochet;
  try {
    crochet = await fetchCrochetBySlug(slug);
  } catch {
    notFound();
  }

  if (!crochet) {
    notFound();
  }

  const baseUrl = process.env.NEXTAUTH_URL || "";
  const productSchema = buildProductSchema(crochet, baseUrl);
  const breadcrumbSchema = buildBreadcrumbSchema(crochet, baseUrl);

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <CrochetDetailPage crochet={crochet} />
    </>
  );
}
