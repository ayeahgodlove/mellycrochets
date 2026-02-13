import BlogPostDetailPage from "../../../page-components/blog-posts/post-detail";
import { API_URL_UPLOADS_POSTS, getPostImageUrl } from "../../../constants/api-url";
import {
  fetchCategories,
  fetchLatestPosts,
  fetchPostBySlug,
  fetchTags,
} from "../../../utils/data";
import { generatePageMetadata } from "../../../lib/metadata-generator";
import { keywords } from "../../../constants/constant";
import { JsonLd } from "../../../components/seo/json-ld";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug) return {};
  const post = await fetchPostBySlug(slug);
  if (!post) return {};
  return generatePageMetadata({
    title: `${post.title} | MellyCrochets Blog`,
    description: post.summary || `Read this post about ${post.title}`,
    keywords: [
      ...keywords,
      ...(post.tags?.map((tag) => tag.name) || []),
      post.category?.name || "",
    ].filter(Boolean)
      .join(", "),
    slug,
    url: `${process.env.NEXTAUTH_URL}/blog_posts/${slug}`,
    alternates: {
      canonical: `${process.env.NEXTAUTH_URL}/blog_posts/${slug}`,
    },
    image: `${process.env.NEXTAUTH_URL}${getPostImageUrl(post.imageUrl)}`,
    images: [
      {
        url: `${process.env.NEXTAUTH_URL}${getPostImageUrl(post.imageUrl)}`,
        width: 1200,
        height: 630,
        alt: post.title,
      },
    ],

    type: "article",
    authors: post.user ? [post.user.email] : undefined,
    publishedTime: new Date(post.createdAt).toISOString(),
    modifiedTime: new Date(post.updatedAt).toISOString(),

    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary || `Read this post about ${post.title}`,
      url: `${process.env.NEXTAUTH_URL}/blog_posts/${slug}`,
      siteName: "MellyCrochets",
      images: [
        {
          url: `${process.env.NEXTAUTH_URL}${getPostImageUrl(post.imageUrl)}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: new Date(post.createdAt).toISOString(),
      modifiedTime: new Date(post.updatedAt).toISOString(),
      locale: "en_US",
      tags: post.tags?.map((tag) => tag.name) || [],
    },

    twitter: {
      card: "summary_large_image",
      title: `${post.title} | MellyCrochets Blog`,
      description: post.summary || `Read this post about ${post.title}`,
      images: [`${process.env.NEXTAUTH_URL}${getPostImageUrl(post.imageUrl)}`],
      site: "@mellycrochets",
      creator: "@mellycrochets",
    },

    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
      shortcut: "/favicon.ico",
    },

    schema: {
      article: {
        publishedTime: new Date(post.createdAt).toISOString(),
        modifiedTime: new Date(post.updatedAt).toISOString(),
        authors: post.user ? [post.user.name || post.user.email] : undefined,
        tags: post.tags?.map((tag) => tag.name) || [],
      },
    },
  });
}

function buildBlogPostBreadcrumbSchema(post, baseUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${baseUrl}/blog_posts/${post.slug}`,
      },
    ],
  };
}

export default async function IndexPage({ params }) {
  const { slug } = await params;
  const [post, categories, tags, latestPosts] = await Promise.all([
    fetchPostBySlug(slug),
    fetchCategories(),
    fetchTags(),
    fetchLatestPosts(),
  ]);
  const baseUrl = process.env.NEXTAUTH_URL || "";
  const breadcrumbSchema = post ? buildBlogPostBreadcrumbSchema(post, baseUrl) : null;

  return (
    <>
      {breadcrumbSchema && <JsonLd data={breadcrumbSchema} />}
      <BlogPostDetailPage
        post={post}
        categories={categories}
        tags={tags}
        latestPosts={latestPosts}
        uploadsBaseUrl={API_URL_UPLOADS_POSTS}
      />
    </>
  );
}
