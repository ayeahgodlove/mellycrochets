"use client";

// Export all shadcn components
export * from "./avatar";
export * from "./badge";
export * from "./breadcrumb";
import { Breadcrumb as ShadcnBreadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator, BreadcrumbLink } from "./breadcrumb";
export * from "./button";
export * from "./card";
export * from "./checkbox";
export * from "./dropdown-menu";
export * from "./form";
export * from "./input";
export * from "./label";
export * from "./popover";
export * from "./select";
export * from "./separator";
export * from "./sidebar";
export * from "./switch";
export * from "./table";
export * from "./tabs";
import { TabsWrapper, TabPane } from "./tabs";

// Tabs compatibility wrapper for Ant Design API
export const Tabs = TabsWrapper;
Tabs.TabPane = TabPane;
export * from "./textarea";

// Compatibility wrappers and additional components
import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, X, Loader2 } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button as ShadcnButton } from "./button";
import { Card as ShadcnCard, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./card";
import { Badge as ShadcnBadge } from "./badge";
import { Avatar as ShadcnAvatar, AvatarImage, AvatarFallback } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./dropdown-menu";
import { Table as ShadcnTable, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./table";
import { Input as ShadcnInput } from "./input";
import { Textarea as ShadcnTextarea } from "./textarea";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

// Button compatibility wrapper
export const Button = React.forwardRef(
  (
    {
      type = "default",
      size = "middle",
      htmlType = "button",
      loading,
      icon,
      iconPosition = "start",
      danger,
      shape,
      href,
      target,
      className,
      children,
      disabled,
      block,
      ...props
    },
    ref
  ) => {
    const variantMap = {
      primary: "default",
      default: "outline",
      link: "link",
      text: "ghost",
      dashed: "outline",
    };

    const sizeMap = {
      small: "sm",
      middle: "default",
      large: "lg",
    };

    const buttonClasses = cn(
      danger && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      type === "primary" && !danger && "bg-red-800 text-white hover:bg-red-900 focus:ring-red-800",
      shape === "circle" && "rounded-full aspect-square",
      block && "w-full",
      className
    );

    const iconNode = loading ? (
      <Loader2 className="h-4 w-4 animate-spin" />
    ) : (
      icon || null
    );

    const content =
      iconPosition === "end" ? (
        <>
          {children}
          {iconNode}
        </>
      ) : (
        <>
          {iconNode}
          {children}
        </>
      );

    if (href) {
      const isExternal = href.startsWith("http") || href.startsWith("mailto:");
      const buttonProps = { ...props };
      delete buttonProps.href;
      delete buttonProps.target;
      
      if (isExternal) {
        return (
          <a className={buttonClasses} href={href} target={target} {...buttonProps}>
            {content}
          </a>
        );
      }
      return (
        <Link href={href} className={buttonClasses} {...buttonProps}>
          {content}
        </Link>
      );
    }

    return (
      <ShadcnButton
        ref={ref}
        type={htmlType}
        variant={danger ? "destructive" : variantMap[type] || "default"}
        size={sizeMap[size] || "default"}
        className={buttonClasses}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </ShadcnButton>
    );
  }
);
Button.displayName = "Button";

// Card compatibility wrapper
export const Card = ({ cover, title, extra, children, className, hoverable, ...props }) => {
  const hasPadding = !className?.includes('p-0') && !className?.includes('p-');
  const noPadding = className?.includes('p-0');
  
  return (
    <ShadcnCard
      className={cn(
        "border-0 shadow-sm",
        hoverable && "transition hover:shadow-md",
        hasPadding && "p-0", // Remove default padding unless explicitly set
        className
      )}
      {...props}
    >
      {cover && <div className="w-full">{cover}</div>}
      {(title || extra) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {extra && <div className="ml-auto">{extra}</div>}
        </CardHeader>
      )}
      {children && (
        <CardContent className={noPadding ? "px-0" : undefined}>
          {children}
        </CardContent>
      )}
    </ShadcnCard>
  );
};

Card.Meta = ({ title, description, className }) => (
  <div className={cn("space-y-1", className)}>
    {title && <CardTitle>{title}</CardTitle>}
    {description && <CardDescription>{description}</CardDescription>}
  </div>
);

// Tag compatibility (using Badge)
export const Tag = ({ color, className, children, ...props }) => {
  const variantMap = {
    red: "destructive",
    blue: "default",
    green: "default",
    orange: "outline",
    default: "outline",
  };
  return (
    <ShadcnBadge variant={variantMap[color] || "outline"} className={className} {...props}>
      {children}
    </ShadcnBadge>
  );
};

// Space component
export const Space = ({
  size = "middle",
  direction = "horizontal",
  align,
  wrap,
  className,
  children,
  ...props
}) => {
  const sizeMap = {
    small: "gap-2",
    middle: "gap-4",
    large: "gap-6",
  };
  return (
    <div
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row",
        wrap && "flex-wrap",
        align && `items-${align}`,
        sizeMap[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Tooltip component
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipRoot = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = TooltipPrimitive.Content;

export const Tooltip = ({ title, children, ...props }) => (
  <TooltipProvider>
    <TooltipRoot>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        className="z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        {...props}
      >
        {title}
      </TooltipContent>
    </TooltipRoot>
  </TooltipProvider>
);

// Form compatibility (using react-hook-form from shadcn)
import { Form as ShadcnForm, FormField, FormItem as ShadcnFormItem, FormLabel, FormControl, FormDescription, FormMessage, useFormField } from "./form";

// Create a compatibility wrapper for Form with Ant Design-like API
const FormContext = createContext(null);
const FormInstanceContext = createContext(null);

const FormWrapper = ({ children, onFinish, initialValues, form, layout, className, id, name, size, ...props }) => {
  // Use form instance values if provided, otherwise use initialValues
  const [formValues, setFormValues] = useState(() => {
    if (form) {
      return form.getFieldsValue() || initialValues || {};
    }
    return initialValues || {};
  });
  const [errors, setErrors] = useState({});
  
  // Connect form instance to internal state
  useEffect(() => {
    if (form && form._setInternalState) {
      form._setInternalState(setFormValues);
      form._setInternalErrors(setErrors);
      // Initialize with form instance values if they exist
      const instanceValues = form.getFieldsValue();
      if (instanceValues && Object.keys(instanceValues).length > 0) {
        setFormValues(instanceValues);
      }
    }
  }, [form]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const formData = new FormData(e.target);
    const values = {};
    for (const [key, value] of formData.entries()) {
      values[key] = value;
    }
    
    // Merge with formValues for non-input fields
    const allValues = { ...formValues, ...values };
    
    // Validate all fields
    const newErrors = {};
    React.Children.forEach(children, (child) => {
      if (child?.props?.name && child?.props?.rules) {
        const fieldName = child.props.name;
        const fieldValue = allValues[fieldName];
        const fieldRules = child.props.rules;
        
        for (const rule of fieldRules) {
          if (rule.required && !fieldValue) {
            newErrors[fieldName] = rule.message || "This field is required";
            break;
          }
          if (rule.type === "email" && fieldValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue)) {
            newErrors[fieldName] = rule.message || "Enter a valid email";
            break;
          }
        }
      }
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0 && onFinish) {
      onFinish(allValues);
    }
  };

  const updateFieldValue = (name, value) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  return (
    <FormContext.Provider value={{ formValues, errors, updateFieldValue, size }}>
      <form 
        id={id || name}
        onSubmit={handleSubmit}
        className={cn("space-y-4", layout === "vertical" && "flex flex-col", className)}
        {...props}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

FormWrapper.Item = ({ label, name, rules, children, className, ...props }) => {
  const context = React.useContext(FormContext);
  const error = context?.errors?.[name];

  const handleChange = (e) => {
    const value = e.target.value;
    context?.updateFieldValue(name, value);
    children.props.onChange?.(e);
  };

  return (
    <div className={cn("space-y-2", className)} {...props}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div>
        {React.cloneElement(children, {
          name,
          id: name,
          value: context?.formValues?.[name] || children.props.value || "",
          onChange: handleChange,
          className: cn(
            children.props.className,
            error && "border-red-500 focus:border-red-500 focus:ring-red-500"
          ),
        })}
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

FormWrapper.useForm = () => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const internalStateRef = useRef(null);
  const internalErrorsRef = useRef(null);
  
  const formInstance = useMemo(() => ({
    setFieldsValue: (values) => {
      setFormValues(prev => {
        const newValues = { ...prev, ...values };
        // Also update internal state if connected
        if (internalStateRef.current) {
          internalStateRef.current(newValues);
        }
        return newValues;
      });
    },
    getFieldsValue: () => formValues,
    resetFields: () => {
      setFormValues({});
      setErrors({});
      if (internalStateRef.current) {
        internalStateRef.current({});
      }
      if (internalErrorsRef.current) {
        internalErrorsRef.current({});
      }
    },
    validateFields: () => Promise.resolve(),
    submit: () => {},
    _setInternalState: (setter) => {
      internalStateRef.current = setter;
    },
    _setInternalErrors: (setter) => {
      internalErrorsRef.current = setter;
    },
  }), [formValues]);
  
  return {
    form: formInstance,
  };
};

export const Form = FormWrapper;

// Input compatibility
export const Input = React.forwardRef(({ prefix, suffix, className, value, size = "middle", ...props }, ref) => {
  // Ensure value is never null - convert to empty string or undefined
  const safeValue = value === null ? "" : (value === undefined ? undefined : value);
  
  const sizeClasses = {
    small: "h-8 text-sm px-2.5",
    middle: "h-10 text-sm px-3",
    large: "h-12 text-base px-4",
  };
  
  return (
    <div className="relative flex items-center w-full">
      {prefix && <span className="absolute left-3 z-10 text-gray-500 text-sm">{prefix}</span>}
      <ShadcnInput
        ref={ref}
        className={cn(
          sizeClasses[size] || sizeClasses.middle,
          prefix && "pl-10",
          suffix && "pr-10",
          "border-gray-200 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        value={safeValue}
        {...props}
      />
      {suffix && <span className="absolute right-3 text-gray-500">{suffix}</span>}
    </div>
  );
});
Input.displayName = "Input";

Input.Password = React.forwardRef((props, ref) => <Input ref={ref} type="password" {...props} />);
Input.Password.displayName = "Input.Password";

Input.TextArea = React.forwardRef(({ className, rows = 3, value, ...props }, ref) => {
  // Ensure value is never null - convert to empty string or undefined
  const safeValue = value === null ? "" : (value === undefined ? undefined : value);
  
  return (
    <ShadcnTextarea 
      ref={ref} 
      rows={rows} 
      className={className} 
      value={safeValue}
      {...props} 
    />
  );
});
Input.TextArea.displayName = "Input.TextArea";

// Typography component
export const Typography = {
  Title: ({ level = 1, className, style, children, ...props }) => {
    const Tag = `h${Math.min(6, Math.max(1, level))}`;
    return (
      <Tag className={cn("font-semibold text-gray-900", className)} style={style} {...props}>
        {children}
      </Tag>
    );
  },
  Text: ({ className, children, strong, ...props }) => (
    <span className={cn("text-gray-700", strong && "font-semibold", className)} {...props}>
      {children}
    </span>
  ),
  Paragraph: ({ className, children, strong, ...props }) => (
    <p className={cn("text-gray-700", strong && "font-semibold", className)} {...props}>
      {children}
    </p>
  ),
  Link: ({ href, className, children, ...props }) => (
    <Link href={href} className={cn("text-red-800 hover:underline", className)} {...props}>
      {children}
    </Link>
  ),
};

// Message/toast compatibility
export const message = {
  success: (content) => toast.success(content),
  error: (content) => toast.error(content),
  info: (content) => toast.info(content),
  warning: (content) => toast.warning(content),
  loading: (content) => toast.loading(content),
  destroy: () => toast.dismiss(),
};

// Result component
export const Result = ({ status, title, subTitle, extra }) => {
  const statusMap = {
    success: "text-green-600",
    error: "text-red-600",
    info: "text-blue-600",
    warning: "text-yellow-600",
  };
  return (
    <div className="rounded-lg bg-white p-8 shadow-sm text-center space-y-4">
      <div className={cn("text-2xl font-semibold", statusMap[status] || "text-gray-800")}>
        {title}
      </div>
      {subTitle ? <div className="text-sm text-gray-600">{subTitle}</div> : null}
      {extra ? <div className="flex flex-wrap justify-center gap-3">{extra}</div> : null}
    </div>
  );
};

// Image component with preview
const ImagePreviewContext = createContext(null);

const PreviewModal = ({ items, activeIndex, onClose, onPrev, onNext }) => {
  if (!items?.length) return null;
  const activeSrc = items[activeIndex] || items[0];

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80" onClick={onClose}>
      <div className="relative max-w-5xl w-full px-6" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="absolute right-6 top-2 rounded-full bg-white/90 p-2 text-gray-900 shadow"
          onClick={onClose}
          aria-label="Close preview"
        >
          <X size={18} />
        </button>
        <button
          type="button"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-900 shadow"
          onClick={onPrev}
          aria-label="Previous image"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-900 shadow"
          onClick={onNext}
          aria-label="Next image"
        >
          <ChevronRight size={20} />
        </button>
        <img
          src={activeSrc}
          alt="Preview"
          className="mx-auto max-h-[80vh] w-auto rounded-lg object-contain"
        />
      </div>
    </div>
  );
};

export const Image = ({ src, alt, className, preview, onClick, ...props }) => {
  const previewCtx = React.useContext(ImagePreviewContext);
  const isPreviewEnabled = preview && previewCtx?.items?.length;

  // Don't render if src is empty or null
  if (!src || src.trim() === "") {
    return null;
  }

  const handleClick = (event) => {
    onClick?.(event);
    if (!isPreviewEnabled) return;
    const index = previewCtx.items.findIndex((item) => item === src);
    previewCtx.openAt(index >= 0 ? index : 0);
  };

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={isPreviewEnabled ? handleClick : onClick}
      {...props}
    />
  );
};

Image.PreviewGroup = ({ items = [], children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openAt = (index) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);
  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % items.length);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") handleClose();
      if (event.key === "ArrowLeft") handlePrev();
      if (event.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, items.length]);

  return (
    <ImagePreviewContext.Provider value={{ items, openAt }}>
      {children}
      {isOpen ? (
        <PreviewModal
          items={items}
          activeIndex={activeIndex}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      ) : null}
    </ImagePreviewContext.Provider>
  );
};

// Table compatibility wrapper
export const Table = ({ dataSource, children, rowKey, pagination, loading, columns: columnsProp, onRow, ...props }) => {
  const columns = columnsProp
    ? columnsProp
    : React.Children.toArray(children)
        .filter(Boolean)
        .map((child) => child.props);
  const rows = dataSource || [];
  const resolvedRowKey =
    typeof rowKey === "function"
      ? rowKey
      : (record, index) => record?.[rowKey] ?? index;

  return (
    <div className="space-y-4" {...props}>
      <div className="w-full overflow-auto rounded-lg bg-card shadow-sm">
        <ShadcnTable>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columns.map((col, colIndex) => (
                <TableHead 
                  key={col.key || col.dataIndex || col.title || `col-${colIndex}`}
                  className="h-12 font-semibold"
                >
                  {col.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow key="loading-row">
                <TableCell className="h-24 px-4 py-8 text-center text-muted-foreground" colSpan={columns.length}>
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading data...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : rows.length ? (
              rows.map((record, index) => {
                const rowProps = onRow ? onRow(record, index) : {};
                return (
                  <TableRow 
                    key={resolvedRowKey(record, index)}
                    className="transition-colors hover:bg-muted/30 even:bg-muted/10 cursor-pointer"
                    {...rowProps}
                  >
                    {columns.map((col, colIndex) => (
                      <TableCell 
                        key={col.key || col.dataIndex || col.title || `cell-${index}-${colIndex}`}
                        className="px-4 py-3"
                      >
                        {col.render
                          ? col.render(record?.[col.dataIndex], record, index)
                          : record?.[col.dataIndex]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow key="empty-row">
                <TableCell className="h-24 px-4 py-8 text-center text-muted-foreground" colSpan={columns.length}>
                  <div className="flex flex-col items-center gap-2">
                    <span>No data available</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </ShadcnTable>
      </div>
      {pagination && pagination !== false && (pagination.current || pagination.total || pagination.onChange) ? (
        <div className="flex items-center justify-end gap-2 text-sm">
          <Button
            size="small"
            type="default"
            onClick={() => pagination.onChange?.((pagination.current || 1) - 1, pagination.pageSize)}
            disabled={(pagination.current || 1) <= 1}
          >
            Previous
          </Button>
          <span className="text-gray-600">
            Page {pagination.current || 1} of{" "}
            {Math.max(1, Math.ceil((pagination.total || 0) / (pagination.pageSize || rows.length || 1)))}
          </span>
          <Button
            size="small"
            type="default"
            onClick={() => pagination.onChange?.((pagination.current || 1) + 1, pagination.pageSize)}
            disabled={
              (pagination.current || 1) >=
              Math.max(1, Math.ceil((pagination.total || 0) / (pagination.pageSize || rows.length || 1)))
            }
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
};

// Row/Col grid system
export const Row = ({ gutter = 0, justify = "start", align = "top", className, style, children }) => {
  const justifyMap = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    "space-between": "space-between",
  };
  const alignMap = {
    top: "flex-start",
    middle: "center",
    bottom: "flex-end",
  };

  const gapX = Array.isArray(gutter) ? gutter[0] : gutter;
  const gapY = Array.isArray(gutter) ? gutter[1] : gutter;

  return (
    <div
      className={cn("flex flex-wrap", className)}
      style={{
        justifyContent: justifyMap[justify] || justify,
        alignItems: alignMap[align] || align,
        marginLeft: gapX ? `-${gapX / 2}px` : undefined,
        marginRight: gapX ? `-${gapX / 2}px` : undefined,
        marginTop: gapY ? `-${gapY / 2}px` : undefined,
        marginBottom: gapY ? `-${gapY / 2}px` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Col = ({ xs, sm, md, lg, xl, span, className, style, children }) => {
  const getWidth = (span) => (span ? `${(span / 24) * 100}%` : undefined);
  const getPadding = (gutter) => (gutter ? `${gutter / 2}px` : undefined);
  
  // Determine responsive width based on breakpoints
  // Priority: xl > lg > md > sm > xs > span > 24
  const [currentWidth, setCurrentWidth] = useState(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width >= 1280 && xl) return getWidth(xl);
      if (width >= 1024 && lg) return getWidth(lg);
      if (width >= 768 && md) return getWidth(md);
      if (width >= 640 && sm) return getWidth(sm);
    }
    return getWidth(xs || span || 24);
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateWidth = () => {
      const width = window.innerWidth;
      if (width >= 1280 && xl) {
        setCurrentWidth(getWidth(xl));
      } else if (width >= 1024 && lg) {
        setCurrentWidth(getWidth(lg));
      } else if (width >= 768 && md) {
        setCurrentWidth(getWidth(md));
      } else if (width >= 640 && sm) {
        setCurrentWidth(getWidth(sm));
      } else {
        setCurrentWidth(getWidth(xs || span || 24));
      }
    };

    window.addEventListener('resize', updateWidth);
    updateWidth(); // Initial call
    
    return () => window.removeEventListener('resize', updateWidth);
  }, [xs, sm, md, lg, xl, span]);
  
  return (
    <div
      className={cn(
        "flex-shrink-0",
        className
      )}
      style={{
        width: currentWidth,
        flexBasis: currentWidth,
        maxWidth: currentWidth,
        minWidth: 0,
        paddingLeft: getPadding(style?.gutter?.[0] || style?.gutter),
        paddingRight: getPadding(style?.gutter?.[0] || style?.gutter),
        paddingTop: getPadding(style?.gutter?.[1] || style?.gutter),
        paddingBottom: getPadding(style?.gutter?.[1] || style?.gutter),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Avatar compatibility
export const Avatar = ({ src, alt, children, className, style, ...props }) => {
  const fallbackText = children || (alt ? alt.charAt(0).toUpperCase() : "?");
  return (
    <ShadcnAvatar className={className} style={style} {...props}>
      {src && <AvatarImage src={src} alt={alt} />}
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </ShadcnAvatar>
  );
};

// Dropdown compatibility wrapper
export const Dropdown = ({ menu, children, placement, trigger, onOpenChange, className }) => {
  const items = menu?.items || [];
  const menuOnClick = menu?.onClick;
  const [open, setOpen] = useState(false);
  
  // Determine trigger mode
  const triggers = Array.isArray(trigger) ? trigger : [trigger || "click"];
  const supportsHover = triggers.includes("hover");
  const supportsClick = triggers.includes("click") || !trigger;
  
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
    onOpenChange?.(newOpen);
  };
  
  const handleItemClick = (item) => {
    if (menuOnClick) {
      // Ant Design style: onClick receives { key, keyPath, domEvent }
      menuOnClick({ key: item.key, keyPath: [item.key], domEvent: new Event('click') });
    } else if (item.onClick) {
      // Direct item onClick
      item.onClick({ key: item.key });
    }
    setOpen(false);
  };
  
  // Use a ref to track hover state and add delay for closing
  const hoverTimeoutRef = useRef(null);
  
  const handleMouseEnter = () => {
    if (supportsHover) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      setOpen(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (supportsHover) {
      // Add a small delay before closing to allow moving to dropdown
      hoverTimeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, 150);
    }
  };
  
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);
  
  return (
    <DropdownMenu 
      open={open} 
      onOpenChange={handleOpenChange}
      modal={false}
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        <DropdownMenuTrigger 
          asChild 
          className={className}
        >
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align={placement === "bottomRight" ? "end" : placement === "bottomLeft" ? "start" : "center"}
          className="min-w-[8rem] bg-white"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
        {items.map((item, index) => (
          <React.Fragment key={item.key || index}>
            {item.type === "divider" ? (
              <DropdownMenuSeparator />
            ) : (
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  handleItemClick(item);
                }}
                disabled={item.disabled}
                className="cursor-pointer"
                onClick={(e) => {
                  // Handle clicks on items that contain links/buttons
                  if (item.label && typeof item.label === 'object' && item.label.props?.onClick) {
                    // Let the nested element handle the click
                    return;
                  }
                  e.stopPropagation();
                  handleItemClick(item);
                }}
              >
                <div className="flex items-center gap-2 w-full">
                  {item.extra && <span className="flex-shrink-0">{item.extra}</span>}
                  <span className="flex-1">{item.label}</span>
                </div>
              </DropdownMenuItem>
            )}
          </React.Fragment>
        ))}
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
};

// Popover compatibility wrapper
import { Popover as ShadcnPopover, PopoverTrigger, PopoverContent } from "./popover";

// Drawer component using vaul
import * as DrawerPrimitive from "vaul";

export const Popover = ({ 
  children, 
  content, 
  title, 
  placement = "bottom", 
  trigger = "click",
  open,
  onOpenChange,
  ...props 
}) => {
  const [internalOpen, setInternalOpen] = useState(open ?? false);
  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : internalOpen;
  
  const handleOpenChange = (newOpen) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };
  
  const alignMap = {
    top: "start",
    bottom: "start",
    left: "start",
    right: "end",
  };
  
  return (
    <ShadcnPopover open={currentOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent 
        align={alignMap[placement] || "start"}
        className="w-auto p-0 bg-white"
        {...props}
      >
        {title && (
          <div className="px-4 py-3 border-b border-gray-200/50">
            <h3 className="font-semibold text-gray-900">{title}</h3>
          </div>
        )}
        <div className="p-4">
          {content}
        </div>
      </PopoverContent>
    </ShadcnPopover>
  );
};

// Skeleton component
export const Skeleton = ({ className, active, paragraph, ...props }) => {
  if (paragraph) {
    const rows = paragraph.rows || 1;
    return (
      <div className={cn("space-y-2", className)} {...props}>
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "animate-pulse rounded-md bg-gray-200",
              active && "animate-pulse",
              i === rows - 1 ? "w-3/4" : "w-full"
            )}
            style={{ height: "16px" }}
          />
        ))}
      </div>
    );
  }
  return (
    <div 
      className={cn(
        "animate-pulse rounded-md bg-gray-200",
        active && "animate-pulse",
        className
      )} 
      {...props} 
    />
  );
};

Skeleton.Avatar = ({ shape = "circle", size = 40, active, className, ...props }) => {
  const sizeValue = typeof size === "number" ? size : 40;
  return (
    <div
      className={cn(
        "animate-pulse bg-gray-200",
        shape === "circle" ? "rounded-full" : "rounded-md",
        active && "animate-pulse",
        className
      )}
      style={{ width: sizeValue, height: sizeValue, ...props.style }}
      {...props}
    />
  );
};

Skeleton.Button = ({ size = "default", shape = "round", active, className, style, ...props }) => {
  const sizeMap = {
    small: "h-8",
    default: "h-10",
    large: "h-12",
  };
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200",
        shape === "round" ? "rounded-full" : "rounded-md",
        sizeMap[size] || sizeMap.default,
        active && "animate-pulse",
        className
      )}
      style={style}
      {...props}
    />
  );
};

Skeleton.Input = ({ size = "default", active, className, style, ...props }) => {
  const sizeMap = {
    small: "h-8",
    default: "h-10",
    large: "h-12",
  };
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200",
        sizeMap[size] || sizeMap.default,
        active && "animate-pulse",
        className
      )}
      style={style}
      {...props}
    />
  );
};

// Empty component
export const Empty = ({ description = "No data", className, ...props }) => (
  <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)} {...props}>
    <div className="text-gray-400 text-sm">{description}</div>
  </div>
);

// Spin/Loading component
export const Spin = ({ size = "large", style, fullscreen, indicator, children, className, ...props }) => {
  const sizeMap = {
    small: "h-4 w-4",
    default: "h-6 w-6",
    large: "h-8 w-8",
  };
  const spinner = indicator || <Loader2 className={cn("animate-spin text-gray-600", sizeMap[size])} />;
  
  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
        {spinner}
      </div>
    );
  }
  
  return (
    <div className={cn("relative", className)} style={style} {...props}>
      {children && <div className={children ? "opacity-50" : ""}>{children}</div>}
      {spinner && (
        <div className="absolute inset-0 flex items-center justify-center">
          {spinner}
        </div>
      )}
    </div>
  );
};

// Additional compatibility components that might be used
export const Divider = ({ className, ...props }) => (
    <div className={cn("bg-muted/50 h-px my-4", className)} {...props} />
);

// Badge component with count support (Ant Design style)
export const Badge = ({ color, children, count, className, style, ...props }) => {
  // If count is provided, render as a badge with count (like Ant Design)
  if (count !== undefined && count !== null) {
    return (
      <div className="relative inline-block">
        {children}
        {count > 0 && (
          <span
            className={cn(
              "absolute -top-2 -right-2 flex items-center justify-center",
              "rounded-full bg-red-800 text-white text-xs font-bold",
              "min-w-[20px] h-5 px-1.5 z-10",
              className
            )}
            style={style}
            {...props}
          >
            {count > 99 ? "99+" : count}
          </span>
        )}
      </div>
    );
  }
  
  // Regular badge without count
  const variantMap = {
    pink: "destructive",
    red: "destructive",
    green: "default",
    blue: "default",
  };
  
  return (
    <ShadcnBadge variant={variantMap[color] || "outline"} className={className} {...props}>
      {children}
    </ShadcnBadge>
  );
};

// Affix component - sticky positioning
export const Affix = ({ offsetTop = 0, className, children, ...props }) => {
  return (
    <div
      className={cn("z-50", className)}
      style={{
        position: "sticky",
        top: `${offsetTop}px`,
        ...props.style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

// FloatButton component - floating action button
export const FloatButton = ({ icon, href, tooltip, className, type = "default", target, ...props }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const buttonClasses = cn(
    "relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2",
    type === "primary" 
      ? "bg-red-800 text-white hover:bg-red-900 focus:ring-red-800" 
      : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 focus:ring-gray-300",
    className
  );

  const buttonContent = (
    <>
      {href ? (
        <a
          href={href}
          target={target}
          className={buttonClasses}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          {...props}
        >
          {icon}
        </a>
      ) : (
        <button
          type="button"
          className={buttonClasses}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          {...props}
        >
          {icon}
        </button>
      )}
      {tooltip && showTooltip && (
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap rounded-md bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
          {tooltip}
          <div className="absolute left-full top-1/2 -translate-y-1/2 -translate-x-0.5 border-4 border-transparent border-l-gray-900" />
        </div>
      )}
    </>
  );

  return (
    <div className="relative">
      {buttonContent}
    </div>
  );
};

FloatButton.Group = ({ children, className, style, ...props }) => {
  return (
    <div
      className={cn("fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-3", className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

// List component
export const List = ({ dataSource = [], renderItem, itemLayout = "horizontal", size, className, style, ...props }) => {
  return (
    <div className={cn("space-y-2", className)} style={style} {...props}>
      {dataSource.map((item, index) => {
        const rendered = renderItem ? renderItem(item, index) : null;
        // Extract rowKey from rendered element if it's a List.Item
        const key = rendered?.props?.rowKey ?? rendered?.key ?? index;
        return (
          <div key={key}>
            {rendered}
          </div>
        );
      })}
    </div>
  );
};

List.Item = ({ children, actions, className, onClick, rowKey, ...props }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-lg bg-white p-4 shadow-sm transition hover:bg-gray-50 hover:shadow-md",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="flex-1">{children}</div>
      {actions && actions.length > 0 && (
        <div className="flex items-center gap-2">{actions}</div>
      )}
    </div>
  );
};

List.Item.Meta = ({ avatar, title, description, className, ...props }) => {
  return (
    <div className={cn("flex items-start gap-3", className)} {...props}>
      {avatar && <div className="shrink-0">{avatar}</div>}
      <div className="flex-1 min-w-0">
        {title && <div className="mb-1">{title}</div>}
        {description && <div className="text-sm text-gray-600">{description}</div>}
      </div>
    </div>
  );
};

// Modal component using shadcn Dialog pattern
const ModalRoot = DialogPrimitive.Root;
const ModalTrigger = DialogPrimitive.Trigger;
const ModalPortal = DialogPrimitive.Portal;
const ModalClose = DialogPrimitive.Close;
const ModalOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
ModalOverlay.displayName = "ModalOverlay";

const ModalContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-200 bg-white p-6 shadow-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-xl",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </ModalPortal>
));
ModalContent.displayName = "ModalContent";

const ModalHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
);
ModalHeader.displayName = "ModalHeader";

const ModalTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
ModalTitle.displayName = "ModalTitle";

const ModalDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-gray-600", className)}
    {...props}
  />
));
ModalDescription.displayName = "ModalDescription";

const ModalFooter = ({ className, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
ModalFooter.displayName = "ModalFooter";

export const Modal = ({ open, onCancel, title, footer, children, width, height, className, ...props }) => {
  return (
    <ModalRoot open={open} onOpenChange={(isOpen) => !isOpen && onCancel?.()}>
      <ModalContent
        className={cn(className)}
        style={{ width, height, maxHeight: "90vh", overflowY: "auto" }}
        {...props}
      >
        {title && (
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
          </ModalHeader>
        )}
        <div className="py-4">{children}</div>
        {footer !== null && (
          <ModalFooter>
            {footer || (
              <Button type="default" onClick={onCancel}>
                Close
              </Button>
            )}
          </ModalFooter>
        )}
      </ModalContent>
    </ModalRoot>
  );
};

// VisuallyHidden component for accessibility
const VisuallyHidden = ({ children, ...props }) => (
  <span className="sr-only" {...props}>
    {children}
  </span>
);

// Drawer component using vaul
import { Root as DrawerRoot, Content as DrawerContent, Overlay as DrawerOverlay, Portal as DrawerPortal } from "vaul";

export const Drawer = ({ 
  open, 
  onClose, 
  title, 
  children, 
  placement = "right",
  styles,
  className,
  ...props 
}) => {
  const drawerWidth = styles?.wrapper?.width || "500px";
  const titleText = typeof title === "string" ? title : (title ? "Drawer" : "Drawer");
  
  return (
    <DrawerRoot open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()} direction={placement}>
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 bg-black/40 z-50" />
        <DrawerContent
          className={cn(
            "fixed z-50 bg-white flex flex-col rounded-t-[10px] h-[96%] mt-24",
            placement === "right" && "right-0 top-0 h-full rounded-tl-[10px] rounded-tr-none",
            placement === "left" && "left-0 top-0 h-full rounded-tr-[10px] rounded-tl-none",
            className
          )}
          style={{ width: drawerWidth, ...styles?.body }}
          {...props}
        >
          {/* Hidden title for accessibility - Radix Dialog requires DialogTitle */}
          <DialogPrimitive.Title className="sr-only">
            {titleText}
          </DialogPrimitive.Title>
          
          {title && (
            <div className="p-4 border-b border-gray-100">
              {typeof title === "string" ? (
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              ) : (
                title
              )}
            </div>
          )}
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
          <div className="h-2 bg-gray-100 rounded-t-[10px] mx-auto w-12 mt-2" />
        </DrawerContent>
      </DrawerPortal>
    </DrawerRoot>
  );
};

// Descriptions component - key-value pairs display
export const Descriptions = ({ title, bordered = false, layout = "vertical", column, size = "default", children, className, ...props }) => {
  const columnCount = column?.lg || column?.md || column?.sm || column?.xs || 2;
  const sizeMap = {
    small: "text-sm",
    default: "text-base",
    large: "text-lg",
  };

  // Use inline styles for dynamic grid columns since Tailwind doesn't support dynamic class names
  const gridStyle = layout === "vertical" 
    ? { gridTemplateColumns: "1fr" }
    : { gridTemplateColumns: `repeat(${Math.min(columnCount, 4)}, minmax(0, 1fr))` };

  return (
    <div className={cn("w-full", className)} {...props}>
      {title && (
        <div className={cn("mb-4 font-semibold text-gray-900", sizeMap[size])}>
          {title}
        </div>
      )}
      <div
        className={cn(
          "grid gap-4",
          bordered && "divide-y divide-muted/30 rounded-lg p-4 bg-card shadow-sm",
          layout === "vertical" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        )}
        style={gridStyle}
      >
        {children}
      </div>
    </div>
  );
};

Descriptions.Item = ({ label, children, className, ...props }) => {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <div className="text-sm font-medium text-gray-500">{label}</div>
      <div className="text-base text-gray-900">{children}</div>
    </div>
  );
};

// Breadcrumb compatibility wrapper for Ant Design API
const BreadcrumbComponent = ({ children, className, style, separator, ...props }) => {
  // Extract children and add separators
  const childrenArray = React.Children.toArray(children);
  const separatorElement = separator || <BreadcrumbSeparator />;
  
  const itemsWithSeparators = [];
  childrenArray.forEach((child, index) => {
    if (React.isValidElement(child)) {
      itemsWithSeparators.push(child);
      if (index < childrenArray.length - 1) {
        itemsWithSeparators.push(React.cloneElement(separatorElement, { key: `separator-${index}` }));
      }
    }
  });

  return (
    <ShadcnBreadcrumb 
      className={cn("flex items-center", className)} 
      style={style}
      {...props}
    >
      <BreadcrumbList>
        {itemsWithSeparators}
      </BreadcrumbList>
    </ShadcnBreadcrumb>
  );
};

// Breadcrumb.Item component
const BreadcrumbItemComponent = ({ children, className, ...props }) => {
  // Check if children is a link (has href) or just text
  const isLink = React.isValidElement(children) && children.props?.href;
  
  if (isLink) {
    return (
      <BreadcrumbItem className={className} {...props}>
        <BreadcrumbLink asChild>
          {children}
        </BreadcrumbLink>
      </BreadcrumbItem>
    );
  }
  
  return (
    <BreadcrumbItem className={className} {...props}>
      {children}
    </BreadcrumbItem>
  );
};

// Attach Item to Breadcrumb before exporting
BreadcrumbComponent.Item = BreadcrumbItemComponent;

// Export the Breadcrumb with Item attached
export const Breadcrumb = BreadcrumbComponent;

// Statistic component - displays a statistic with title and value
export const Statistic = ({ 
  title, 
  value, 
  prefix, 
  suffix, 
  precision, 
  valueStyle, 
  className,
  ...props 
}) => {
  // Format value with precision if provided
  let displayValue = value;
  if (precision !== undefined && typeof value === 'number') {
    displayValue = value.toFixed(precision);
  }

  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {title && (
        <div className="text-sm font-medium text-gray-600">
          {title}
        </div>
      )}
      <div className="flex items-baseline gap-1">
        {prefix && <span className="text-2xl">{prefix}</span>}
        <span 
          className="text-3xl font-bold"
          style={valueStyle}
        >
          {displayValue}
        </span>
        {suffix && (
          <span className="text-lg text-gray-600 ml-1">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

// Rate component - star rating
export const Rate = ({ value, onChange, disabled = false, defaultValue, className, ...props }) => {
  const [internalValue, setInternalValue] = useState(defaultValue ?? value ?? 0);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (starValue) => {
    if (disabled) return;
    if (!isControlled) {
      setInternalValue(starValue);
    }
    onChange?.(starValue);
  };

  const handleMouseEnter = (starValue) => {
    if (disabled || isControlled) return;
    setInternalValue(starValue);
  };

  const handleMouseLeave = () => {
    if (disabled || isControlled) return;
    setInternalValue(value ?? defaultValue ?? 0);
  };

  return (
    <div 
      className={cn("flex items-center gap-1", className)} 
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {stars.map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          className={cn(
            "transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded",
            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:scale-110"
          )}
        >
          <svg
            className={cn(
              "w-5 h-5 transition-colors",
              star <= currentValue
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 fill-gray-300"
            )}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
};
