"use client";

import { toast } from "sonner";

export const useNotificationProvider = () => {
  return {
    open: ({ key, message, type, description, cancelMutation, undoableTimeout }) => {
      if (type === "progress") {
        if (undoableTimeout) {
          toast.loading(message, {
            id: key,
            description,
            duration: undoableTimeout * 1000,
          });
        } else {
          toast.loading(message, {
            id: key,
            description,
          });
        }
      } else if (type === "success") {
        toast.success(message, {
          id: key,
          description,
        });
      } else if (type === "error") {
        toast.error(message, {
          id: key,
          description,
        });
      } else {
        toast(message, {
          id: key,
          description,
        });
      }
    },
    close: (key) => {
      toast.dismiss(key);
    },
  };
};
