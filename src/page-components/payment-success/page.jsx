"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCreate, useGetIdentity } from "@refinedev/core";
import { Button, message, Result, Typography, Card } from "@/components/ui";
import { useSearchParams, useRouter } from "next/navigation";
import { ORDER_STATUS } from "../../constants/constant";
import axios from "axios";
import { OrderService } from "../../service/order.service";
import { usePaymentMethod } from "../../hooks/payment-method";
import { FaWhatsapp } from "react-icons/fa";
import { CheckCircle2, XCircle, Home, ShoppingBag, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const PaymentSuccessPage = () => {
  const { mutate: createPayment } = useCreate();
  const { data: user } = useGetIdentity();
  const { paymentMethod } = usePaymentMethod();
  const searchParams = useSearchParams();
  const [telephone, setTelephone] = useState("");

  const orderId = searchParams.get("orderId");
  const transactionId = searchParams.get("transactionId");
  const requestId = searchParams.get("requestId");
  const success = searchParams.get("success") === "true";

  const hasProcessed = useRef(false);
  
  // Fallback translations
  const fallbackTranslations = {
    titleSuccess: "Thank You for Your Purchase!",
    titleFailed: "Payment Failed",
    subTitleSuccess: "We've received your order and are processing it. A confirmation email has been sent to you.",
    subTitleFailed: "We failed to receive your payments, please verify your payment status.",
    messageTitle: "Hello *MellyCrochets*, I think I want to verify the status of my payment",
    transactionTitle: "*Transaction Details*",
    paymentMethod: "Payment Method:",
    orderId: "Order ID:",
    transactionId: "Transaction ID:",
    requestId: "Request ID",
    contact: "Contact Us"
  };

  // Use translations hook - must be called at top level
  // Use fallback if hook is not available
  let translationFn;
  try {
    translationFn = useTranslations("payment_success");
  } catch (error) {
    // If hook fails, create a fallback function
    translationFn = null;
  }
  
  // Safe translation wrapper
  const t = (key) => {
    if (translationFn) {
      try {
        return translationFn(key);
      } catch {
        return fallbackTranslations[key] || key;
      }
    }
    return fallbackTranslations[key] || key;
  };

  useEffect(() => {
    const fetchAndProcessPayment = async () => {
      if (hasProcessed.current || !orderId || !transactionId || !requestId)
        return;
      hasProcessed.current = true;
      try {
        const [paymentRes, orderRes] = await Promise.all([
          axios.get(`/api/momo/status/${requestId}`),
          axios.get(`/api/orders/${orderId}`),
        ]);

        const payment = paymentRes.data?.data;
        const order = orderRes.data;
        const payer = payment?.payer;

        const isSuccessful =
          paymentRes.status === 200 &&
          payment?.status === "SUCCESSFUL" &&
          orderRes.status === 200;

        const updatedStatus = isSuccessful
          ? ORDER_STATUS.PAID
          : ORDER_STATUS.CANCELLED;
        const accountId = payer?.accountId ?? "";

        setTelephone(accountId);

        await OrderService.update({
          ...order,
          status: updatedStatus,
          telephone: accountId,
        });

        const customerEmail = user?.email ?? order?.email;
        const customerPhone = accountId || order?.telephone || "";
        if (customerEmail) {
          try {
            await axios.post("/api/notify/order-status", {
              orderId,
              status: isSuccessful ? "completed" : "failed",
              email: customerEmail,
              telephone: customerPhone,
              orderNo: order?.orderNo || orderId,
            });
          } catch (notifyErr) {
            console.error("Order status notify failed:", notifyErr);
          }
        }

        if (!isSuccessful) {
          message.error("Payment not successful");
          return;
        }

        createPayment({
          resource: "payments",
          values: {
            orderId,
            userId: user?.id ?? null,
            transactionId,
            requestId,
            status: payment.status,
            username: payer.name,
            email: user?.email ?? order.email,
            telephone: accountId,
            currency: payment.currencyCode,
            price: payment.amount,
            countryCode: payer?.countryCode,
            paymentMethod: payer?.paymentMethod,
            transactionTime: payment.transactionTime,
            mchTransactionRef: payment.mchTransactionRef,
            description: payment.description,
          },
        });
      } catch (error) {
        console.error("Payment handling error:", error);
      }
    };

    fetchAndProcessPayment();
  }, [orderId, transactionId, requestId]);

  // Safe translation fallback - must be defined before use
  const safeTranslate = (key, fallback) => {
    try {
      return t(key);
    } catch (error) {
      return fallback || key;
    }
  };

  const renderTitle = success ? safeTranslate("titleSuccess", "Thank You for Your Purchase!") : safeTranslate("titleFailed", "Payment Failed");
  const renderSubTitle = success ? safeTranslate("subTitleSuccess", "We've received your order and are processing it. A confirmation email has been sent to you.") : safeTranslate("subTitleFailed", "We failed to receive your payments, please verify your payment status.");

  const messageText = encodeURIComponent(
    `${safeTranslate("messageTitle", "Hello *MellyCrochets*, I think I want to verify the status of my payment")}\n` +
      `${safeTranslate("transactionTitle", "*Transaction Details*")}\n` +
      `${safeTranslate("paymentMethod", "Payment Method:")} ${paymentMethod}\n` +
      `${safeTranslate("orderId", "Order ID:")} ${orderId}\n` +
      `${safeTranslate("transactionId", "Transaction ID:")} ${transactionId}\n` +
      `${safeTranslate("requestId", "Request ID")}: ${requestId}`
  );

  const whatsappUrl = `https://wa.me/237681077051?text=${messageText}`;
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <Card className="shadow-xl border-0 overflow-hidden">
          <div className={`${success ? 'bg-gradient-to-r from-green-600 to-emerald-700' : 'bg-gradient-to-r from-red-900 to-red-800'} p-8 text-white`}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`${success ? 'bg-white/20' : 'bg-white/20'} rounded-full p-4 backdrop-blur-sm`}>
                {success ? (
                  <CheckCircle2 size={64} className="text-white" strokeWidth={2} />
                ) : (
                  <XCircle size={64} className="text-white" strokeWidth={2} />
                )}
              </div>
              <Typography.Title level={2} className="!text-white !mb-0">
                {renderTitle}
              </Typography.Title>
              <p className="text-white/90 text-lg max-w-md">
                {renderSubTitle}
              </p>
            </div>
          </div>

          <div className="p-8 bg-white">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push("/")}
                type="primary"
                size="large"
                className="flex items-center justify-center gap-2 bg-red-800 hover:bg-red-900 text-white px-8 py-6 h-auto rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                <Home size={20} />
                Back to Home
              </Button>
              
              {success ? (
                <Button
                  onClick={() => router.push(`/orders?telephone=${telephone}`)}
                  size="large"
                  className="flex items-center justify-center gap-2 border-2 border-red-800 text-red-800 hover:bg-red-50 px-8 py-6 h-auto rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  <ShoppingBag size={20} />
                  View My Orders
                  <ArrowRight size={18} />
                </Button>
              ) : (
                <Button
                  onClick={() => window.open(whatsappUrl, '_blank')}
                  size="large"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-8 py-6 h-auto rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  <FaWhatsapp size={22} />
                  {safeTranslate("contact", "Contact Us")}
                </Button>
              )}
            </div>

            {success && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-800 text-center">
                    <strong>What's next?</strong> You'll receive an email confirmation shortly. 
                    Our team will process your order and keep you updated on its status.
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
