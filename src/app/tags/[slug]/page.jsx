import TagPostsPage from "../../../page-components/tags/tag-posts-page";
import { getPostImageUrl } from "../../../constants/api-url";
import { fetchTagBySlug } from "../../../utils/data";
import { generatePageMetadata } from "../../../lib/metadata-generator";
import { keywords } from "../../../constants/constant";
import { JsonLd } from "../../../components/seo/json-ld";

export async function generateMetadata({ params }) {
  const resolved = await params;
  if (!resolved?.slug) return {};
  const tag = await fetchTagBySlug(resolved.slug);
  if (!tag) return {};
  return generatePageMetadata({
    title: `${tag.name} Content | MellyCrochets Blog`,
    description:
      tag.description ||
      `Discover ${tag.posts?.length || ""} articles tagged with ${tag.name}`,
    keywords: [
      ...keywords,
      tag.name,
      ...(
        tag.posts?.slice(0, 3).map((post) => post.title.split(" ")) || []
      ).flat(),
      `${tag.name} articles`,
      `${tag.name} blog posts`,
      `posts about ${tag.name}`,
    ]
      .filter(Boolean)
      .join(", "),
    url: `${process.env.NEXTAUTH_URL}/tags/${resolved.slug}`,
    alternates: {
      canonical: `${process.env.NEXTAUTH_URL}/tags/${resolved.slug}`,
    },

    // Media
    image: tag.posts[0]?.imageUrl
      ? `${process.env.NEXTAUTH_URL}${getPostImageUrl(tag.posts[0].imageUrl)}`
      : `${process.env.NEXTAUTH_URL}/uploads/default-tag.jpg`,
    images:
      tag.posts?.slice(0, 3).map((post) => ({
        url: `${process.env.NEXTAUTH_URL}${getPostImageUrl(post.imageUrl)}`,
        width: 800,
        height: 600,
        alt: post.title,
      })) || [],

    url: `${process.env.NEXTAUTH_URL}/tags/${resolved.slug}`,
    publishedTime: new Date(tag.createdAt).toISOString(),
    modifiedTime: new Date(tag.updatedAt).toISOString(),
    // OpenGraph
    openGraph: {
      type: "website",
      title: `${tag.name} Content Collection`,
      description: `${tag.posts?.length || ""} articles tagged with ${
        tag.name
      }`,
      images: [
        `${process.env.NEXTAUTH_URL}/uploads/crochets/crochet-dress-main.jpg`,
      ],
      siteName: "MellyCrochets",
      locale: "en_US",
      url: process.env.NEXTAUTH_URL,
      type: "website",
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      title: `#${tag.name} Articles`,
      description: `Explore ${tag.posts?.length || ""} posts about ${tag.name}`,
      images: [
        `${process.env.NEXTAUTH_URL}/uploads/crochets/crochet-dress-main.jpg`,
      ],
      creator: "@mellycrochets",
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    // Structured data
    schema: {
      collectionPage: {
        name: `${tag.name} Articles`,
        about: tag.name,
        description: `Collection of content tagged with ${tag.name}`,
        hasPart:
          tag.posts?.map((post) => ({
            "@type": "BlogPosting",
            name: post.title,
            url: `${process.env.NEXTAUTH_URL}/blog_posts/${post.slug}`,
            keywords: tag.name,
          })) || [],
      },
      // Add hashtag schema for better topic recognition
      hashtag: {
        "@type": "Thing",
        name: tag.name,
        url: `${process.env.NEXTAUTH_URL}/tags/${resolved.slug}`,
      },
    },
  });
}
function buildTagBreadcrumbSchema(tag, baseUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: tag.name,
        item: `${baseUrl}/tags/${tag.slug}`,
      },
    ],
  };
}

export default async function IndexPage({ params }) {
  const resolved = await params;
  const slug = resolved?.slug;
  const tag = await fetchTagBySlug(slug);
  const baseUrl = process.env.NEXTAUTH_URL || "";
  const breadcrumbSchema = tag ? buildTagBreadcrumbSchema(tag, baseUrl) : null;

  return (
    <>
      {breadcrumbSchema && <JsonLd data={breadcrumbSchema} />}
      <TagPostsPage tag={tag} />
    </>
  );
}
