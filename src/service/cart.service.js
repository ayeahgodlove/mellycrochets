import { BASE_URL } from "../constants/api-url";
import { requestType } from ".";
import axios from "axios";

export const CartService = {
  list: () => requestType.get(`/cart_items`),
  create: (crochetId, sizeId, quantity) =>
    requestType.post(`/cart_items`, { crochetId, sizeId, quantity }),
  remove: (crochetId, sizeId) =>
    requestType.del(`/cart_items/${(crochetId, sizeId)}`, {}),
  clear: () => requestType.del(`/cart_items`, {}),
};

export const addToCard = async (id) => {
  try {
    const resp = await axios.post(`${BASE_URL}/cart_items`, {
      userId: "1",
      crochets: [
        {
          id: id,
          quantity: 1,
        },
      ],
    });
    return resp.data;
  } catch (error) {
    return [];
  }
};

export const getAllCarts = async () => {
  try {
    const resp = await axios.get(`${BASE_URL}/cart_items`);
    console.log("🚀 ~ file: index.js:69 ~ getAllCarts ~ resp:", resp.data);
    return resp.data;
  } catch (error) {
    console.log("🚀 ~ file: index.js:55 ~ getAllCarts ~ error:", error);
    return [];
  }
};

export const getSingleCart = async (id = 1) => {
  try {
    const resp = await axios.get(`${BASE_URL}/cart_items/${id}`);
    console.log("🚀 ~ file: index.js:53 ~ getSingleCard ~ resp:", resp.data);
    return resp.data;
  } catch (error) {
    console.log("🚀 ~ file: index.js:55 ~ getSingleCard ~ error:", error);
    return [];
  }
};
