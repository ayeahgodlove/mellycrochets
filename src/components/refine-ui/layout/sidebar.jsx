"use client";

import { useMenu, useLink } from "@refinedev/core";
import {
  Sidebar as BaseSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { menuItems } = useMenu();
  const Link = useLink();

  return (
    <BaseSidebar>
      <SidebarContent>
        {menuItems.map((item) => (
          <SidebarGroup key={item.key}>
            <SidebarGroupLabel>{item.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.children?.map((child) => (
                  <SidebarMenuItem key={child.key}>
                    <SidebarMenuButton
                      asChild
                      isActive={child.active}
                      className={cn(
                        "w-full justify-start",
                        child.active && "bg-accent"
                      )}
                    >
                      <Link to={child.route || ""}>
                        {child.icon}
                        <span>{child.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </BaseSidebar>
  );
}
