"use client";
import React from "react";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import routerProvider from "@refinedev/nextjs-router";
import { dataProvider } from "../providers/data-provider";
import { useMenu } from "../utils/menus";

import { Spin } from "@/components/ui";
import { accessControlProvider } from "../providers/access-control-provider";
import ClientProvider from "../contexts/redux/provider";
import { useLocale, useTranslations } from "next-intl";
import { setUserLocale } from "../i18n/index";
import { notificationProvider } from "../providers/notification-provider";

export const App = (props) => {
  const { data, status } = useSession();
  const to = usePathname();
  const t = useTranslations();
  const { menus } = useMenu();

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
      const res = await signIn("auth0", {
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

      return {
        role: data.user.role ?? "user", // Ensure role is always set
        email: data.user.email,
        name: data.user.name,
        image: data.user.image,
        id: data.user.id,
      };
    },
    getIdentity: async () => {
      if (data?.user) {
        const { user } = data;
        return {
          name: user.name,
          email: user.email,
          avatar: user.image,
          role: data.user.role ?? "user",
          id: data.user.id,
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
            notificationProvider={notificationProvider}
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
            <main className="min-h-screen">{props.children}</main>
            <RefineKbar />
          </Refine>
        </ClientProvider>
      </RefineKbarProvider>
    </>
  );
};
