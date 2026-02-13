"use client";

import { Button } from "@/components/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Menu, X, User } from "lucide-react";
import AppLanguage from "./shared/language.component";
import ShoppingCartComponent from "./shopping-cart/shopping-cart";
import { useTranslations } from "next-intl";
import { useGetIdentity } from "@refinedev/core";
import AppCurrency from "./shared/currency.component";
import { crochetTypeAPI } from "@/store/api/crochet_type_api";
import CrochetDropdownV2 from "./shared/crochet-type-menu-v2.component";
import { useCart } from "../hooks/cart.hook";
import { signOut } from "next-auth/react";
import { format } from "../lib/format";
import { Avatar, Dropdown, Space, Image } from "@/components/ui";
import { cn } from "@/lib/utils";

const AppNavigation = () => {
  const {
    data: crochetTypes,
    isLoading,
    isFetching,
  } = crochetTypeAPI.useFetchAllCrochetTypesQuery(1);
  const { loadCartCrochets } = useCart();

  const [isOpen, setOpen] = useState(false);
  const { data: user } = useGetIdentity({});
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef(null);
  const navRef = useRef(null);
  const avatarRef = useRef(null);

  const pathname = usePathname();
  const t = useTranslations("navigation");

  const role = user?.role;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    {
      key: "profile",
      label: (
        <Link href="/profile" className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 rounded-md transition-colors">
          <User size={16} />
          Profile
        </Link>
      ),
    },
    role === "admin" && {
      key: "dashboard",
      label: (
        <Link href="/dashboard" className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 rounded-md transition-colors">
          Dashboard
        </Link>
      ),
    },
    {
      key: "logout",
      label: (
        <button
          type="button"
          className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 rounded-md transition-colors w-full text-left text-red-600"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Sign Out
        </button>
      ),
    },
  ].filter(Boolean);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !navRef.current.contains(event.target) &&
        !(avatarRef.current && avatarRef.current.contains(event.target))
      ) {
        setOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  const fetchCartItems = async () => {
    const items = await loadCartCrochets();
    setCartItems(items);
    setCartCount(items.length);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/shop", label: t("shop") },
    { href: "/about", label: t("about") },
    { href: "/blog_posts", label: t("article") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <nav
      ref={navRef}
      className={cn(
        "w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-200",
        scrolled && "shadow-md"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="MellyCrochets"
              width={140}
              height={60}
              className="h-16 w-auto object-contain"
              preview={false}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  pathname === link.href
                    ? "text-red-800 bg-red-50"
                    : "text-gray-700 hover:text-red-800 hover:bg-red-50"
                )}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Crochet Types Dropdown */}
            {crochetTypes && crochetTypes.length > 0 && (
              <CrochetDropdownV2 crochetTypes={crochetTypes} />
            )}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <AppLanguage />
            <AppCurrency />
            
            <div className="relative">
              <ShoppingCartComponent 
                cartCount={cartCount} 
                cartItems={cartItems}
                onCartUpdate={fetchCartItems}
              />
            </div>

            {!user ? (
              <Link href="/login">
                <Button type="primary" size="sm">
                  Sign In
                </Button>
              </Link>
            ) : (
              <Dropdown
                menu={{ items }}
                placement="bottomRight"
                trigger={["click"]}
              >
                <div ref={avatarRef} className="cursor-pointer">
                  <Avatar
                    src={user?.avatar}
                    alt={user?.name}
                    className="h-9 w-9 border-2 border-gray-200 hover:border-red-300 transition-colors"
                  >
                    {!user?.avatar && (
                      <span className="text-sm font-semibold text-red-800">
                        {format.initials(user?.name)}
                      </span>
                    )}
                  </Avatar>
                </div>
              </Dropdown>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <AppLanguage />
            <AppCurrency />
            <div className="relative">
              <ShoppingCartComponent 
                cartCount={cartCount} 
                cartItems={cartItems}
                onCartUpdate={fetchCartItems}
              />
            </div>
            {user && (
              <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]}>
                <Avatar
                  src={user?.avatar}
                  alt={user?.name}
                  className="h-8 w-8"
                >
                  {!user?.avatar && format.initials(user?.name)}
                </Avatar>
              </Dropdown>
            )}
            <Button
              type="text"
              onClick={() => setOpen(!isOpen)}
              className="p-2"
              icon={isOpen ? <X size={20} /> : <Menu size={20} />}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="lg:hidden border-t border-gray-100 bg-white"
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                  pathname === link.href
                    ? "text-red-800 bg-red-50"
                    : "text-gray-700 hover:text-red-800 hover:bg-red-50"
                )}
              >
                {link.label}
              </Link>
            ))}
            
            {crochetTypes && crochetTypes.length > 0 && (
              <div className="px-3 py-2">
                <CrochetDropdownV2
                  crochetTypes={crochetTypes}
                  onNavigate={() => setOpen(false)}
                  isMobile
                />
              </div>
            )}

            {!user && (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 mt-4"
              >
                <Button type="primary" block>
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default AppNavigation;
