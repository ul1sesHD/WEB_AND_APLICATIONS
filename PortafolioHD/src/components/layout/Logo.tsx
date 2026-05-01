import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <a
      href="#hero"
      className={cn(
        "group inline-flex items-baseline gap-0.5 font-display font-extrabold tracking-tight",
        className
      )}
      aria-label="UlisesHD - Inicio"
    >
      <span className="text-2xl text-white group-hover:text-neon-cyan transition-colors">
        Ulises
      </span>
      <span className="text-2xl text-neon-gradient text-glow-cyan">
        HD
      </span>
    </a>
  );
}
