const emptyCartItem = {
  id: "",
  crochetId: "",
  sizeId: "",
  userId: "",
  quantity: 0,
  total: 0,
  price: 0,
  colors: [],
  currency: "",
};

const emptyCrochetType = {
  id: "",
  name: "",
  slug: "",
  description: "",
};

const emptyOrderItem = {
  crochetId: "",
  orderId: "",
  qtty: 0,
  price: 0.0,
};

const emptyOrder = {
  id: "",
  userId: "",
  totalQtty: 0,
  discount: 0,
  totalAmount: 0.0,
  orderNo: "",
  username: "",
  address: "",
  email: "",
  telephone: "",
  status: "",
};

const emptyPayment = {
  id: "",
  userId: "",
  orderId: "",
  price: 0.0,
  email: "",
  cellPhone: "",
  status: "",
};

const emptyCrochet = {
  id: "", // Empty string for ID
  name: "",
  slug: "",
  description: "",
  crochetTypeId: "",
  imageUrls: [], // Empty array for images
  priceInCfa: 0.0, // Default price
  priceInUsd: 0.0, // Def
  createdAt: new Date().toISOString(), // Current timestamp
  updatedAt: new Date().toISOString(),
};

const emptyCrochetSize = {
  id: "", // Empty string for ID
  crochetId: "",
  sizeId: null, // Nullable
  colors: [], // Empty array for colors
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
const emptyMedia = {
  id: "",
  title: "",
  slug: "",
  imageUrl: "",
};
const emptyUser = {
  id: "",
  email: "",
  username: "",
  image: "",
  password: "",
  provider: "",
  phone: "",
  role: "",
  verified: false,
};

const emptyRole = {
  id: "",
  name: "",
};

const emptyTag = {
  id: "",
  name: "",
};

const emptyComment = {
  id: "",
  userId: "",
  postId: "",
  message: "",
  toggle: false,
};

const emptyCategory = {
  id: "",
  name: "",
};

const emptySubscriber = {
  id: "",
  email: "",
};

const emptyReview = {
  id: "",
  userId: "",
  crochetId: "",
  comment: "",
  rating: 0,
  toggle: false,
};

const emptyAfterCare = {
  id: "",
  slug: "",
  title: "",
  videoUrl: "",
  description: "",
};

const emptySize = {
  id: "",
  label: "",
};

const emptyPost = {
  id: "",
  title: "",
  summary: "",
  slug: "",
  content: "",
  imageUrl: "",
  publishedAt: null,
  authorId: "",
  categoryId: "",
};

const emptyContact = {
  id: "",
  name: "",
  email: "",
  phone: "",
  message: "",
};

export {
  emptyCrochetSize,
  emptyCartItem,
  emptyCrochetType,
  emptyOrderItem,
  emptyOrder,
  emptyPayment,
  emptyCrochet,
  emptyMedia,
  emptyUser,
  emptyRole,
  emptyReview,
  emptySubscriber,
  emptyAfterCare,
  emptySize,
  emptyPost,
  emptyCategory,
  emptyTag,
  emptyComment,
  emptyContact,
};
