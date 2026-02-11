import BlogPostDetailPage from "../../../page-components/blog-posts/post-detail";
import { API_URL_UPLOADS_POSTS, getPostImageUrl } from "../../../constants/api-url";
import {
  fetchCategories,
  fetchLatestPosts,
  fetchPostBySlug,
  fetchTags,
} from "../../../utils/data";

import axios from "axios";
import { generatePageMetadata } from "../../../lib/metadata-generator";
import { keywords } from "../../../constants/constant";

const fetchPostDetails = async (slug) => {
  const response = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/posts/slug/${slug}`
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch post details");
  } else {
    return await response.data;
  }
};

// 🏷️ Generate Metadata for SEO
export async function generateMetadata({ params }) {
  if (!params?.slug) {
    return {}; // Avoid breaking the app
  }
  const post = await fetchPostDetails(params.slug);
  if (!post) {
    return {}; // Handle the case where post data is not available
  }
  return generatePageMetadata({
    title: `${post.title} | MellyCrochets Blog`,
    description: post.summary || `Read this post about ${post.title}`,
    keywords: [
      ...keywords,
      ...(post.tags?.map((tag) => tag.name) || []),
      post.category?.name || "",
    ].filter(Boolean)
      .join(", "),
    slug: params.slug,
    url: `${process.env.NEXTAUTH_URL}/blog_posts/${params.slug}`,
    alternates: {
      canonical: `${process.env.NEXTAUTH_URL}/blog_posts/${params.slug}`, // fixed $ sign
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
      url: `${process.env.NEXTAUTH_URL}/blog_posts/${params.slug}`,
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

export default async function IndexPage({ params }) {
  // Fetch data on server
  const [post, categories, tags, latestPosts] = await Promise.all([
    fetchPostBySlug(params.slug),
    fetchCategories(),
    fetchTags(),
    fetchLatestPosts(),
  ]);
  return (
    <BlogPostDetailPage
      post={post}
      categories={categories}
      tags={tags}
      latestPosts={latestPosts}
      uploadsBaseUrl={API_URL_UPLOADS_POSTS}
    />
  );
}
