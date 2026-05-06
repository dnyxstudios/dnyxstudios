"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 cursor-pointer select-none";

  const variants = {
    primary:
      "bg-[#007AFF] text-white hover:bg-[#1E6EF4] active:scale-[0.98]",
    secondary:
      "border border-[#007AFF] text-[#007AFF] hover:bg-[#007AFF] hover:text-white active:scale-[0.98]",
    ghost:
      "text-[#191919] hover:text-[#007AFF] active:scale-[0.98]",
    white:
      "bg-white text-[#007AFF] hover:bg-[#F8F9FA] active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={classes}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
