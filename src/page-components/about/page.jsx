"use client";

import { useState, useEffect, useRef } from "react";
import ContactSection from "../../components/contact/contact.component";
import Image from "next/image";
import "../../assets/css/globals.css";
import { FiFacebook, FiInstagram, FiX } from "react-icons/fi";
import { RiTiktokFill } from "react-icons/ri";
import { Button } from "@/components/ui";
import { Heart, Users, Quote, ShoppingBag, Target, User, Sparkles, Award, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import axios from "axios";

const AboutPage = () => {
  const t = useTranslations("about");
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("/api/reviews");
        // Filter reviews that are toggled (approved) and have comments
        const approvedReviews = response.data
          .filter((review) => review.toggle && review.comment)
          .slice(0, 10); // Limit to 10 reviews
        setReviews(approvedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 0 && isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 5000); // Auto-slide every 5 seconds

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [reviews.length, isAutoPlaying]);

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    goToSlide((currentIndex - 1 + reviews.length) % reviews.length);
  };

  // If no reviews, show placeholder testimonials
  const displayReviews = reviews.length > 0 ? reviews : [
    {
      id: "1",
      comment: "Absolutely love my handmade crochet tote bag! You can feel the quality and care.",
      username: "Sarah M.",
      user: null,
    },
    {
      id: "2",
      comment: "Perfect baby blanket. Soft, beautiful, and arrived so quickly!",
      username: "Emma T.",
      user: null,
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full bg-white py-16 md:py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-6">
            <Sparkles size={18} className="text-red-800" />
            <span className="text-sm font-semibold text-red-800">Handcrafted with Love</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            {t("heroTitle")}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {t("heroDescription")}
          </p>
        </div>
      </section>
      {/* Social Media Section */}
      <section className="py-12 md:py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("bodyTitle")}
            </h2>
            <p className="text-lg text-gray-600">{t("bodySubTitle")}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.instagram.com/mellycrochets_"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-4 bg-white rounded-lg border border-gray-200 hover:border-pink-300 hover:shadow-md transition-all"
            >
              <div className="p-2 bg-pink-50 rounded-lg group-hover:bg-pink-100 transition-colors">
                <FiInstagram size={20} className="text-pink-600" />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-pink-600">@mellycrochets_</span>
            </a>
            <a
              href="https://facebook.com/MellycrochetsETS"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <FiFacebook size={20} className="text-blue-700" />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-blue-700">Mellycrochets ETS</span>
            </a>
            <a
              href="https://tiktok.com/@mellycrochets_"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-4 bg-white rounded-lg border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all"
            >
              <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                <RiTiktokFill size={20} className="text-black" />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-gray-900">@mellycrochets_</span>
            </a>
            <a
              href="https://x.com/mellycrochets"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-4 bg-white rounded-lg border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all"
            >
              <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                <FiX size={20} className="text-gray-800" />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-gray-900">@mellycrochets</span>
            </a>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Target size={28} className="text-red-800" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {t("mission")}
                </h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t("missionDescription")}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
                  <Leaf size={18} className="text-green-700" />
                  <span className="text-sm font-medium text-green-800">Eco-Friendly</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                  <Award size={18} className="text-blue-700" />
                  <span className="text-sm font-medium text-blue-800">Quality Crafted</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl transform rotate-3"></div>
              <Image
                src="/mellycrochets/ten.jpg"
                alt="Mission"
                width={600}
                height={500}
                className="relative w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-4">
              <User size={18} className="text-red-800" />
              <span className="text-sm font-semibold text-red-800">The Founder</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t("meetMelly")}
            </h2>
          </div>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-red-100 rounded-full blur-xl opacity-50"></div>
                  <Image
                    src="/mellycrochets/five.jpg"
                    alt="Founder"
                    width={280}
                    height={280}
                    className="relative w-56 h-56 md:w-72 md:h-72 rounded-full object-cover border-4 border-white shadow-2xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-red-800 text-white p-4 rounded-full shadow-xl">
                    <Heart size={28} className="fill-white" />
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t("biography")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t("whatCustomerSay")}
            </h2>
            <p className="text-lg text-gray-600">Hear from our happy customers</p>
          </div>
          
          {displayReviews.length > 0 && (
            <div className="relative">
              {/* Slider Container */}
              <div className="overflow-hidden rounded-xl">
                <div
                  ref={sliderRef}
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {displayReviews.map((review, index) => {
                    const username = review.user?.username || review.username || "Customer";
                    const initials = getInitials(username);
                    return (
                      <div
                        key={review.id || index}
                        className="min-w-full px-2"
                      >
                        <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-red-600 hover:shadow-lg transition-all">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                              <Quote size={20} className="text-red-800" />
                            </div>
                            <p className="text-gray-700 text-lg leading-relaxed italic flex-1">
                              &quot;{review.comment}&quot;
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
                              <span className="text-red-800 font-bold text-sm">
                                {initials}
                              </span>
                            </div>
                            <span className="font-semibold text-gray-900">{username}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Buttons */}
              {displayReviews.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-red-50 transition-all z-10"
                    aria-label="Previous review"
                  >
                    <ChevronLeft size={24} className="text-gray-700" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-red-50 transition-all z-10"
                    aria-label="Next review"
                  >
                    <ChevronRight size={24} className="text-gray-700" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {displayReviews.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {displayReviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? "w-8 bg-red-600"
                          : "w-2 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to review ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-6 md:px-12 bg-gradient-to-br from-red-50 via-white to-red-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 border border-red-200 rounded-full mb-6">
            <ShoppingBag size={18} className="text-red-800" />
            <span className="text-sm font-semibold text-red-800">Ready to Shop?</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("cuzyUp")}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t("explore")}
          </p>
          <Button
            href="/shop"
            type="primary"
            size="large"
            className="inline-flex items-center gap-2 bg-red-800 hover:bg-red-900 text-white font-bold py-6 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
          >
            <ShoppingBag size={22} />
            {t("cta")}
          </Button>
        </div>
      </section>
      <ContactSection />
      </div>
    </>
  );
};

export default AboutPage;
