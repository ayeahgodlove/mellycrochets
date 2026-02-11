"use client";

import ContactSection from "../../components/contact/contact.component";
import "../../assets/css/globals.css";
import { useTranslations } from "next-intl";
import { Mail, MessageCircle } from "lucide-react";

const ContactPage = () => {
  const t = useTranslations("contact");
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full bg-white py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-6">
            <MessageCircle size={18} className="text-red-800" />
            <span className="text-sm font-semibold text-red-800">Get in Touch</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            {t("heroTitle")}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("heroDescription")}
          </p>
        </div>
      </section>

      <ContactSection />
    </div>
  );
};

export default ContactPage;
