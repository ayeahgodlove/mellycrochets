import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/user_api";
import { crochetReducer } from "./slice/crochet.slice";
import { crochetAPI } from "./api/crochet_api";
import { crochetTypeAPI } from "./api/crochet_type_api";
import { postAPI } from "./api/post_api";
import { categoryAPI } from "./api/category_api";
import { afterCareAPI } from "./api/after_care_api";
import { sizeAPI } from "./api/size_api";
import { paymentMethodReducer } from "./slice/payment.slice";
import { cartItemAPI } from "./api/cart_item_api";

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [crochetAPI.reducerPath]: crochetAPI.reducer,
    [crochetTypeAPI.reducerPath]: crochetTypeAPI.reducer,
    [categoryAPI.reducerPath]: categoryAPI.reducer,
    [postAPI.reducerPath]: postAPI.reducer,
    [afterCareAPI.reducerPath]: afterCareAPI.reducer,
    [sizeAPI.reducerPath]: sizeAPI.reducer,
    [cartItemAPI.reducerPath]: cartItemAPI.reducer,
    crochets: crochetReducer,
    paymentMethod: paymentMethodReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      userAPI.middleware,
      categoryAPI.middleware,
      crochetTypeAPI.middleware,
      crochetAPI.middleware,
      postAPI.middleware,
      afterCareAPI.middleware,
      sizeAPI.middleware,
      cartItemAPI.middleware,
    ]),
});

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
