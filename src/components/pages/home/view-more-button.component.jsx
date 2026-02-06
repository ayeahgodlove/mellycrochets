"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ViewMoreButton({ href, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Button
        type="primary"
        href={href || "/shop"}
        size="default"
        className={cn(
          "group inline-flex items-center gap-2",
          "px-6 py-3",
          "text-sm font-semibold",
          "rounded-full",
          "transition-all duration-300",
          "hover:gap-3 hover:shadow-lg"
        )}
        icon={<ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
        iconPosition="end"
      >
        {text || "View More"}
      </Button>
    </motion.div>
  );
}
