import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glow?: "cyan" | "violet" | "blue" | "none";
}

const glowMap = {
  cyan: "hover:shadow-neon-cyan",
  violet: "hover:shadow-neon-violet",
  blue: "hover:shadow-neon-blue",
  none: "",
};

export function Card({ children, glow = "cyan", className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "glass-card p-6 transition-all duration-500",
        glowMap[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
