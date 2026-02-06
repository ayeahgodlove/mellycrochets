"use client";

import { useEffect, useState } from "react";
import { Modal, Input, Button, Image } from "@/components/ui";
import axios from "axios";
import { BASE_URL } from "../../constants/api-url";
import { useTranslations } from "next-intl";
import { useNotification } from "@refinedev/core";

export default function EmailSubscriptionPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const t = useTranslations("signup");
  const { open: openNotification } = useNotification();

  useEffect(() => {
    const shown = localStorage.getItem("emailPopupShown");
    if (!shown) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/subscribers`, { email });
      if (response.status === 201) {
        localStorage.setItem("emailPopupShown", "true");
        setOpen(false);
        openNotification({
          type: "success",
          message: `Email subscribed Successfully!`,
          key: "notification-key-open",
          placement: "bottomRight",
        });
      } else {
        setOpen(false);
        localStorage.setItem("emailPopupShown", "true");
        openNotification({
          type: "success",
          message: `Your Email is already subscribed!`,
          key: "notification-key-open",
          placement: "bottomRight",
        });
      }
    } catch (error) {
      localStorage.setItem("emailPopupShown", "true");
      setOpen(false);
      openNotification({
        type: "error",
        message: `Something went wrong. Please try again.`,
        key: "notification-key-open",
        placement: "bottomRight",
      });
    }
  };

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      title={t("title")}
      width={350}
      height={200}
    >
      <div className="w-full overflow-hidden">
        <Image
          src="/mellycrochets/joy-ru-P72cSc3M0cM-unsplash.jpg"
          alt="Advertisement of crochets"
          className="w-full h-full object-cover"
          style={{
            width: "100%",
            objectFit: "cover",
            backgroundPosition: "center",
          }}
          preview={false}
        />
      </div>

      <p className="mb-3 text-gray-600">{t("message")}</p>
      <Input
        placeholder={t("placeHolder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        size="large"
        style={{
          marginBottom: 10,
        }}
      />
      <Button size="large" type="primary" onClick={handleSubmit} block>
        {t("btn")}
      </Button>
    </Modal>
  );
}
