import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-gray-400 flex field-sizing-content min-h-16 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-base shadow-sm transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50 md:text-sm",
        "focus-visible:border-red-500 focus-visible:ring-red-500/20 focus-visible:ring-2 focus-visible:ring-offset-0",
        "hover:border-gray-300",
        "aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
