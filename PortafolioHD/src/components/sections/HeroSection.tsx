import { Button } from "@/components/ui";
import sections from "@/lib/data/sections.json";

export function HeroSection() {
  const { title, subtitle, description } = sections.hero;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
    >
      <div
        aria-hidden
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-neon-violet/20 blur-3xl animate-float"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-neon-cyan/15 blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <span className="inline-block px-4 py-1.5 mb-8 rounded-full border border-neon-cyan/40 bg-deep-blue/40 backdrop-blur text-xs uppercase tracking-widest text-neon-cyan">
          Full Stack · Designer · Innovator
        </span>

        <h1 className="heading-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-6">
          <span className="text-white">Ulises</span>
          <span className="text-neon-gradient text-glow-cyan">HD</span>
        </h1>

        <p className="text-xl sm:text-2xl text-white/80 mb-4 font-medium">
          {subtitle}
        </p>

        <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" onClick={() => (window.location.href = "#projects")}>
            Ver Proyectos
          </Button>
          <Button variant="secondary" size="lg" onClick={() => (window.location.href = "#contact")}>
            Conectemos
          </Button>
        </div>

        <div className="mt-20 flex justify-center">
          <div className="w-px h-16 bg-gradient-to-b from-neon-cyan to-transparent animate-glow" />
        </div>
      </div>
    </section>
  );
}
