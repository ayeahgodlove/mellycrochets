import { Button, Dropdown, Image } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "@refinedev/core";

const AppLanguage = () => {
  const { changeLocale } = useTranslation();
  const [menu, setMenu] = useState({
    key: "en",
    label: "Eng",
    extra: (
      <Image
        src="./en.png"
        alt="english locale"
        width={12}
        height={12}
        preview={false}
      />
    ),
  });

  const items = [
    {
      label: "Eng",
      key: "en",
      extra: (
        <Image
          src="./en.png"
          alt="english locale"
          width={12}
          height={12}
          preview={false}
        />
      ),
    },
    {
      label: "Fren",
      key: "fr",
      extra: (
        <Image
          src="./fr.png"
          alt="french locale"
          width={10}
          height={10}
          preview={false}
        />
      ),
    },
  ];

  const handleMenuClick = (e) => {
    const selectedLanguage = items.find((item) => item.key === e.key);
    if (selectedLanguage) {
      setMenu(selectedLanguage);
      changeLocale(e.key); // Switch language (if using i18next)
    }
  };

  useEffect(() => {
    changeLocale(menu.key); // Set language on mount
  }, []);
  return (
    <>
      {/* language selector */}
      <Dropdown
        menu={{
          items,
          onClick: handleMenuClick,
        }}
        placement="bottomLeft"
        className="cursor-pointer font-medium"
      >
        <Button size="small" style={{ width: "30px" }}>
          {menu.label}
        </Button>
      </Dropdown>
    </>
  );
};

export default AppLanguage;
