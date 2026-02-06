// hooks/useCurrency.ts
import { useDispatch, useSelector } from "react-redux";
import { getGeolocation } from "../service/geolocation.service";
import { useEffect } from "react";
import { setCurrency } from "../store/slice/currency.slice";
import { CURRENCY } from "../constants/constant";
import { format } from "../lib/format";

export const useCurrency = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency.currency);

  const setCurrencyFun = (currency) => {
    dispatch(setCurrency(currency));
  };

  function getConvertedPrice(priceInCfa, priceInUsd) {
    const convertedPrice =
      currency === CURRENCY.cfa
        ? format.number(priceInCfa) + " XAF"
        : "$" + format.number(priceInUsd);

    return convertedPrice;
  }

  function getPrice(priceInCfa, priceInUsd) {
    const convertedPrice = currency === CURRENCY.cfa ? priceInCfa : priceInUsd;

    return convertedPrice;
  }

  function convertPrice(price) {
    return currency === CURRENCY.cfa ? price : price * 600;
  }
  useEffect(() => {
    const fetchCurrency = async () => {
      const countryCode = await getGeolocation();
      if (!currency) {
        if (countryCode === "CM") {
          setCurrencyFun(CURRENCY.cfa);
        } else {
          setCurrencyFun(CURRENCY.usd);
        }
      }
    };

    fetchCurrency();
  }, []);

  return {
    currency,
    setCurrencyFun,
    getConvertedPrice,
    getPrice,
    convertPrice,
  };
};
