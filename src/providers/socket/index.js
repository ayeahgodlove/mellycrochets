"use client";
import { BASE_URL } from "../../constants/api-url";
import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketItem = io(`${BASE_URL}`, { path: "/api/cart_items" })
    setSocket(socketItem);

    return () => {
      socketItem.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
