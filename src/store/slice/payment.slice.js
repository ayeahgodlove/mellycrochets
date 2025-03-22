import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  method: "COD",
};

export const paymentMethodSlice = createSlice({
  name: "paymentMethod",
  initialState,
  reducers: {
    setActivePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
  },
});

export const { setActivePaymentMethod } = paymentMethodSlice.actions;

const reducer = paymentMethodSlice.reducer;

export { reducer as paymentMethodReducer };
