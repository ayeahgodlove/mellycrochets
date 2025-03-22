import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/api-url";

export const cartItemAPI = createApi({
  reducerPath: "cartItemAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  tagTypes: ["CartItem"],
  endpoints: (build) => ({
    getSingleCartItem: build.query({
      query: (cartItemId) => `/cart_items/${cartItemId}`,
      transformResponse: (response) => ({
        ...response,
        createdAt: new Date(response.createdAt).toISOString(), // Ensure createdAt is a string
      }),
    }),
    fetchAllCartItems: build.query({
      query: (page = 1) => `/cart_items?page=${page}`,
      transformResponse: (response) => {
        // Ensure each cartItem's createdAt field is an ISO string
        const transformedCartItems = response.map((cartItem) => ({
          ...cartItem,
          createdAt: new Date(cartItem.createdAt).toISOString(), // Convert date to ISO string
        }));
        return transformedCartItems;
      },
    }),
  }),
});
