"use client";
import { useTranslation } from "@refinedev/core";
import { Image } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import AppLanguage from "./shared/language.component";
import ShoppingCart from "./shopping-cart/shopping-cart";

const AppNavigation = () => {
  const [isOpen, setOpen] = useState(false);

  const pathname = usePathname();
  // const t = useTranslations('HomePage');
  const { translate: t } = useTranslation();

  return (
    <nav className="bg-[#fdf3f3] py-1 px-10 md:px-30 lg:px-50 shadow-md">
      <div className="flex justify-between items-center">
        <div className="aspect-w-16 aspect-h-9 text-2xl font-bold text-gray-900">
          <Link href="/">
            <Image
              src="/logo.png"
              preview={false}
              width={130}
              height={75}
              alt="logo"
              className="w-full h-auto object-cover"
            />
          </Link>
        </div>

        {/* desktop menus */}
        <div className="hidden md:flex space-x-8">
          <Link
            href="/"
            className={`nav-link font-playfair  ${
              pathname === "/" ? "active" : ""
            }`}
          >
            {t("components.navigation.home")}
          </Link>

          <Link
            href="/aftercare"
            className={`nav-link font-playfair  ${
              pathname === "/aftercare" ? "active" : ""
            }`}
          >
            After Care
          </Link>

          <Link
            href="/about"
            className={`nav-link font-playfair  ${
              pathname === "/about" ? "active" : ""
            }`}
          >
            {t("components.navigation.about")}
          </Link>

          <Link
            href="/article"
            className={`nav-link font-playfair  ${
              pathname === "/aftercare" ? "active" : ""
            }`}
          >
            Article
          </Link>

          <Link
            href="/contact"
            className={`nav-link font-playfair  ${
              pathname === "/contact" ? "active" : ""
            }`}
          >
            {t("components.navigation.contact")}
          </Link>

          <AppLanguage />

          <div className="shoppingCart">
            <ShoppingCart cartCount={10} />
          </div>
        </div>

        {/* mobile menu */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!isOpen)}
            className="py-1 px-1 bg-gray-100 rounded-lg cursor-pointer"
          >
            <BiMenu size={35} />
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-md py-5 px-10 md:px-30 lg:px-50 z-10">
            <div className="flex flex-col space-y-6">
              <Link
                href="/"
                className={`nav-link font-playfair  ${
                  pathname === "/" ? "active" : ""
                }`}
              >
                {t("components.navigation.home")}
              </Link>

              <Link
                href="/aftercare"
                className={`nav-link font-playfair  ${
                  pathname === "/aftercare" ? "active" : ""
                }`}
              >
                After Care
              </Link>

              <Link
                href="/about"
                className={`nav-link font-playfair  ${
                  pathname === "/about" ? "active" : ""
                }`}
              >
                {t("components.navigation.about")}
              </Link>

              <Link
                href="/article"
                className={`nav-link font-playfair  ${
                  pathname === "/aftercare" ? "active" : ""
                }`}
              >
                Article
              </Link>

              <Link
                href="/contact"
                className={`nav-link font-playfair  ${
                  pathname === "/contact" ? "active" : ""
                }`}
              >
                {t("components.navigation.contact")}
              </Link>

              <AppLanguage />

              <div className="shoppingCart">
                <ShoppingCart cartCount={10} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AppNavigation;
