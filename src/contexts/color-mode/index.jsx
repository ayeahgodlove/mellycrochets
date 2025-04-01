"use client";

import { App as AntdApp, ConfigProvider, theme } from "antd";
import Cookies from "js-cookie";
import { createContext, useEffect, useState, useContext } from "react";
import { themeConfig } from "../../utils/theme";

export const ColorModeContext = createContext({});

export const ColorModeContextProvider = ({ children, defaultMode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState(defaultMode || "light");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const theme = Cookies.get("theme") || "light";
      setMode(theme);
    }
  }, [isMounted]);

  const setColorMode = () => {
    if (mode === "light") {
      setMode("dark");
      Cookies.set("theme", "dark");
    } else {
      setMode("light");
      Cookies.set("theme", "light");
    }
  };

  const { darkAlgorithm, defaultAlgorithm } = theme;

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ConfigProvider
        // you can change the theme colors here. example: ...RefineThemes.Magenta,
        theme={{
          ...themeConfig,
          algorithm: mode === "light" ? defaultAlgorithm : darkAlgorithm,
        }}
        // popupMatchSelectWidth={false}
        // popupOverflow="viewport"
      >
        <AntdApp>{children}</AntdApp>
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
};

export function useColorMode() {
  return useContext(ColorModeContext);
}
