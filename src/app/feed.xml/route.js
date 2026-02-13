import { PostRepository } from "../../data/repositories/post.repository";
import { getPostImageUrl } from "../../constants/api-url";

const postRepository = new PostRepository();

function escapeXml(str) {
  if (str == null || str === "") return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildRssXml(posts, baseUrl) {
  const siteTitle = "MellyCrochets Blog";
  const siteDescription = "Handcrafted crochet fashion and blog from MellyCrochets.";
  const lastBuildDate = new Date().toUTCString();

  const items = posts
    .map((post) => {
      const plain = post?.get ? post.get() : post;
      const link = `${baseUrl}/blog_posts/${plain.slug}`;
      const pubDate = plain.createdAt ? new Date(plain.createdAt).toUTCString() : lastBuildDate;
      const title = escapeXml(plain.title || "");
      const description = escapeXml(plain.summary || plain.title || "");
      const imageUrl = plain.imageUrl ? `${baseUrl}${getPostImageUrl(plain.imageUrl)}` : "";
      const enclosure = imageUrl
        ? `\n    <enclosure url="${escapeXml(imageUrl)}" type="image/jpeg" />`
        : "";
      return `<item>
    <title>${title}</title>
    <link>${escapeXml(link)}</link>
    <description>${description}</description>
    <pubDate>${pubDate}</pubDate>
    <guid isPermaLink="true">${escapeXml(link)}</guid>${enclosure}
  </item>`;
    })
    .join("\n  ");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteTitle)}</title>
    <link>${escapeXml(baseUrl)}</link>
    <description>${escapeXml(siteDescription)}</description>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(baseUrl)}/feed.xml" rel="self" type="application/rss+xml" />
${items ? `  ${items}` : ""}
  </channel>
</rss>`;
}

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";
  let posts = [];
  try {
    posts = await postRepository.getAll();
    posts = Array.isArray(posts) ? posts : [];
    posts.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.updatedAt || 0);
      const dateB = new Date(b.createdAt || b.updatedAt || 0);
      return dateB - dateA;
    });
    posts = posts.slice(0, 50);
  } catch (err) {
    console.warn("Feed: could not load posts", err?.message);
  }

  const xml = buildRssXml(posts, baseUrl);
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
