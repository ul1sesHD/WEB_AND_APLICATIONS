import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "cyan" | "violet" | "blue" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  cyan: "bg-neon-cyan/15 text-neon-cyan border-neon-cyan/30",
  violet: "bg-neon-violet/15 text-neon-violet border-neon-violet/30",
  blue: "bg-neon-blue/15 text-neon-blue border-neon-blue/30",
  outline: "bg-transparent text-white/70 border-white/20",
};

export function Badge({ children, variant = "cyan", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
        "transition-colors duration-200",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
