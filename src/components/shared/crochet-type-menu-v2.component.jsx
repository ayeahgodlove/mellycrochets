"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dropdown } from "@/components/ui";

const CrochetDropdownV2 = ({ crochetTypes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const isDropdownActive = pathname.startsWith("/crochet_designs/");

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = crochetTypes?.map((type) => ({
    key: type.id,
    label: (
      <Link
        href={`/crochet_designs/${type.slug}`}
        className={cn(
          "block px-3 py-2 text-sm rounded-md transition-colors",
          pathname === `/crochet_designs/${type.slug}`
            ? "text-red-800 bg-red-50"
            : "text-gray-700 hover:text-red-800 hover:bg-red-50"
        )}
        onClick={() => setIsOpen(false)}
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
