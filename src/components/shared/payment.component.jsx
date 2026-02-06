"use client";

import { Card, Image, Typography } from "@/components/ui";
import { CheckCircle, ShieldCheck, Undo2 } from "lucide-react";
import { useTranslations } from "next-intl";
// import { MdOutlineAccountBalance } from "react-icons/md";

const { Title, Text } = Typography;

export const TrustBadge = () => {
  const t = useTranslations("customer_detail");
  return (
    <section className="bg-gray-50 py-10 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto">
        <Title level={3} className="text-center mb-8">
          {t("paymentInfo")}
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Secure Checkout */}
          <Card
            variant="borderless"
            className="flex items-center gap-4 p-4 shadow-md"
          >
            <ShieldCheck className="text-green-600" size={28} />
            <div>
              <Text strong>{t("title1")}</Text>
              <p className="text-gray-500 text-sm">{t("desc1")}</p>
            </div>
          </Card>

          {/* Refund Policy */}
          <Card
            variant="borderless"
            className="flex items-center gap-4 p-4 shadow-md"
          >
            <Undo2 className="text-blue-600" size={28} />
            <div>
              <Text strong>{t("title2")}</Text>
              <p className="text-gray-500 text-sm">{t("desc2")}</p>
            </div>
          </Card>

          {/* Verified Payments */}
          <Card
            variant="borderless"
            className="flex items-center gap-4 p-4 shadow-md"
          >
            <CheckCircle className="text-purple-600" size={28} />
            <div>
              <Text strong>{t("title3")}</Text>
              <p className="text-gray-500 text-sm">{t("desc3")}</p>
            </div>
          </Card>
        </div>

        {/* Payment Logos */}
        <div className="mt-8 text-center">
          <Title level={5} className="mb-4">
            {t("weAccept")}
          </Title>
          <div className="flex justify-center items-center flex-wrap gap-6 text-3xl text-gray-700">
            <Card hoverable>
              <Image
                src="/icons/mtn-momo.png"
                height={50}
                width={50}
                preview={false}
              />
            </Card>
            <Card hoverable>
              <Image
                src="/icons/orange-money.svg"
                height={50}
                width={50}
                preview={false}
              />
            </Card>
            {/* <Card>
              <Image
                src="/icons/visa-logo.png"
                height={50}
                width={100}
                preview={false}
              />
            </Card> */}

            {/* <Card>
              <Image
                src="/icons/paypal-mark-color_new.svg"
                height={50}
                width={50}
                preview={false}
              />
            </Card> */}

            {/* <Card>
              {" "}
              <MdOutlineAccountBalance className="hover:text-amber-950 text-5xl" />
            </Card> */}
          </div>
        </div>
      </div>
    </section>
  );
};
