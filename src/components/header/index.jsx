"use client";

import { useGetIdentity } from "@refinedev/core";
import { Avatar, Dropdown, Space, Switch, Typography } from "@/components/ui";
import React from "react";
import { useColorMode } from "../../contexts/color-mode";
import Link from "next/link";
import { signOut } from "next-auth/react";

const { Text } = Typography;

export const Header = ({ sticky = true }) => {
  const { data: user } = useGetIdentity({});
  const { mode, setMode } = useColorMode();

  const headerStyles = {
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  const items = [
    {
      key: "username",
      label: user?.name && <Text strong>{user.name}</Text>,
    },
    {
      key: "profile",
      label: <Link href="/dashboard/profile">Profile</Link>,
    },
    {
      key: "logout",
      label: (
        <button
          type="button"
          className="text-left w-full"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </button>
      ),
    },
  ];

  return (
    <header style={headerStyles} title="EMS">
      <Space>
        <Switch
          checked={mode === "dark"}
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
        />
        {(user?.name || user?.avatar) && (
          <Dropdown
            menu={{ items }}
            placement="bottomRight"
            trigger={["click"]}
          >
            <div className="cursor-pointer">
              <Space style={{ marginLeft: "8px" }} size="middle">
                {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
              </Space>
            </div>
          </Dropdown>
        )}
      </Space>
    </header>
  );
};
