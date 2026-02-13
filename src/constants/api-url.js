const API_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";
const API_URL_UPLOADS_POSTS = `/uploads/posts`;
const API_URL_UPLOADS_MEDIA = `/uploads/media`;
const API_URL_UPLOADS_CROCHETS = `/uploads/crochets`;

const TINYMCE_KEY = `jmee0ymvhn8xuoj51dz5vzj032x5887fw5aa4yojvi9pu68z`;

const BASE_URL = `/api`;

/** Post imageUrl may be stored as filename only or full path; returns full URL for display. */
function getPostImageUrl(imageUrl) {
  if (!imageUrl || typeof imageUrl !== "string") return "";
  if (imageUrl.startsWith("/") || imageUrl.startsWith("http")) return imageUrl;
  return `${API_URL_UPLOADS_POSTS}/${imageUrl}`;
}

module.exports = {
  API_URL_UPLOADS_POSTS,
  API_URL_UPLOADS_MEDIA,
  API_URL_UPLOADS_CROCHETS,
  BASE_URL,
  API_URL,
  getPostImageUrl,
};
