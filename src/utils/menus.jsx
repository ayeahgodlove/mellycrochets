// icons
import {
  MdOutlineAddShoppingCart,
  MdOutlinePermMedia,
  MdOutlineTag,
  MdPayments,
} from "react-icons/md";
import { FcDataConfiguration } from "react-icons/fc";
import { GiShoppingCart } from "react-icons/gi";
import { GrUserSettings, GrDashboard  } from "react-icons/gr";
import { FaUserShield } from "react-icons/fa";
import { FaUsersViewfinder } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { MdOutlineContactMail } from "react-icons/md";
// import { RiFolderHistoryLine, RiSecurePaymentLine } from "react-icons/ri";

export const useMenu = () => {
  const menus = [
    {
      name: "dashboard",
      list: "/dashboard", // <-- This is needed
      meta: {
        canAccess: ["admin"],
      },
      icon: <GrDashboard />,
    },
    {
      name: "crochets",
      list: "/dashboard/crochets",
      create: "/dashboard/crochets/create",
      edit: "/dashboard/crochets/edit/:id",
      show: "/dashboard/crochets/show/:id",
      meta: {
        // canDelete: true,
        canAccess: ["admin"],
      },
      icon: <MdOutlineAddShoppingCart />,
    },
    {
      name: "posts",
      list: "/dashboard/posts",
      create: "/dashboard/posts/create",
      edit: "/dashboard/posts/edit/:id",
      show: "/dashboard/posts/show/:id",
      meta: {
        // canDelete: true,
        canAccess: ["admin"],
      },
      icon: <MdOutlinePermMedia />,
    },
    {
      name: "orders",
      list: "/dashboard/orders",
      create: "/dashboard/orders/create",
      edit: "/dashboard/orders/edit/:id",
      show: "/dashboard/orders/show/:id",
      meta: {
        // canDelete: true,
        canAccess: ["admin"],
      },
      icon: <GiShoppingCart />,
    },
    // {
    //   name: "verify-payments",
    //   list: "/dashboard/verify-payments", // <-- This is needed
    //   meta: {
    //     canAccess: ["admin"],
    //   },
    //   icon: <RiSecurePaymentLine />,
    // },
    // {
    //   name: "payment-history",
    //   list: "/dashboard/payment-history", // <-- This is needed
    //   meta: {
    //     canAccess: ["admin"],
    //   },
    //   icon: <RiFolderHistoryLine />,
    // },
    // {
    //   name: "payments",
    //   list: "/dashboard/payments",
    //   create: "/dashboard/payments/create",
    //   edit: "/dashboard/payments/edit/:id",
    //   show: "/dashboard/payments/show/:id",
    //   meta: {
    //     // canDelete: true,
    //     canAccess: ["admin"],
    //   },
    //   icon: <MdPayments />,
    // },
    {
      name: "subscribers",
      list: "/dashboard/subscribers",
      create: "/dashboard/subscribers/create",
      edit: "/dashboard/subscribers/edit/:id",
      show: "/dashboard/subscribers/show/:id",
      meta: {
        canAccess: ["admin"],
      },
      icon: <FaUsersViewfinder />,
    },
    {
      name: "contacts",
      list: "/dashboard/contacts",
      create: "/dashboard/contacts/create",
      edit: "/dashboard/contacts/edit/:id",
      show: "/dashboard/contacts/show/:id",
      meta: {
        canAccess: ["admin"],
      },
      icon: <MdOutlineContactMail />,
    },
    {
      name: "configurations",
      meta: {
        canAccess: ["admin"],
      },
      icon: <FcDataConfiguration />,
    },
    {
      name: "media",
      list: "/dashboard/media",
      create: "/dashboard/media/create",
      edit: "/dashboard/media/edit/:id",
      show: "/dashboard/media/show/:id",
      parentName: "configurations",
      meta: {
        // canDelete: true,
        canAccess: ["admin"],
        parent: "configurations",
      },
      icon: <MdOutlinePermMedia />,
    },
    {
      name: "categories",
      list: "/dashboard/categories",
      create: "/dashboard/categories/create",
      edit: "/dashboard/categories/edit/:id",
      show: "/dashboard/categories/show/:id",
      parentName: "configurations",
      meta: {
        // canDelete: true,
        canAccess: ["admin"],
        parent: "configurations",
      },
      icon: <BiCategory />,
    },
    {
      name: "tags",
      list: "/dashboard/tags",
      create: "/dashboard/tags/create",
      edit: "/dashboard/tags/edit/:id",
      show: "/dashboard/tags/show/:id",
      parentName: "configurations",
      meta: {
        // canDelete: true,
        canAccess: ["admin"],
        parent: "configurations",
      },
      icon: <MdOutlineTag />,
    },
    {
      name: "settings",
      meta: {
        // canDelete: true,
        canAccess: ["admin"],
        label: "Settings",
      },
      icon: <FaUserShield />,
    },
    {
      name: "users",
      list: "/dashboard/users",
      show: "/dashboard/users/show/:id",
      parentName: "settings",
      meta: {
        canAccess: ["admin"],
        parent: "settings",
      },
      icon: <GrUserSettings />,
    },
  ];

  return { menus };
};
