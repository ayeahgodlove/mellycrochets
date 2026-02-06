import axios from "axios";

export default async function sitemap() {
  const baseUrl = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";

  // Fetch both crochets and blog posts in parallel
  const [
    crochetsResponse,
    blogsResponse,
    crochetTypesResponse,
    categoryResponse,
    tagsResponse,
  ] = await Promise.all([
    axios.get(`${baseUrl}/api/crochets`),
    axios.get(`${baseUrl}/api/posts`),
    axios.get(`${baseUrl}/api/crochet_types`),
    axios.get(`${baseUrl}/api/categories`),
    axios.get(`${baseUrl}/api/tags`),
  ]);

  const crochets = crochetsResponse.data;
  const blogs = blogsResponse.data;
  const crochetTypes = crochetTypesResponse.data;
  const categories = categoryResponse.data;
  const tags = tagsResponse.data;

  // Generate crochet URLs
  const crochetsData = crochets?.map((crochet) => ({
    url: `${baseUrl}/crochets/${crochet?.slug}`,
    lastModified: new Date(crochet?.updatedAt || crochet?.createdAt),
    changeFrequency: "weekly",
    priority: 0.8,
    images: crochet?.imageUrls?.map((imageUrl) => ({
      url: `${baseUrl}/uploads/crochets/${imageUrl}`,
      alt: crochet?.name,
    })),
  }));

  // Generate blog URLs
  const blogsData = blogs?.map((blog) => ({
    url: `${baseUrl}/blog_posts/${blog?.slug}`,
    lastModified: new Date(blog?.updatedAt || blog?.createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
    images: blog?.imageUrl
      ? [
          {
            url: `${baseUrl}/uploads/posts/${blog?.imageUrl}`,
            alt: blog?.title,
          },
        ]
      : [],
  }));

  // generate crochet designs urls
  const crochetTypeData = crochetTypes?.map((crochetType) => ({
    url: `${baseUrl}/crochet_designs/${crochetType?.slug}`,
    lastModified: new Date(crochetType?.updatedAt || crochetType?.createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryData = categories?.map((category) => ({
    url: `${baseUrl}/categories/${category?.slug}`,
    lastModified: new Date(category?.updatedAt || category?.createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const tagData = tags?.map((tag) => ({
    url: `${baseUrl}/tags/${tag?.slug}`,
    lastModified: new Date(tag?.updatedAt || tag?.createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Static pages
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog_posts`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // Dynamic content
    ...crochetsData,
    ...crochetTypeData,
    ...blogsData,
    ...categoryData,
    ...tagData,
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
