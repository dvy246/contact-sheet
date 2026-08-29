import React from "react";
import { cn } from "@/lib/utils";

export interface HighlightTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "lime" | "yellow" | "pink" | "cyan" | "orange";
}

const highlightVariants: Record<NonNullable<HighlightTextProps["variant"]>, string> = {
  lime: "bg-accent-green text-zinc-950",
  yellow: "bg-yellow-300 text-zinc-950",
  pink: "bg-pink-300 text-zinc-950",
  cyan: "bg-cyan-300 text-zinc-950",
  orange: "bg-orange-300 text-zinc-950",
};

export function HighlightText({
  children,
  className,
  variant = "lime",
}: HighlightTextProps) {
  return (
    <span className="relative inline-block">
      <span
        className={cn(
          "absolute inset-0 scale-x-110 scale-y-90 -skew-y-1 rounded-xs -z-0 opacity-90",
          highlightVariants[variant],
          className
        )}
        aria-hidden="true"
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}

export default HighlightText;
