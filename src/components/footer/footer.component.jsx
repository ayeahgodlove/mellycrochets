"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { cn } from "@/lib/utils";

const Footer = () => {
  const t = useTranslations("footer");

  const socialLinks = [
    {
      name: "WhatsApp",
      href: "https://wa.me/+237681077051",
      icon: FaWhatsapp,
      color: "#25D366",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/mellycrochets_?igsh=cTkwZTc1eDcyaThw&utm_source=qr",
      icon: FaInstagram,
      color: "#E4405F",
    },
    {
      name: "Twitter",
      href: "https://x.com/mellycrochets?s=21",
      icon: FaTwitter,
      color: "#1DA1F2",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/mellynchindo",
      icon: FaFacebookF,
      color: "#1877F2",
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@mellycrochets_?_t=ZM-8uhxGqcniqN&_r=1",
      icon: FaTiktok,
      color: "#000000",
    },
  ];

  const footerLinks = [
    { href: "/about", label: t("aboutUs") },
    { href: "/contact", label: t("contact") },
    { href: "/shop", label: t("shop") },
    { href: "/privacy-policy", label: t("privacyPolicy") },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Social Media Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
              {t("socialMedia")}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Follow us on social media for updates and inspiration
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center justify-center",
                      "h-10 w-10 rounded-full",
                      "transition-all duration-300",
                      "hover:scale-110 hover:shadow-lg",
                      "focus:outline-none focus:ring-2 focus:ring-offset-2",
                      social.name === "Instagram" 
                        ? "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500"
                        : ""
                    )}
                    style={{
                      backgroundColor: social.name === "Instagram" ? undefined : social.color,
                      color: "white",
                    }}
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
            <div className="h-0.5 w-full bg-red-600 mt-4"></div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-red-800 transition-colors duration-200 inline-block hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
              {t("contact")}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-red-600 mt-0.5 shrink-0" size={18} />
                <span className="text-sm text-gray-600 leading-relaxed">
                  Bamenda, Cameroon
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-green-600 shrink-0" size={18} />
                <Link
                  href="tel:+237681077051"
                  className="text-sm text-gray-600 hover:text-red-800 transition-colors duration-200"
                >
                  +237 681 077 051 / 640 922 135
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-blue-600 shrink-0" size={18} />
                <Link
                  href="mailto:mellycrochets25@gmail.com"
                  className="text-sm text-gray-600 hover:text-red-800 transition-colors duration-200 break-all"
                >
                  mellycrochets25@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} MellyCrochets & Services. All
              Rights Reserved.
            </p>
            <Link
              href="/privacy-policy"
              className="text-sm text-gray-600 hover:text-red-800 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
