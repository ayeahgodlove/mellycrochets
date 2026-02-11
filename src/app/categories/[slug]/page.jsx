import CategoryPostsPage from "../../../page-components/categories/category-posts-page";
import { getPostImageUrl } from "../../../constants/api-url";
import { fetchCategoryBySlug } from "../../../utils/data";
import axios from "axios";
import { generatePageMetadata } from "../../../lib/metadata-generator";
import { keywords } from "../../../constants/constant";

const fetchCategoryDetails = async (slug) => {
  const response = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/categories/slugs/${slug}`
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch category details");
  } else {
    return await response.data;
  }
};

// 🏷️ Generate Metadata for SEO
// 🏷️ Generate Metadata for SEO
export async function generateMetadata({ params }) {
  if (!params?.slug) {
    console.warn("Slug is missing in params!");
    return {}; // Avoid breaking the app
  }

  const category = await fetchCategoryDetails(params.slug);
  if (!category) {
    return {}; // Handle the case where category data is not available
  }

  const baseUrl = process.env.NEXTAUTH_URL;
  const firstPostImage = category?.posts?.[0]?.imageUrl
    ? `${baseUrl}${getPostImageUrl(category.posts[0].imageUrl)}`
    : `${baseUrl}/uploads/default-category.jpg`;

  return generatePageMetadata({
    title: `${category.name} Articles | MellyCrochets Blog`,
    description:
      category.description ||
      `Explore our collection of ${category.name} articles and blog posts`,

    keywords: [
      ...keywords,
      category.name,
      ...(
        category.posts?.slice(0, 3).map((post) => post.title.split(" ")) || []
      ).flat(),
      `${category.name} articles`,
      `${category.name} blog posts`,
    ]
      .filter(Boolean)
      .join(", "),

    slug: params.slug,

    image: firstPostImage,
    images:
      category?.posts?.slice(0, 3).map((post) => ({
        url: `${baseUrl}${getPostImageUrl(post.imageUrl)}`,
        width: 800,
        height: 600,
        alt: post.title,
      })) || [],

    url: `${baseUrl}/categories/${params.slug}`,
    alternates: {
      canonical: `${baseUrl}/categories/${params.slug}`,
    },

    publishedTime: new Date(category.createdAt).toISOString(),
    modifiedTime: new Date(category.updatedAt).toISOString(),

    openGraph: {
      type: "website",
      title: `Browse ${category.name} Articles`,
      description: `Collection of ${category.posts?.length || ""} ${
        category.name
      } blog posts`,
      url: `${baseUrl}/categories/${params.slug}`,
      siteName: "MellyCrochets",
      images: [
        {
          url: firstPostImage,
          width: 1200,
          height: 630,
          alt: `${category.name} Category`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${category.name} Articles`,
      description: `Discover ${category.posts?.length || ""} ${
        category.name
      } blog posts`,
      images: [firstPostImage],
      site: "@mellycrochets",
      creator: "@mellycrochets",
    },

    schema: {
      collectionPage: {
        name: `${category.name} Articles`,
        description: `Collection of ${category.name} blog posts`,
        hasPart:
          category.posts?.map((post) => ({
            "@type": "BlogPosting",
            name: post.title,
            url: `${baseUrl}/posts/${post.slug}`,
          })) || [],
      },
    },

    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
  });
}

export default async function IndexPage({ params }) {
  const { slug } = params;

  const category = await fetchCategoryBySlug(slug);

  return <CategoryPostsPage category={category} />;
}
