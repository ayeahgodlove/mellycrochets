import CrochetDetailPage from "../../../page-components/crochets/crochet-detail-page";
import { fetchCrochetBySlug } from "../../../utils/data";
import axios from "axios";
import { keywords } from "../../../constants/constant";

const fetchCrochetDetails = async (slug) => {
  const response = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/crochets/slugs/${slug}`
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch crochet details");
  } else {
    return await response.data;
  }
};

//Generate Metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  // Early return if slug is missing
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
    crochet = await fetchCrochetDetails(slug);
  } catch (error) {
    return {
      title: "Crochet Product | MellyCrochets Shop",
      description: "Beautiful handmade crochet designs from MellyCrochets",
      robots: {
        index: true,
        follow: true,
      },
    };
  }

  // Fallback if crochet data isn't available
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

  // Construct base URL
  const baseUrl = process.env.NEXTAUTH_URL || "";
  const productUrl = `${baseUrl}/crochets/${slug}`;
  const imageUrl = crochet.imageUrls?.[0] 
    ? `${baseUrl}/uploads/crochets/${crochet.imageUrls[0]}`
    : `${baseUrl}/default-crochet-image.jpg`;

  // Prepare metadata
  const title = `${crochet.name} | MellyCrochets Shop`;
  const description = crochet.description || `Beautiful handmade ${crochet.name} crochet design`;
  
  return {
    metadataBase: baseUrl ? new URL(baseUrl) : undefined,
    title,
    description,
    alternates: {
      canonical: productUrl
    },
    openGraph: {
      title,
      description,
      url: productUrl,
      type: "article",
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
    ].filter(Boolean).join(", "), // Remove any undefined values
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
export default async function IndexPage({ params }) {
  const { slug } = await params;
  const crochet = await fetchCrochetBySlug(slug);

  return <CrochetDetailPage crochet={crochet} />;
}
