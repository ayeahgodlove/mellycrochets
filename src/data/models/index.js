const emptyCartItem = {
  id: "",
  crochetId: "",
  sizeId: "",
  userId: "",
  quantity: 0,
  total: 0,
  price: 0,
};

const emptyCrochetType = {
  id: "",
  name: "",
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
  cellPhone: "",
  status: "",
};

const emptyPayment = {
  id: "",
  userId: "",
  orderId: "",
  orderNo: "",
  amount: 0.0,
  address: "",
  email: "",
  cellPhone: "",
  status: "",
};

const emptyCrochet = {
  id: "",
  crochetTypeId: "",
  name: "",
  brand: "",
  species: "",
  price: 0.0,
  shortDescription: "",
  description: "",
  stockQuantity: 0,
  crochetImages: [],
  tags: [],
  isAvailable: true,
  expirationDate: null,
  rating: 0.0,
  discountPercentage: 0.0,
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
  title: "",
  videoUrl: "",
  description: "",
};

const emptySize = {
  id: "",
  label: "",
};
module.exports = {
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
};
