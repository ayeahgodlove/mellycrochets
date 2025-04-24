"use client";

import { SessionProvider } from "next-auth/react";
import { App } from "../../app/_refine_context";
import { FloatButton } from "antd";
import {
  MessageOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { ColorModeContextProvider } from "../color-mode";
// import { SocketProvider } from "../../providers/socket";

export const RefineContext = (props) => {
  const defaultMode = props?.defaultMode;

  return (
    <SessionProvider>
      <ColorModeContextProvider defaultMode={defaultMode}>
          <App {...props} />
          <FloatButton.Group
            shape="circle"
            style={{
              insetInlineEnd: 24,
            }}
            className="float-group-custom"
          >
            <FloatButton
              icon={<WhatsAppOutlined />}
              href="https://wa.me/237681077051"
              target="_blank"
              tooltip="WhatsApp"
              type="primary"
              className="float-btn-custom"
            />
            <FloatButton
              icon={<PhoneOutlined />}
              href="tel:+237681077051"
              target="_blank"
              tooltip="Call Us"
              type="primary"
              className="call-us"
            />
            <FloatButton
              icon={<MessageOutlined />}
              tooltip="Contact Us"
              href="/contact"
              className="contact-us"
            />
          </FloatButton.Group>
      </ColorModeContextProvider>
    </SessionProvider>
  );
};
