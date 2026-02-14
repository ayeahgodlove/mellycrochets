"use client";

import { useState } from "react";
import { Button, Card } from "@/components/ui";
import { useTranslations } from "next-intl";
import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Mail, MessageSquare, MapPin, Phone } from "lucide-react";
import axios from "axios";

const ContactSection = () => {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post("/api/contacts", formData);
      if (response.data.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(response.data.message || "Failed to send message");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-20 px-6 md:px-12 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {t("getInTouch")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("getInTouchDescription")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="p-8 bg-white shadow-lg border-0">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-red-100 rounded-lg">
                    <MapPin size={24} className="text-red-800" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t("location")}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {t("locationDescription")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-red-100 rounded-lg">
                    <Phone size={24} className="text-red-800" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t("phone")}
                    </h3>
                    <p className="text-gray-700 font-semibold">
                      237681077051 / 237640922135
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    href="https://wa.me/237681077051"
                    target="_blank"
                    rel="noopener noreferrer"
                    type="primary"
                    size="large"
                    className="w-full md:w-auto bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <FaWhatsapp size={22} />
                    <span>{t("chatOnWhatsapp")}</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8 bg-white shadow-lg border-0">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare size={24} className="text-red-800" />
                <h3 className="text-2xl font-bold text-gray-900">
                  {t("sendUsMessage")}
                </h3>
              </div>
              <p className="text-gray-600">{t("mssge")}</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {success && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">
                    Message sent successfully! We&apos;ll get back to you soon.
                  </p>
                </div>
              )}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium">{error}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("phoneLabel")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("phonePlaceholder")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your crochet needs (custom orders, sizes, colors, etc.)"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                disabled={loading}
                className="w-full bg-red-800 hover:bg-red-900 text-white font-semibold py-6 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mail size={20} />
                {loading ? "Sending..." : t("sendUsMessage")}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
