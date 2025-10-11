"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "outline" | "ghost" | "secondary" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const variantClasses: Record<
  NonNullable<ButtonProps["variant"]>,
  string
> = {
  default:
    "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/85 transition-colors",
  outline:
    "border border-primary/50 bg-transparent text-primary shadow-sm hover:bg-primary/15",
  ghost: "hover:bg-secondary/50 hover:text-foreground text-muted-foreground",
  secondary:
    "bg-secondary/70 text-foreground hover:bg-secondary/90 transition-colors",
  link: "text-accent underline-offset-4 hover:underline"
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  default: "h-11 px-5",
  sm: "h-9 rounded-md px-4",
  lg: "h-12 rounded-xl px-8 text-base",
  icon: "h-10 w-10"
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
