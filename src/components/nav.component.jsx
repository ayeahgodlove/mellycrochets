"use client";

import { Image } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import AppLanguage from "./shared/language.component";
import ShoppingCart from "./shopping-cart/shopping-cart";
import { useTranslations } from "next-intl";
import { useGetIdentity } from "@refinedev/core";
import { useSocket } from "../providers/socket";
import { CartService } from "../service/cart.service";

export const emptyCartItem = {
  id: "",
  name: "",
  quantity: 0,
  imageUrl: "",
  total: 0,
  price: 0,
  size: "",
};

const AppNavigation = () => {
  const [isOpen, setOpen] = useState(false);
  const { data: user } = useGetIdentity({});
  const [visible, setVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const pathname = usePathname();
  const t = useTranslations("navigation");

  const role = user?.role;

  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    console.log("Attempting to connect to Socket.IO...");

    const handleCartEvent = (data) => {
      console.log("✅ Cart Event Received:", data);
      setCartItems(data);
      setCartCount(data.length);
    };

    socket.on("cart-updated", handleCartEvent);

    return () => {
      socket.off("cart-updated", handleCartEvent); // Cleanup
    };
  }, [socket]);

  useEffect(() => {
    CartService.list()
      .then((res) => {
        setCartItems(res);
        setCartCount(res.length);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <nav className="bg-[#fdf3f3] py-1 px-10 md:px-30 lg:px-50 shadow-md">
      <div className="flex justify-between items-center">
        <div className="aspect-w-16 aspect-h-9 text-2xl font-bold text-gray-900">
          <Link href="/">
            <Image
              src="/logo.png"
              preview={false}
              width={120}
              height={85}
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
            {t("home")}
          </Link>

          <Link
            href="/after_cares"
            className={`nav-link font-playfair  ${
              pathname === "/after_cares" ? "active" : ""
            }`}
          >
            After Care
          </Link>

          <Link
            href="/crochets"
            className={`nav-link font-playfair  ${
              pathname === "/crochets" ? "active" : ""
            }`}
          >
            Crochet Listings
          </Link>

          <Link
            href="/about"
            className={`nav-link font-playfair  ${
              pathname === "/about" ? "active" : ""
            }`}
          >
            {t("about")}
          </Link>

          <Link
            href="/blog_posts"
            className={`nav-link font-playfair  ${
              pathname === "/blog_posts" ? "active" : ""
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
            {t("contact")}
          </Link>

          <AppLanguage />

          <div className="shoppingCart">
            <ShoppingCart cartCount={cartCount} cartItems={cartItems} />
          </div>
          {!user && (
            <Link
              href="/login"
              className={`nav-link font-playfair  ${
                pathname === "/login" ? "active" : ""
              }`}
            >
              Signin
            </Link>
          )}

          {role === "admin" && (
            <Link
              href="/dashboard"
              className={`nav-link font-playfair  ${
                pathname === "/dashboard" ? "active" : ""
              }`}
            >
              Admin
            </Link>
          )}
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
                {t("home")}
              </Link>

              <Link
                href="/after_cares"
                className={`nav-link font-playfair  ${
                  pathname === "/after_cares" ? "active" : ""
                }`}
              >
                After Care
              </Link>

              <Link
                href="/crochets"
                className={`nav-link font-playfair  ${
                  pathname === "/crochets" ? "active" : ""
                }`}
              >
                Crochet Listings
              </Link>

              <Link
                href="/about"
                className={`nav-link font-playfair  ${
                  pathname === "/about" ? "active" : ""
                }`}
              >
                {t("about")}
              </Link>

              <Link
                href="/blog_posts"
                className={`nav-link font-playfair  ${
                  pathname === "/blog_posts" ? "active" : ""
                }`}
              >
                Blog Posts
              </Link>

              <Link
                href="/contact"
                className={`nav-link font-playfair  ${
                  pathname === "/contact" ? "active" : ""
                }`}
              >
                {t("contact")}
              </Link>

              <AppLanguage />

              <div className="shoppingCart" style={{ marginTop: 10, marginLeft:0}}>
                <ShoppingCart cartCount={cartCount} cartItems={cartItems} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AppNavigation;
