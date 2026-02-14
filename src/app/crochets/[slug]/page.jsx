import CrochetDetailPage from "../../../page-components/crochets/crochet-detail-page";
import { fetchCrochetBySlug } from "../../../utils/data";
import { keywords } from "../../../constants/constant";
import { JsonLd } from "../../../components/seo/json-ld";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug) {
    return {
      title: "Crochet Product | MellyCrochets Shop",
      description: "Beautiful handmade crochet designs from MellyCrochets",
      robots: {
        index: true,
        follow: true,
      },
    };
  }

  let crochet;
  try {
    crochet = await fetchCrochetBySlug(slug);
  } catch {
    return {
      title: "Crochet Product | MellyCrochets Shop",
      description: "Beautiful handmade crochet designs from MellyCrochets",
      robots: {
        index: true,
        follow: true,
      },
    };
  }

  if (!crochet) {
    return {
      title: "Crochet Product | MellyCrochets Shop",
      description: "Beautiful handmade crochet designs from MellyCrochets",
      alternates: {
        canonical: `${process.env.NEXTAUTH_URL}/crochets/${slug}`
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }

  const baseUrl = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";
  const productUrl = `${baseUrl}/crochets/${slug}`;
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
      canonical: productUrl
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
  const crochet = await fetchCrochetBySlug(slug);
  const baseUrl = process.env.NEXTAUTH_URL || "";

  const productSchema = crochet ? buildProductSchema(crochet, baseUrl) : null;
  const breadcrumbSchema = crochet ? buildBreadcrumbSchema(crochet, baseUrl) : null;

  return (
    <>
      {productSchema && <JsonLd data={productSchema} />}
      {breadcrumbSchema && <JsonLd data={breadcrumbSchema} />}
      <CrochetDetailPage crochet={crochet} />
    </>
  );
}
