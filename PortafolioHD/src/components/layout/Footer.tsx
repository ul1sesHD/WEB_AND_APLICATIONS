import { Logo } from "./Logo";
import { SOCIAL_LINKS } from "@/lib/constants/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neon-cyan/20 mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <Logo />
          <p className="text-xs text-white/50">
            © {year} UlisesHD. Construido con Next.js + cyberpunk vibes.
          </p>
        </div>

        <ul className="flex items-center gap-5">
          {SOCIAL_LINKS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-white/60 hover:text-neon-cyan transition-colors"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
