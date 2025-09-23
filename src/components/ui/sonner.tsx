"use client";

import * as React from "react";
import { Toaster as Sonner, ToasterProps } from "sonner";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const toasterVariants = cva(
  "toaster group", // base class
  {
    variants: {
      variant: {
        primary:
          "border-l-4 border-primary bg-primary/10 text-primary-foreground",
        secondary:
          "border-l-4 border-secondary bg-secondary/10 text-secondary-foreground",
        orange:
          "border-l-4 border-orange-500 bg-orange-100 text-orange-900 dark:bg-orange-500/20",
        destructive:
          "border-l-4 border-destructive bg-destructive/10 text-destructive dark:bg-destructive/20",
        default: "border-l-4 border-border bg-popover text-popover-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface ExtendedToasterProps
  extends ToasterProps,
    VariantProps<typeof toasterVariants> {}

const Toaster = ({ variant, className, ...props }: ExtendedToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className={cn(toasterVariants({ variant }), className)}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster, toasterVariants };
