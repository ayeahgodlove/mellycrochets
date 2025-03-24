"use client";

// import { gelocation } from "../lib/geolocation";
import AppHero from "../components/app-hero/app-hero.component";
import SocialIcons from "../components/shared/social-icons.component";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import CrochetList from "../components/crochet/crochet-list.component";
import FilterCrochets from "../components/filter-crochet.component";
import { Button, Space } from "antd";
import CrochetCareTips from "../components/after-care/after-care.component";
import SignupPrompt from "../components/signup/signup.component";
import { useTranslations } from "next-intl";

export default async function IndexPage() {
  const t = useTranslations("social");
  return (
    <>
      <AppHero />
      <div className="container">
        <div className="social">
          <SocialIcons />
        </div>
      </div>

      {/* listings */}
      <div className="w-full px-10 md:pt-10" data-aos="fade-up">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-3/4">
            <h2 className="text-2xl text-gray-950 font-extrabold">
              {t("listing")}
            </h2>
            <p className="text-gray-800">{t("message")}</p>
          </div>
          <div className="lg:w-1/4 text-left lg:text-right mt-3 lg:mt-0">
            <Link
              href="/crochets"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              <Space>
                <span>View more </span>
                <FiArrowRight />
              </Space>
            </Link>
          </div>
        </div>
      </div>

      {/* filter content */}
      <FilterCrochets />
      <div className="w-full px-10 pb-10" data-aos="fade-up">
        {/* listings */}
        <CrochetList />
      </div>

      <section className="bg-white py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="grid grid-cols-2 gap-2">
            <img
              src="/photos/image8.jpg"
              alt="Crochet 1"
              className="rounded-lg border-4 border-pink-200 w-full h-auto object-cover"
              style={{ width: 245, height: 220 }}
            />
            <img
              src="/photos/image7.jpg"
              alt="Crochet 2"
              className="rounded-lg border-2 border-black w-full h-auto object-cover"
              style={{ width: 245, height: 220 }}
            />
            <img
              src="/mellycrochets/dd/product-jpeg-2.png"
              alt="Crochet 3"
              className="rounded-lg border-2 border-black w-full h-auto object-cover"
              style={{ width: 245, height: 220 }}
            />
            <img
              src="/photos/image9.jpg"
              alt="Crochet 4"
              className="rounded-lg border-4 border-pink-200 w-full h-auto object-cover"
              style={{ width: 245, height: 220 }}
            />
          </div>

          <div className="text-center max-w-lg mt-20 md:mt-0">
            <h2
              className="text-2xl font-semibold text-gray-800"
              style={{ marginBottom: 30 }}
            >
              {t("crochetaftercare")}
            </h2>
            <p className="text-gray-700 mb-3">{t("summary")}</p>
            <p className="text-sm text-gray-600" style={{ marginBottom: 30 }}>
              {t("subSummary")}
            </p>

            <Button
              href="#"
              className="bg-red-900 text-white rounded-2xl hover:text-white text-sm font-semibold transition-all duration-300"
              style={{
                borderRadius: 50,
                padding: "20px 15px",
                background: "#82181a",
                color: "#fff",
                fontWeight: 500,
              }}
            >
              {t("btn")} <FiArrowRight />
            </Button>
          </div>
        </div>
      </section>

      <CrochetCareTips />

      <SignupPrompt />
    </>
  );
}
