"use client";

import { Card, Image, Typography } from "@/components/ui";
import { CheckCircle, ShieldCheck, Undo2, CreditCard, Lock } from "lucide-react";
import { useTranslations } from "next-intl";

const { Title, Text } = Typography;

export const TrustBadge = () => {
  const t = useTranslations("customer_detail");
  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Title level={2} className="!text-3xl md:!text-4xl font-bold text-gray-900 !mb-3">
            {t("paymentInfo")}
          </Title>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your security and satisfaction are our top priorities
          </p>
        </div>

        {/* Trust Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Secure Checkout */}
          <Card className="shadow-xl border-0 overflow-hidden p-0 bg-white hover:shadow-2xl transition-all duration-300">
            <div className="bg-gradient-to-br from-red-900 to-red-800 p-6">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <ShieldCheck className="text-white" size={32} strokeWidth={2} />
              </div>
            </div>
            <div className="p-6">
              <Text strong className="!text-lg !text-gray-900 !mb-2 block">
                {t("title1")}
              </Text>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("desc1")}
              </p>
            </div>
          </Card>

          {/* Refund Policy */}
          <Card className="shadow-xl border-0 overflow-hidden p-0 bg-white hover:shadow-2xl transition-all duration-300">
            <div className="bg-gradient-to-br from-red-800 to-red-700 p-6">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <Undo2 className="text-white" size={32} strokeWidth={2} />
              </div>
            </div>
            <div className="p-6">
              <Text strong className="!text-lg !text-gray-900 !mb-2 block">
                {t("title2")}
              </Text>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("desc2")}
              </p>
            </div>
          </Card>

          {/* Verified Payments */}
          <Card className="shadow-xl border-0 overflow-hidden p-0 bg-white hover:shadow-2xl transition-all duration-300">
            <div className="bg-gradient-to-br from-red-700 to-red-600 p-6">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <CheckCircle className="text-white" size={32} strokeWidth={2} />
              </div>
            </div>
            <div className="p-6">
              <Text strong className="!text-lg !text-gray-900 !mb-2 block">
                {t("title3")}
              </Text>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("desc3")}
              </p>
            </div>
          </Card>
        </div>

        {/* Payment Logos */}
        <Card className="shadow-xl border-0 overflow-hidden p-0 bg-white">
          <div className="bg-gradient-to-r from-red-900 to-red-800 px-6 py-4">
            <Title level={4} className="!text-white !mb-0 flex items-center justify-center gap-2">
              <CreditCard size={24} />
              {t("weAccept")}
            </Title>
          </div>
          <div className="p-8 bg-white">
            <div className="flex justify-center items-center flex-wrap gap-8 md:gap-12">
              <div className="group p-4 rounded-xl bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-red-200 transition-all duration-300 cursor-pointer">
                <Image
                  src="/icons/mtn-momo.png"
                  height={60}
                  width={60}
                  preview={false}
                  className="object-contain"
                />
              </div>
              <div className="group p-4 rounded-xl bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-red-200 transition-all duration-300 cursor-pointer">
                <Image
                  src="/icons/orange-money.svg"
                  height={60}
                  width={60}
                  preview={false}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
