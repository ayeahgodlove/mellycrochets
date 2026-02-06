import { Button } from "@/components/ui";
import { getTranslations } from "next-intl/server";
import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const ContactSection = async () => {
  const t = await getTranslations("contact");
  return (
    <section className="bg-[#f9f9f9] py-16 px-6 md:px-16">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h2 className="text-3xl font-bold text-[#28041b]">
            {t("getInTouch")}
          </h2>
          <p className="text-gray-700">{t("getInTouchDescription")}</p>
          <div>
            <p className="text-lg font-semibold text-red-950">
              {t("location")}:
            </p>
            <div className="flex items-center justify-center md:justify-start">
              <FaMapMarkerAlt className="text-xl text-gray-700 mr-2 mb-3" />
              <p className="text-gray-700">{t("locationDescription")}</p>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold text-red-950">{t("phone")}:</p>
            <div className="flex items-center justify-center md:justify-start">
              <FaPhoneAlt className="text-xl text-gray-700 mr-2 mb-3" />
              <p className="text-gray-700 font-semibold">
                237681077051 / 237640922135
              </p>
            </div>
          </div>
          <Button
            href="https://wa.me/237681077051"
            target="_blank"
            type="primary"
            size="large"
            style={{
              borderRadius: 30,
            }}
          >
            <span>{t("chatOnWhatsapp")}</span>
            <FaWhatsapp size={22} style={{ marginLeft: 5 }} />
          </Button>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8">
          <h3 className="text-2xl font-bold text-[#28041b] mb-4 text-center">
            {t("sendUsMessage")}
          </h3>
          <p className="text-gray-700 text-center mb-4">{t("mssge")}</p>
          <form className="space-y-10">
            <div className="mb-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fdf3f3]"
              />
            </div>

            <div className="mb-5">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fdf3f3]"
              />
            </div>

            <div className="mb-5">
              <textarea
                placeholder="Tell us about your crochet needs (custom orders, sizes, colors, etc.)"
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#fdf3f3]"
              ></textarea>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="rounded-md"
            >
              {t("sendUsMessage")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
