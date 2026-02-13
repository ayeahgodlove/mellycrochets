"use client";

import { useEffect, useState } from "react";
import { Modal, Input, Button } from "@/components/ui";
import axios from "axios";
import { BASE_URL } from "../../constants/api-url";
import { useTranslations } from "next-intl";
import { useNotification } from "@refinedev/core";
import { Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmailSubscriptionPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const t = useTranslations("signup");
  const { open: openNotification } = useNotification();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("subscribeModalShownThisSession")) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("subscribeModalShownThisSession", "true");
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setEmail("");
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!email?.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/subscribers`, { email: email.trim() });
      handleClose();
      openNotification({
        type: "success",
        message: response.status === 201
          ? "Email subscribed successfully!"
          : "You're already subscribed!",
        key: "notification-key-open",
        placement: "bottomRight",
      });
    } catch (error) {
      handleClose();
      openNotification({
        type: "error",
        message: "Something went wrong. Please try again.",
        key: "notification-key-open",
        placement: "bottomRight",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      title={t("title")}
      titleVisuallyHidden
      width={420}
      className="overflow-hidden rounded-2xl border-0 p-0 shadow-xl"
    >
      <div className="relative">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 rounded-full p-1.5 text-gray-500 transition-colors hover:bg-white/20 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#82181a] focus:ring-offset-2"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div
          className="px-6 pt-8 pb-6 text-center"
          style={{
            background: "linear-gradient(135deg, #82181a 0%, #a82a2d 50%, #8b1c1e 100%)",
          }}
        >
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
            <Mail className="h-6 w-6 text-white" aria-hidden />
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-white">
            {t("title")}
          </h2>
          <p className="mt-1.5 text-sm text-white/90">
            {t("message")}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-5">
          <label htmlFor="subscribe-email" className="sr-only">
            {t("placeHolder")}
          </label>
          <Input
            id="subscribe-email"
            type="email"
            placeholder={t("placeHolder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className={cn(
              "h-12 rounded-xl border-gray-200 bg-gray-50/80 text-base transition-colors",
              "placeholder:text-gray-400 focus:border-[#82181a] focus:bg-white focus:ring-2 focus:ring-[#82181a]/20"
            )}
            style={{ marginBottom: 12 }}
            autoComplete="email"
            aria-invalid={false}
          />
          <Button
            htmlType="submit"
            size="large"
            type="primary"
            loading={loading}
            disabled={!email?.trim() || loading}
            block
            className="h-12 rounded-xl font-semibold shadow-sm transition-all hover:shadow"
            style={{ backgroundColor: "#82181a" }}
          >
            {loading ? "Subscribing…" : t("btn")}
          </Button>
          <p className="mt-4 text-center text-xs text-gray-500">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </Modal>
  );
}
