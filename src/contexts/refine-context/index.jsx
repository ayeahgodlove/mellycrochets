"use client";

import { SessionProvider } from "next-auth/react";
import { App } from "../../app/_refine_context";
import { FloatButton } from "@/components/ui";
import { Send } from "lucide-react";
import { ColorModeContextProvider } from "../color-mode";
import { Toaster } from "sonner";

export const RefineContext = (props) => {
  const defaultMode = props?.defaultMode;

  return (
    <SessionProvider
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
    >
      <ColorModeContextProvider defaultMode={defaultMode}>
        <App {...props} />
        <Toaster richColors />
        <div className="fixed bottom-6 right-6 z-50">
          <FloatButton
            icon={<Send size={18} />}
            href="https://wa.me/237681077051"
            target="_blank"
            tooltip="WhatsApp"
            type="primary"
            className="float-btn-custom"
          />
        </div>
      </ColorModeContextProvider>
    </SessionProvider>
  );
};
