import axios from "axios";
import { nanoid } from "nanoid";

const getAuthToken = async () => {
  const response = await axios.post(
    `${process.env.TRANZAK_API_URL}/auth/token`,
    {
      appId: `${process.env.TRANZAK_APPID}`,
      appKey: `${process.env.TRANZAK_API_KEY}`,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data;
};

// Helper function that initiates a Momo payment
const initiateMomoPayment = async (amount, description, returnUrl) => {
  const tokenData = await getAuthToken();
  const response = await axios.post(
    `${process.env.TRANZAK_API_URL}/xp021/v1/request/create`,
    {
      amount,
      currencyCode: "XAF",
      description,
      mchTransactionRef: nanoid(30),
      returnUrl,
      payerNote: description,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData.token}`,
        "X-App-ID": tokenData.appId,
      },
    }
  );

  return response.data.data;
};

const getPaymentHistory = async () => {
  const tokenData = await getAuthToken();

  const response = await axios.get(
    `${process.env.TRANZAK_API_URL}/xp021/v1/request/history`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData.token}`,
        "X-App-ID": tokenData.appId,
      },
    }
  );

  return response.data;
};
const getPaymentStatus = async (requestId) => {
  const tokenData = await getAuthToken();

  const response = await axios.post(
    `${process.env.TRANZAK_API_URL}/xp021/v1/request/refresh-transaction-status`,
    {
      requestId: requestId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData.token}`,
        "X-App-ID": tokenData.appId,
      },
    }
  );

  return response.data;
};

export {
  getAuthToken,
  initiateMomoPayment,
  getPaymentStatus,
  getPaymentHistory,
};
