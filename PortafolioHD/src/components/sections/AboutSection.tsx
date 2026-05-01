import sections from "@/lib/data/sections.json";
import resume from "@/lib/data/resume.json";
import { Card, Badge } from "@/components/ui";

export function AboutSection() {
  return (
    <section id="about" className="section-container">
      <SectionHeader
        title={sections.about.title}
        subtitle={sections.about.subtitle}
      />

      <div className="grid md:grid-cols-5 gap-8 mt-12">
        <Card glow="violet" className="md:col-span-3">
          <h3 className="text-2xl font-display font-bold mb-4 text-neon-cyan">
            {resume.name}
          </h3>
          <p className="text-white/70 leading-relaxed mb-4">
            {sections.about.description}
          </p>
          <p className="text-white/70 leading-relaxed">
            Mi misión es crear productos que combinen tecnología profunda con
            propósito humano, siempre buscando excelencia técnica, elegancia
            visual e impacto medible.
          </p>
        </Card>

        <Card glow="cyan" className="md:col-span-2">
          <h4 className="text-sm uppercase tracking-widest text-neon-cyan mb-4">
            Highlights
          </h4>
          <ul className="space-y-3">
            {resume.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                <span className="text-neon-cyan mt-1">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="cyan">{resume.yearsOfExperience}+ años</Badge>
            <Badge variant="violet">{resume.location}</Badge>
          </div>
        </Card>
      </div>
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      {subtitle && (
        <span className="block text-xs uppercase tracking-widest text-neon-cyan mb-3">
          {subtitle}
        </span>
      )}
      <h2 className="heading-display text-4xl sm:text-5xl md:text-6xl">
        <span className="text-neon-gradient">{title}</span>
      </h2>
    </div>
  );
}
