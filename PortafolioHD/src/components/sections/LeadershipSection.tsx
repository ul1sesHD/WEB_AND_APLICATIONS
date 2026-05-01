import sections from "@/lib/data/sections.json";
import { Card } from "@/components/ui";
import { SectionHeader } from "./AboutSection";

const pillars = [
  {
    title: "Leadership",
    description:
      "Liderazgo de equipos multidisciplinarios, mentoría técnica y dirección de proyectos con visión clara.",
    glow: "violet" as const,
  },
  {
    title: "Global Understanding",
    description:
      "Perspectiva internacional, colaboración cross-cultural y comprensión de retos globales.",
    glow: "cyan" as const,
  },
  {
    title: "Environmental Change",
    description:
      "Iniciativas tecnológicas con impacto ambiental positivo y conciencia ecológica integrada.",
    glow: "blue" as const,
  },
  {
    title: "Impacto Social",
    description:
      "Proyectos que generan valor real para comunidades y promueven la equidad digital.",
    glow: "violet" as const,
  },
];

export function LeadershipSection() {
  return (
    <section id="leadership" className="section-container">
      <SectionHeader
        title={sections.leadership.title}
        subtitle={sections.leadership.subtitle}
      />

      <p className="text-center text-white/60 max-w-2xl mx-auto mt-4">
        {sections.leadership.description}
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mt-12">
        {pillars.map((pillar) => (
          <Card key={pillar.title} glow={pillar.glow}>
            <h3 className="text-xl font-display font-bold text-neon-cyan mb-3">
              {pillar.title}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">{pillar.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
