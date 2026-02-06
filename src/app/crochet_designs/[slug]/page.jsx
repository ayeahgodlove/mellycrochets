import CrochetDesignsPage from "../../../page-components/crochet-designs/crochet-designs-page";
import { API_URL, BASE_URL } from "../../../constants/api-url";
import axios from "axios";
import { generatePageMetadata } from "../../../lib/metadata-generator";
import { keywords } from "../../../constants/constant";

const fetchCrochetTypeDetails = async (slug) => {
  const response = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/crochet_types/slugs/${slug}`
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch crochetType details");
  } else {
    return await response.data;
  }
};

// 🏷️ Generate Metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = params;
  const url = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";

  if (!slug) {
    return {}; // Avoid breaking the app
  }

  // Fetch the crochet type details
  const crochetType = await fetchCrochetTypeDetails(slug);
  if (!crochetType) {
    return {}; // Handle the case where crochetType data is not available
  }

  // Construct the image URL for openGraph and other metadata
  const imageUrl = crochetType.crochets[0]?.imageUrls[0]
    ? `${url}/uploads/crochets/${crochetType.crochets[0].imageUrls[0]}`
    : `${url}/uploads/default-crochet.jpg`; // Fallback if no image URL

  // Generate metadata
  return generatePageMetadata({
    title: `${crochetType.name} | MellyCrochets Shop`,
    description:
      crochetType.description ||
      `Beautiful handmade ${crochetType.name} crochet designs by MellyCrochets`,
    alternates: {
      canonical: `${url}/crochet_designs/${slug}`,
    },
    slug,
    image: imageUrl,
    keywords: [
      crochetType.name,
      `handmade ${crochetType.name}`,
      `crochet ${crochetType.name}`,
      `buy ${crochetType.name} crochet`,
      "MellyCrochets shop",
      ...keywords,
    ].join(", "),
    openGraph: {
      title: `${crochetType.name} | MellyCrochets Shop`,
      description:
        crochetType.description ||
        `Handmade ${crochetType.name} crochet creations`,
      url: `${url}/crochet_designs/${slug}`,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `MellyCrochets ${crochetType.name} collection`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${crochetType.name} Products | MellyCrochets Shop`,
      description:
        crochetType.description ||
        `Explore our collection of ${crochetType.name} crochet designs`,
      images: [imageUrl],
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    url: `${url}/crochet_designs/${slug}`,
    publishedTime: new Date(crochetType.createdAt).toISOString(),
    modifiedTime: new Date(crochetType.updatedAt).toISOString(),
  });
}


export default async function Page({ params }) {
  const { slug } = params;

  const res = await axios.get(
    `${API_URL}${BASE_URL}/crochet_types/slugs/${slug}`,
    {
      cache: "no-store",
      method: "GET",
    }
  );

  if (res.status !== 200) {
    throw new Error("Failed to fetch crochet type");
  }

  const { data } = res;
  return <CrochetDesignsPage crochetType={data} />;
}
