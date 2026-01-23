"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md transition",
  {
    variants: {
      size: {
        default: "h-9 w-9",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

function Toggle({
  className,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root>) {
  return (
    <TogglePrimitive.Root
      className={cn(toggleVariants(), className)}
      {...props}
    />
  );
}

export default Toggle;
