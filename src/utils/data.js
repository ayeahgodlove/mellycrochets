import axios from "axios";
import { BASE_URL } from "../constants/api-url";

// Prefer same origin in server context (e.g. localhost in dev) so API routes are hit locally
const getBaseUrl = () =>
  typeof window !== "undefined"
    ? ""
    : process.env.NEXTAUTH_URL || "http://localhost:3000";

export async function fetchCrochetBySlug(slug) {
  const base = getBaseUrl();
  const res = await fetch(`${base}${BASE_URL}/crochets/slugs/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch crochet");
  return await res.json();
}

export async function fetchPostBySlug(slug) {
  const base = getBaseUrl();
  const res = await axios.get(`${base}${BASE_URL}/posts/slug/${slug}`);

  if (res.status !== 200) throw new Error("Failed to fetch post");
  return res.data;
}

export async function fetchCategoryBySlug(slug) {
  const base = getBaseUrl();
  const res = await axios.get(`${base}${BASE_URL}/categories/slugs/${slug}`);

  if (res.status !== 200) throw new Error("Failed to fetch category");
  return res.data;
}

export async function fetchTagBySlug(slug) {
  const base = getBaseUrl();
  const res = await axios.get(`${base}${BASE_URL}/tags/slugs/${slug}`);

  if (res.status !== 200) throw new Error("Failed to fetch tag");
  return res.data;
}

export async function fetchCategories() {
  const base = getBaseUrl();
  const res = await axios.get(`${base}${BASE_URL}/categories`);
  if (res.status !== 200) throw new Error("Failed to fetch categories");
  return res.data;
}

export async function fetchTags() {
  const base = getBaseUrl();
  const res = await axios.get(`${base}${BASE_URL}/tags`);
  if (res.status !== 200) throw new Error("Failed to fetch tags");
  return res.data;
}

export async function fetchLatestPosts() {
  const base = getBaseUrl();
  const res = await axios.get(`${base}${BASE_URL}/posts/latest_posts`);
  if (res.status !== 200) throw new Error("Failed to fetch latest posts");
  return res.data;
}
