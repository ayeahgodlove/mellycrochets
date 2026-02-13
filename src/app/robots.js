export default function robots() {
  const baseUrl = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/shop",
        "/crochets/*",
        "/crochet_designs/*",
        "/blog",
        "/blog_posts/*",
        "/categories/*",
        "/tags/*",
        "/about",
        "/contact",
        "/privacy-policy",
        "/feed.xml",
        "/rss.xml",
      ],
      disallow: [
        "/dashboard/*",
        "/api/*",
        "/admin/*",
        "/checkout/*",
        "/cart*",
        "/account/*",
        "/private-*",
        "/404", // optional
      ],
      crawlDelay: 10,
      cleanParam: "ref,utm_source,utm_medium,utm_campaign,sessionid",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}