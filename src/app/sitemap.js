import { getPostImageUrl } from "../constants/api-url";
import { CrochetRepository } from "../data/repositories/crochet.repository";
import { CrochetTypeRepository } from "../data/repositories/crochet-type.repository";
import { CategoryRepository } from "../data/repositories/category.repository";
import { TagRepository } from "../data/repositories/tag.repository";
import { PostRepository } from "../data/repositories/post.repository";

const crochetRepository = new CrochetRepository();
const crochetTypeRepository = new CrochetTypeRepository();
const categoryRepository = new CategoryRepository();
const tagRepository = new TagRepository();
const postRepository = new PostRepository();

export default async function sitemap() {
  const baseUrl = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";

  let crochets = [];
  let blogs = [];
  let crochetTypes = [];
  let categories = [];
  let tags = [];

  try {
    [crochets, blogs, crochetTypes, categories, tags] = await Promise.all([
      crochetRepository.getAll(),
      postRepository.getAll(),
      crochetTypeRepository.getAll(),
      categoryRepository.getAll(),
      tagRepository.getAll(),
    ]);
  } catch (err) {
    console.warn("Sitemap: could not load dynamic data (e.g. DB unavailable at build). Using static entries only.", err?.message);
  }

  // Normalize to plain objects where needed (Sequelize models have .get())
  const toPlain = (item) => (item?.get ? item.get() : item);
  crochets = Array.isArray(crochets) ? crochets.map(toPlain) : [];
  blogs = Array.isArray(blogs) ? blogs.map(toPlain) : [];
  crochetTypes = Array.isArray(crochetTypes) ? crochetTypes.map(toPlain) : [];
  categories = Array.isArray(categories) ? categories.map(toPlain) : [];
  tags = Array.isArray(tags) ? tags.map(toPlain) : [];

  const crochetsData = crochets.map((crochet) => ({
    url: `${baseUrl}/crochets/${crochet?.slug}`,
    lastModified: new Date(crochet?.updatedAt || crochet?.createdAt),
    changeFrequency: "weekly",
    priority: 0.8,
    images: (crochet?.imageUrls || []).map((imageUrl) => ({
      url: `${baseUrl}/uploads/crochets/${typeof imageUrl === "string" ? imageUrl : imageUrl?.url || ""}`,
      alt: crochet?.name,
    })).filter((img) => img.url !== `${baseUrl}/uploads/crochets/`),
  }));

  const blogsData = blogs.map((blog) => ({
    url: `${baseUrl}/blog_posts/${blog?.slug}`,
    lastModified: new Date(blog?.updatedAt || blog?.createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
    images: blog?.imageUrl
      ? [{ url: `${baseUrl}${getPostImageUrl(blog?.imageUrl)}`, alt: blog?.title }]
      : [],
  }));

  const crochetTypeData = crochetTypes.map((crochetType) => ({
    url: `${baseUrl}/crochet_designs/${crochetType?.slug}`,
    lastModified: new Date(crochetType?.updatedAt || crochetType?.createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryData = categories.map((category) => ({
    url: `${baseUrl}/categories/${category?.slug}`,
    lastModified: new Date(category?.updatedAt || category?.createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const tagData = tags.map((tag) => ({
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
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/blog_posts`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ...crochetsData,
    ...crochetTypeData,
    ...blogsData,
    ...categoryData,
    ...tagData,
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/register`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
