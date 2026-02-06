import { toast } from "sonner";

const resolveToast = (type, message, description) => {
  const content = description ? `${message} - ${description}` : message;
  switch (type) {
    case "success":
      return toast.success(content);
    case "error":
      return toast.error(content);
    case "warning":
      return toast.warning(content);
    case "info":
    default:
      return toast.message(content);
  }
};

export const notificationProvider = {
  open: ({ message, description, type }) => {
    resolveToast(type, message, description);
  },
  close: () => toast.dismiss(),
  destroy: () => toast.dismiss(),
};
