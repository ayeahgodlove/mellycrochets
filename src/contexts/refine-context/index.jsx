"use client";

import { SessionProvider } from "next-auth/react";
import { App } from "../../app/_refine_context";
import { FloatButton } from "@/components/ui";
import { MessageCircle, Phone, Send } from "lucide-react";
import { ColorModeContextProvider } from "../color-mode";
import { Toaster } from "sonner";

export const RefineContext = (props) => {
  const defaultMode = props?.defaultMode;

  return (
    <SessionProvider>
      <ColorModeContextProvider defaultMode={defaultMode}>
        <App {...props} />
        <Toaster richColors />
        <FloatButton.Group
          shape="circle"
          style={{
            insetInlineEnd: 24,
          }}
          className="float-group-custom"
        >
          <FloatButton
            icon={<Send size={18} />}
            href="https://wa.me/237681077051"
            target="_blank"
            tooltip="WhatsApp"
            type="primary"
            className="float-btn-custom"
          />
          <FloatButton
            icon={<Phone size={18} />}
            href="tel:+237681077051"
            target="_blank"
            tooltip="Call Us"
            type="primary"
            className="call-us"
          />
          <FloatButton
            icon={<MessageCircle size={18} />}
            tooltip="Contact Us"
            href="/contact"
            className="contact-us"
          />
        </FloatButton.Group>
      </ColorModeContextProvider>
    </SessionProvider>
  );
};
