"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dropdown } from "@/components/ui";

const CrochetDropdownV2 = ({ crochetTypes, onNavigate, isMobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const isDropdownActive = pathname.startsWith("/crochet_designs/");

  // Defer close to next tick so link navigation starts before menu unmounts (fixes mobile links not going)
  const handleLinkClick = () => {
    setIsOpen(false);
    if (onNavigate) {
      setTimeout(() => onNavigate(), 0);
    }
  };

  // Close dropdown when clicking/tapping outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside, { passive: true });
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  const linkClassName = (slug) =>
    cn(
      "block px-3 py-2 text-sm rounded-md transition-colors",
      pathname === `/crochet_designs/${slug}`
        ? "text-red-800 bg-red-50"
        : "text-gray-700 hover:text-red-800 hover:bg-red-50"
    );

  // Mobile: inline accordion (stays in viewport, no portal); links must run navigation before we close menu
  if (isMobile) {
    return (
      <nav ref={dropdownRef} aria-label="Crochet design categories" className="rounded-md border border-gray-100">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="crochet-designs-list"
          id="crochet-designs-trigger"
          onClick={() => setIsOpen((o) => !o)}
          className={cn(
            "w-full min-h-[44px] px-3 py-2.5 text-base font-medium rounded-md transition-colors flex items-center justify-between touch-manipulation",
            isDropdownActive
              ? "text-red-800 bg-red-50"
              : "text-gray-700 hover:text-red-800 hover:bg-red-50 active:bg-red-50/80"
          )}
        >
          Crochet Designs
          <ChevronDown
            size={16}
            aria-hidden
            className={cn("transition-transform flex-shrink-0", isOpen && "rotate-180")}
          />
        </button>
        {isOpen && (
          <div
            id="crochet-designs-list"
            role="region"
            aria-labelledby="crochet-designs-trigger"
            className="border-t border-gray-100 bg-gray-50/50 max-h-[min(60vh,320px)] overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <ul className="px-2 pb-2 pt-1 list-none m-0">
              {crochetTypes?.map((type) => (
                <li key={type.id} className="flex">
                  <Link
                    href={`/crochet_designs/${type.slug}`}
                    className={cn(
                      "flex-1 block min-h-[44px] px-3 py-2.5 text-sm rounded-md transition-colors touch-manipulation flex items-center",
                      pathname === `/crochet_designs/${type.slug}`
                        ? "text-red-800 bg-red-50 font-medium"
                        : "text-gray-700 hover:text-red-800 hover:bg-red-50 active:bg-red-50/80"
                    )}
                    onClick={() => setTimeout(handleLinkClick, 0)}
                  >
                    {type.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    );
  }

  const menuItems = crochetTypes?.map((type) => ({
    key: type.id,
    label: (
      <Link
        href={`/crochet_designs/${type.slug}`}
        className={linkClassName(type.slug)}
        onClick={handleLinkClick}
      >
        {type.name}
      </Link>
    ),
  }));

  return (
    <div className="relative" ref={dropdownRef}>
      <Dropdown
        menu={{ items: menuItems }}
        placement="bottomLeft"
        trigger={["hover", "click"]}
        onOpenChange={setIsOpen}
      >
        <button
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-1",
            isDropdownActive
              ? "text-red-800 bg-red-50"
              : "text-gray-700 hover:text-red-800 hover:bg-red-50"
          )}
        >
          Crochet Designs
          <ChevronDown
            size={16}
            className={cn(
              "transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>
      </Dropdown>
    </div>
  );
};

export default CrochetDropdownV2;
