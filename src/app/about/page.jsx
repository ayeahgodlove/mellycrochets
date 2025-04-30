import ContactSection from "../../components/contact/contact.component";
import Image from "next/image";
import "../../assets/css/globals.css";
import { FiFacebook, FiInstagram, FiX } from "react-icons/fi";
import { RiTiktokFill } from "react-icons/ri";
import { keywords } from "../../constants/constant";
import { getTranslations } from "next-intl/server";

const url = process.env.NEXTAUTH_URL || "https://mellycrochets.shop";

export async function generateMetadata() {
  return {
    title: "About Us | MellyCrochets",
    description:
      "Learn about MellyCrochets - our mission, values, and the story behind our handcrafted crochet fashion.",
    keywords: [
      "about mellycrochets",
      "crochet brand story",
      "sustainable fashion",
      "handmade crochet",
      "eco-friendly clothing",
      ...keywords,
    ].join(", "),
    openGraph: {
      title: "About MellyCrochets | Handcrafted Sustainable Fashion",
      description:
        "Discover the story behind MellyCrochets and our commitment to eco-friendly, handmade crochet fashion.",
      images: [`${url}/mellycrochets/ten.jpg`],
      url: `${url}/about`,
    },
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
      shortcut: "/favicon.ico",
    },
    twitter: {
      card: "summary_large_image",
      title: "About MellyCrochets | Handcrafted Sustainable Fashion",
      description:
        "Discover the story behind MellyCrochets and our commitment to eco-friendly, handmade crochet fashion.",
      images: [`${url}/mellycrochets/ten.jpg`],
    },
  };
}

export default async function About() {
  const t = await getTranslations("about");
  return (
    <>
      <div className="relative w-full bg-gray-100 py-20 px-6 flex flex-col items-center text-center">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-200 opacity-80"></div>

        {/* Fade-in Slide-up Animation */}
        <div className="relative z-10 text-center max-w-3xl p-6 md:p-12 lg:p-16 animate-fade-in-up">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {t("heroTitle")}
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mb-6">
            {t("heroDescription")}
          </p>
        </div>
      </div>
      <section className="bg-[#fcf8f8] text-gray-700">
        <section className="bg-gray-50 py-10 px-6 md:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t("bodyTitle")}
            </h2>
            <p className="text-gray-600 mb-6">{t("bodySubTitle")}</p>
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              <a
                href="https://www.instagram.com/mellycrochets_"
                target="_blank"
                className="flex items-center gap-3 text-pink-600 hover:underline"
              >
                <FiInstagram size={22} /> @mellycrochets_
              </a>
              <a
                href="https://facebook.com/MellycrochetsETS"
                target="_blank"
                className="flex items-center gap-3 text-blue-700 hover:underline"
              >
                <FiFacebook size={22} /> Mellycrochets ETS
              </a>
              <a
                href="https://tiktok.com/@mellycrochets_"
                target="_blank"
                className="flex items-center gap-3 text-black hover:underline"
              >
                <RiTiktokFill size={22} /> @mellycrochets_
              </a>
              <a
                href="https://x.com/mellycrochets"
                target="_blank"
                className="flex items-center gap-3 text-gray-800 hover:underline"
              >
                <FiX size={22} /> @mellycrochets
              </a>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <div className="bg-white py-12 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="flex items-center justify-center md:justify-start text-2xl font-semibold text-red-950 mb-4">
                t{t("mission")}
              </h2>
              <p className="text-center md:text-left text-base leading-relaxed">
                {t("missionDescription")}
              </p>
            </div>
            <Image
              src="/mellycrochets/ten.jpg"
              alt="Mission"
              width={500}
              height={300}
              className="rounded-xl shadow-lg object-cover"
              style={{
                width: "100%", // Make the image width 100% of its parent container
                height: "450px", // Let the height scale proportionally based on width
                objectFit: "cover", // Keep the aspect ratio intact while scaling
                backgroundPosition: "top",
              }}
            />
          </div>
        </div>

        {/* Meet the Maker Section */}
        <div className="py-12 px-6 max-w-5xl mx-auto">
          <h2 className="flex items-center justify-center md:justify-start text-2xl font-semibold text-red-950 mb-4">
            {t("meetMelly")}
          </h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <Image
              src="/mellycrochets/five.jpg"
              alt="Founder"
              width={192}
              height={192}
              className="w-48 h-48 rounded-full object-cover shadow-md"
            />
            <p className="text-center md:text-left text-base leading-relaxed">
              {t("biography")}
            </p>
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="py-12 px-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-red-950 mb-6 text-center">
            {t("whatCustomerSay")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm italic">
                &quot;Absolutely love my handmade crochet tote bag! You can feel
                the quality and care.&quot;
              </p>
              <span className="block mt-2 text-sm font-semibold text-red-700">
                – Sarah M.
              </span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm italic">
                &quot;Perfect baby blanket. Soft, beautiful, and arrived so
                quickly!&quot;
              </p>
              <span className="block mt-2 text-sm font-semibold text-red-700">
                – Emma T.
              </span>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 px-6">
          <h2 className="text-2xl font-semibold text-red-950 mb-4">
            {t("cuzyUp")}
          </h2>
          <p className="text-base mb-6">{t("explore")}</p>
          <a
            href="/shop"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full transition"
          >
            {t("cta")}
          </a>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
