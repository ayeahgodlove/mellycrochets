"use client";

import Cookies from "js-cookie";
import { createContext, useEffect, useState, useContext } from "react";

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

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      {children}
    </ColorModeContext.Provider>
  );
};

export function useColorMode() {
  return useContext(ColorModeContext);
}
