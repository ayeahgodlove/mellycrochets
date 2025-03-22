"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setActivePaymentMethod } from "../store/slice/payment.slice";

const usePaymentMethod = () => {
  const paymentMethod = useSelector(
    (state) => state.paymentMethod.paymentMethod
  );
  const dispatch = useDispatch();

  const setPaymentMethod = (paymentMethod) => {
    dispatch(setActivePaymentMethod(paymentMethod));
  };

  useEffect(() => {}, [paymentMethod]);

  return {
    paymentMethod,
    setPaymentMethod,
  };
};

export { usePaymentMethod };
