import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// Ant Design compatibility wrapper
const TabsWrapper = ({ defaultActiveKey, activeKey, onChange, children, className, ...props }) => {
  const [internalActiveKey, setInternalActiveKey] = React.useState(defaultActiveKey || activeKey);
  const isControlled = activeKey !== undefined;
  const currentKey = isControlled ? activeKey : internalActiveKey;

  const handleValueChange = (value) => {
    if (!isControlled) {
      setInternalActiveKey(value);
    }
    onChange?.(value);
  };

  // Extract TabPane children - handle both direct TabPane and wrapped children
  const extractTabPanes = (children) => {
    const panes = [];
    
    // Handle null, undefined, or non-iterable children
    if (!children) {
      return panes;
    }
    
    // Convert children to array if it's not already
    let childrenArray;
    try {
      childrenArray = React.Children.toArray(children);
    } catch (e) {
      console.error("Error converting children to array:", e);
      return panes;
    }
    
    if (!Array.isArray(childrenArray)) {
      return panes;
    }
    
    childrenArray.forEach((child) => {
      if (React.isValidElement(child)) {
        // Check if it's a TabPane by type, displayName, or data attribute
        const isTabPane = child.type === TabPane || 
                         child.type?.displayName === "TabPane" ||
                         (typeof child.type === 'function' && child.type.name === 'TabPane') ||
                         child.props?.['data-tab-pane'] === true;
        
        if (isTabPane) {
          panes.push({
            key: String(child.key || child.props.key || child.props.tabKey || panes.length),
            tab: child.props.tab,
            children: child.props.children,
          });
        } else if (child.props?.children) {
          // Recursively check nested children
          try {
            const nestedPanes = extractTabPanes(child.props.children);
            if (Array.isArray(nestedPanes) && nestedPanes.length > 0) {
              panes.push(...nestedPanes);
            }
          } catch (e) {
            console.error("Error extracting nested tab panes:", e);
            // Continue with other children
          }
        }
      }
    });
    return panes;
  };

  const tabs = extractTabPanes(children) || [];

  // Ensure tabs is always an array
  const safeTabs = Array.isArray(tabs) ? tabs : [];

  if (safeTabs.length === 0) {
    // If no tabs found, render children directly
    return <div className={className}>{children}</div>;
  }

  return (
    <Tabs value={currentKey} onValueChange={handleValueChange} className={className} {...props}>
      <TabsList>
        {safeTabs.map((tab) => (
          <TabsTrigger key={tab.key} value={tab.key}>
            {tab.tab}
          </TabsTrigger>
        ))}
      </TabsList>
      {safeTabs.map((tab) => (
        <TabsContent key={tab.key} value={tab.key}>
          {tab.children}
        </TabsContent>
      ))}
    </Tabs>
  );
};

// TabPane component for Ant Design compatibility
// This is a marker component that will be extracted by TabsWrapper
const TabPane = ({ tab, children, key, ...props }) => {
  // Return a wrapper element with a data attribute so it can be identified
  // The actual rendering is handled by TabsWrapper
  return React.createElement('div', { 
    'data-tab-pane': true, 
    key,
    style: { display: 'none' },
    ...props
  }, children);
};
TabPane.displayName = "TabPane";

TabsWrapper.TabPane = TabPane;

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsWrapper, TabPane };
