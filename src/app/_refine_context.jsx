"use client";

import { useNotificationProvider } from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

import routerProvider from "@refinedev/nextjs-router";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@refinedev/antd/dist/reset.css";
import { dataProvider } from "../providers/data-provider";
import { menus } from "../utils/menus";

// import { initializeDB } from "../utils/initialize-db";
import { Spin } from "antd";
import { accessControlProvider } from "../providers/access-control-provider";
import ClientProvider from "../contexts/redux/provider";
import { useLocale, useTranslations } from "next-intl";
import { setUserLocale } from "../i18n/index";

export const App = (props) => {
  const { data, status } = useSession();
  const to = usePathname();
  const t = useTranslations();

  if (status === "loading") {
    return (
      <Spin
        size="large"
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  }

  const i18nProvider = {
    translate: (key, options) => t(key, options),
    getLocale: useLocale,
    changeLocale: setUserLocale,
  };

  const authProvider = {
    login: async () => {
      signIn("auth0", {
        callbackUrl: to ? to.toString() : "/",
        redirect: true,
      });

      return {
        success: true,
        redirectTo: "/",
      };
    },
    logout: async () => {
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });

      return {
        success: true,
      };
    },
    onError: async (error) => {
      if (error.response?.status === 401) {
        return {
          logout: true,
        };
      }

      return {
        error,
      };
    },
    check: async () => {
      if (status === "unauthenticated") {
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }

      return {
        authenticated: true,
      };
    },
    getPermissions: async () => {
      if (!data?.user) return null; // Ensure user exists

      // return { role: data?.user?.role ?? "user" }; // Default role is "user"
      return {
        role: data.user.role ?? "user", // Ensure role is always set
        email: data.user.email,
        name: data.user.name,
        image: data.user.image,
      };
    },
    getIdentity: async () => {
      if (data?.user) {
        const { user } = data;
        return {
          name: user.name,
          email: user.email,
          avatar: user.image,
        };
      }

      return null;
    },
  };

  const filteredMenus = menus.filter((menu) =>
    menu.meta?.canAccess?.includes(data?.user?.role)
  );

  return (
    <>
      <RefineKbarProvider>
        <AntdRegistry>
          <ClientProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider}
              accessControlProvider={{
                can: async ({ resource, action }) => {
                  const user = await authProvider.getPermissions();
                  return accessControlProvider.can({
                    resource,
                    action,
                    params: { user },
                  });
                },
                options: {},
              }}
              notificationProvider={useNotificationProvider}
              authProvider={authProvider}
              i18nProvider={i18nProvider}
              resources={filteredMenus}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "njMZZm-fu7OWZ-sdebsw",
                breadcrumb: true,
              }}
            >
              {props.children}
              <RefineKbar />
            </Refine>
          </ClientProvider>
        </AntdRegistry>
      </RefineKbarProvider>
    </>
  );
};
