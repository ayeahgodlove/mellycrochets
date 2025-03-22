import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constants/api-url";

export const sizeAPI = createApi({
  reducerPath: "sizeAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  tagTypes: ["Size"],
  endpoints: (build) => ({
    getSingleSize: build.query({
      query: (sizeId) => `/sizes/${sizeId}`,
      transformResponse: (response) => ({
        ...response,
        createdAt: new Date(response.createdAt).toISOString(), // Ensure createdAt is a string
      }),
    }),
    fetchAllSizes: build.query({
      query: (page = 1) => `/sizes?page=${page}`,
      transformResponse: (response) => {
        // Ensure each size's createdAt field is an ISO string
        const transformedSizes = response.map((size) => ({
          ...size,
          createdAt: new Date(size.createdAt).toISOString(), // Convert date to ISO string
        }));
        return transformedSizes;
      },
    }),
  }),
});
