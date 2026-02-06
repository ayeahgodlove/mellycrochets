"use client";

import { Button, Dropdown, Image } from '@/components/ui';
import React, { useEffect, useState } from "react";
import { useTranslation } from "@refinedev/core";
import { Globe } from "lucide-react";

const AppLanguage = () => {
  const { changeLocale } = useTranslation();
  const [currentLang, setCurrentLang] = useState("en");

  const items = [
    {
      label: "English",
      key: "en",
      extra: (
        <Image
          src="/en.png"
          alt="english locale"
          width={16}
          height={16}
          preview={false}
          className="rounded-sm"
        />
      ),
    },
    {
      label: "Français",
      key: "fr",
      extra: (
        <Image
          src="/fr.png"
          alt="french locale"
          width={16}
          height={16}
          preview={false}
          className="rounded-sm"
        />
      ),
    },
  ];

  const handleMenuClick = (e) => {
    if (e?.key) {
      setCurrentLang(e.key);
      changeLocale(e.key);
    }
  };

  useEffect(() => {
    // Set initial language
    changeLocale(currentLang);
  }, []);

  const currentItem = items.find(item => item.key === currentLang) || items[0];

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
      }}
      placement="bottomLeft"
    >
      <Button 
        type="text" 
        size="sm" 
        className="h-9 px-2 gap-1.5"
        icon={<Globe size={16} />}
      >
        <span className="hidden sm:inline">{currentItem.label}</span>
        <span className="sm:hidden">{currentItem.key.toUpperCase()}</span>
      </Button>
    </Dropdown>
  );
};

export default AppLanguage;
