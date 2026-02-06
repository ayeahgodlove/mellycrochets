"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, PanelLeftClose, PanelLeftOpen, ChevronRight, Search, User, LogOut, Settings, X } from "lucide-react";
import {
  useDelete,
  useForm as useCoreForm,
  useNavigation,
  useSelect as useCoreSelect,
  useTable as useCoreTable,
} from "@refinedev/core";
import { Avatar, Button, Card, Dropdown, Empty, Form, Input, Space, Typography, Image } from "@/components/ui";
import { useGetIdentity } from "@refinedev/core";
import { useMenu } from "@/utils/menus";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const buildMenuTree = (menus) => {
  const byParent = new Map();
  menus.forEach((item) => {
    const parent = item.parentName || item.meta?.parent || null;
    if (!byParent.has(parent)) byParent.set(parent, []);
    byParent.get(parent).push(item);
  });
  return byParent;
};

export const ThemedLayoutV2 = ({ Header, Title, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState(new Set());
  const pathname = usePathname();
  const { data: user } = useGetIdentity({});
  const { menus } = useMenu();

  // Close sidebar when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  // Memoize allowed menus based on user role - use JSON.stringify for stable comparison
  const allowedMenus = useMemo(() => {
    return menus.filter((menu) => {
      const access = menu.meta?.canAccess;
      if (!access) return true;
      return access.includes(user?.role);
    });
  }, [menus, user?.role]);

  // Memoize menu tree and root menus
  const menuTree = useMemo(() => buildMenuTree(allowedMenus), [allowedMenus]);
  const rootMenus = useMemo(() => {
    const roots = menuTree.get(null);
    return roots ? [...roots] : [];
  }, [menuTree]);

  // Auto-expand menu if active child exists
  useEffect(() => {
    const newExpanded = new Set();
    rootMenus.forEach((item) => {
      const children = menuTree.get(item.name) || [];
      const hasActiveChild = children.some((child) => {
        const childHref = child.list || "#";
        return childHref !== "#" && pathname.startsWith(childHref);
      });
      if (hasActiveChild) {
        newExpanded.add(item.name);
      }
    });
    
    setExpandedMenus((prev) => {
      // Quick check: if sizes differ, definitely update
      if (prev.size !== newExpanded.size) return newExpanded;
      
      // Check if all items in prev are in newExpanded
      for (const item of prev) {
        if (!newExpanded.has(item)) return newExpanded;
      }
      
      // Check if all items in newExpanded are in prev
      for (const item of newExpanded) {
        if (!prev.has(item)) return newExpanded;
      }
      
      // Sets are equal, return prev to prevent re-render
      return prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // Only depend on pathname - menuTree and rootMenus are stable

  const toggleMenu = (menuName) => {
    setExpandedMenus((prev) => {
      const next = new Set(prev);
      if (next.has(menuName)) {
        next.delete(menuName);
      } else {
        next.add(menuName);
      }
      return next;
    });
  };

  const renderMenuItem = (item, level = 0) => {
    const href = item.list || "#";
    const children = menuTree.get(item.name) || [];
    const hasChildren = children.length > 0;
    const isExpanded = expandedMenus.has(item.name);
    const isActive = href !== "#" && pathname.startsWith(href);
    const isChildActive = children.some((child) => {
      const childHref = child.list || "#";
      return childHref !== "#" && pathname.startsWith(childHref);
    });
    const isParentActive = isActive || isChildActive;

    if (hasChildren && !collapsed) {
      return (
        <div key={item.name} className="space-y-0.5">
          <button
            type="button"
            onClick={() => toggleMenu(item.name)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
              "hover:bg-red-50 hover:text-red-800",
              isParentActive && "bg-red-50 text-red-800 font-semibold",
              level > 0 && "ml-4"
            )}
          >
            <span className="flex-shrink-0 text-base">{item.icon}</span>
            <span className="flex-1 truncate text-left capitalize">
              {item.meta?.label || item.name}
            </span>
            <ChevronRight
              className={cn(
                "h-4 w-4 flex-shrink-0 transition-transform duration-200",
                isExpanded && "rotate-90"
              )}
            />
          </button>
          {isExpanded && (
            <div className="ml-4 space-y-0.5 pl-2">
              {children.map((child) => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.name}
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
          "hover:bg-red-50 hover:text-red-800",
          isActive && "bg-red-50 text-red-800 font-semibold",
          level > 0 && "ml-4",
          collapsed && "justify-center px-2"
        )}
        onClick={() => {
          // Close sidebar on mobile when clicking a menu item
          if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            setSidebarOpen(false);
          }
        }}
      >
        <span className="flex-shrink-0 text-base">{item.icon}</span>
        {!collapsed && (
          <span className="truncate capitalize">{item.meta?.label || item.name}</span>
        )}
      </Link>
    );
  };

  const userMenu = [
    {
      key: "profile",
      label: (
        <Link href="/dashboard/profile" className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 rounded-md transition-colors">
          <User size={16} />
          Profile
        </Link>
      ),
    },
    {
      key: "settings",
      label: (
        <Link href="/dashboard/settings" className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 rounded-md transition-colors">
          <Settings size={16} />
          Settings
        </Link>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: (
        <button
          type="button"
          className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 rounded-md transition-colors w-full text-left text-red-600"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:shadow-lg lg:bg-background",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            collapsed && "lg:w-16"
          )}
          aria-label="Sidebar"
        >
          <div className="flex h-full flex-col">
            {/* Sidebar Header */}
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 lg:border-0">
              {!collapsed ? (
                <Link href="/" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                  <Image
                    src="/logo.png"
                    alt="MellyCrochets"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain flex-shrink-0"
                    preview={false}
                  />
                  <span className="font-semibold text-lg">MellyCrochets</span>
                </Link>
              ) : (
                <Link href="/" className="flex items-center justify-center" onClick={() => setSidebarOpen(false)}>
                  <Image
                    src="/logo.png"
                    alt="MellyCrochets"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                    preview={false}
                  />
                </Link>
              )}
              <div className="flex items-center gap-2">
                {/* Mobile Close Button */}
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:hidden"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  <X className="h-5 w-5" />
                </button>
                {/* Desktop Collapse Button */}
                <button
                  type="button"
                  className="hidden items-center justify-center rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:inline-flex"
                  onClick={() => setCollapsed((prev) => !prev)}
                  aria-label="Toggle sidebar"
                >
                  {collapsed ? (
                    <PanelLeftOpen className="h-4 w-4" />
                  ) : (
                    <PanelLeftClose className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
              {rootMenus.map((menu) => renderMenuItem(menu))}
            </nav>

            {/* Sidebar Footer */}
            {!collapsed && (
              <div className="p-4 border-t border-gray-200 lg:border-0">
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-accent/50 transition-colors">
                  <Avatar src={user?.avatar} alt={user?.name} className="h-8 w-8">
                    {!user?.avatar && (
                      <span className="text-xs font-semibold text-red-800">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    )}
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email || ""}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm px-4 lg:px-6">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex flex-1 items-center justify-end gap-4 ml-auto">
              <div className="relative hidden md:block max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="h-9 w-full pl-9 bg-background"
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="text"
                  size="small"
                  className="relative h-9 w-9 text-muted-foreground hover:text-foreground"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                </Button>

                <Dropdown menu={{ items: userMenu }} placement="bottomRight" trigger={["click"]}>
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-accent"
                  >
                    <Avatar src={user?.avatar} alt={user?.name} className="h-8 w-8">
                      {!user?.avatar && (
                        <span className="text-xs font-semibold text-red-800">
                          {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                      )}
                    </Avatar>
                    <span className="hidden text-sm font-medium md:inline-block">
                      {user?.name || "User"}
                    </span>
                  </button>
                </Dropdown>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-muted/30 p-4 lg:p-6">
            <div className="mx-auto max-w-7xl space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export const ThemedTitleV2 = ({ text, wrapperStyles }) => (
  <div style={wrapperStyles} className="font-semibold text-gray-900">
    {text}
  </div>
);

export const ErrorComponent = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <Card className="max-w-md text-center">
      <Typography.Title level={3}>Page not found</Typography.Title>
      <Typography.Text>The page you are looking for does not exist.</Typography.Text>
      <div className="mt-4">
        <Button href="/" type="primary">
          Back to home
        </Button>
      </div>
    </Card>
  </div>
);

export const List = ({ title, headerButtons, children }) => (
  <div className="space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      {title ? <Typography.Title level={4}>{title}</Typography.Title> : null}
      {headerButtons ? <div className="flex flex-wrap gap-2">{headerButtons}</div> : null}
    </div>
    {children}
  </div>
);

const getResourceFromPath = (pathname) => {
  const parts = pathname.split("/").filter(Boolean);
  const dashboardIndex = parts.indexOf("dashboard");
  if (dashboardIndex === -1) return null;
  return parts[dashboardIndex + 1] || null;
};

const FormLayout = ({ title, saveButtonProps, children }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <Typography.Title level={4}>{title}</Typography.Title>
      {saveButtonProps ? (
        <Button type="primary" onClick={saveButtonProps.onClick} loading={saveButtonProps.loading}>
          Save
        </Button>
      ) : null}
    </div>
    <div>{children}</div>
  </div>
);

export const Create = ({ saveButtonProps, children }) => (
  <FormLayout title="Create" saveButtonProps={saveButtonProps}>
    {children}
  </FormLayout>
);

export const Edit = ({ saveButtonProps, children }) => (
  <FormLayout title="Edit" saveButtonProps={saveButtonProps}>
    {children}
  </FormLayout>
);

export const Show = ({ isLoading, children }) => (
  <div className="space-y-4">
    {isLoading ? <Empty description="Loading..." /> : children}
  </div>
);

export const DeleteButton = ({ recordItemId, hideText, size = "middle", resourceName }) => {
  const pathname = usePathname();
  const resolvedResource = resourceName || getResourceFromPath(pathname);
  const { mutate } = useDelete();
  const handleDelete = () => {
    if (!resolvedResource || recordItemId === undefined) return;
    if (window.confirm("Are you sure you want to delete this item?")) {
      mutate({ resource: resolvedResource, id: recordItemId });
    }
  };
  return (
    <Button
      type="default"
      size={size}
      onClick={handleDelete}
      className="bg-red-50 text-red-700 hover:bg-red-100"
    >
      {hideText ? "🗑️" : "Delete"}
    </Button>
  );
};

export const EditButton = ({ recordItemId, hideText, size = "middle", resourceName }) => {
  const pathname = usePathname();
  const resolvedResource = resourceName || getResourceFromPath(pathname);
  const href =
    resolvedResource && recordItemId !== undefined
      ? `/dashboard/${resolvedResource}/edit/${recordItemId}`
      : "#";
  return (
    <Button
      type="default"
      size={size}
      href={href}
      className="bg-gray-100 text-gray-700 hover:bg-gray-200"
    >
      {hideText ? "✏️" : "Edit"}
    </Button>
  );
};

export const ShowButton = ({ recordItemId, hideText, size = "middle" }) => {
  const pathname = usePathname();
  const resolvedResource = getResourceFromPath(pathname);
  const href =
    resolvedResource && recordItemId !== undefined
      ? `/dashboard/${resolvedResource}/show/${recordItemId}`
      : "#";
  return (
    <Button
      type="default"
      size={size}
      href={href}
      className="bg-blue-50 text-blue-700 hover:bg-blue-100"
    >
      {hideText ? "👁️" : "Show"}
    </Button>
  );
};

export const useForm = (props) => {
  const { onFinish, query, formLoading } = useCoreForm(props);
  const { form } = Form.useForm();
  const saveButtonProps = useMemo(
    () => ({
      onClick: () => form?.submit?.(),
      loading: formLoading,
      disabled: formLoading,
    }),
    [form, formLoading]
  );

  useEffect(() => {
    if (query?.data?.data && form?.setFieldsValue) {
      form.setFieldsValue(query.data.data);
    }
  }, [query?.data?.data, form]);

  const formProps = useMemo(
    () => ({
      form,
      onFinish,
      initialValues: query?.data?.data || props?.initialValues,
    }),
    [form, onFinish, query?.data?.data, props?.initialValues]
  );

  return { formProps, saveButtonProps, formLoading, query };
};

export const useTable = (props = {}) => {
  const { initialSorter, ...rest } = props;
  const {
    tableQuery,
    result,
    currentPage,
    pageSize,
    setCurrentPage,
    setPageSize,
  } = useCoreTable({
    ...rest,
    sorters: initialSorter ? { initial: initialSorter } : undefined,
  });

  const tableProps = {
    dataSource: result.data,
    loading: tableQuery.isLoading,
    pagination: {
      current: currentPage,
      pageSize,
      total: result.total ?? 0,
      onChange: (page, size) => {
        setCurrentPage(page);
        if (size) setPageSize(size);
      },
    },
  };

  return { tableProps, tableQuery, result };
};

export const useSelect = useCoreSelect;

export const getValueFromEvent = (event) => {
  if (Array.isArray(event)) {
    return event;
  }
  return event?.fileList || [];
};

export const ImageField = ({ value, title, className }) =>
  value ? <img src={value} alt={title} className={className} /> : null;

export const TextField = ({ value }) => <span>{value ?? "-"}</span>;

export const DateField = ({ value }) => {
  if (!value) return <span>-</span>;
  const date = new Date(value);
  return <span>{Number.isNaN(date.getTime()) ? value : date.toLocaleString()}</span>;
};
