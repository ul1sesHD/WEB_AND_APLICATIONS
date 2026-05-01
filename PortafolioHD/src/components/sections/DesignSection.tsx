import sections from "@/lib/data/sections.json";
import { Card, Badge } from "@/components/ui";
import { SectionHeader } from "./AboutSection";

const designAreas = [
  {
    title: "UX & UI Design",
    items: ["Wireframing", "Frames", "User Research", "Prototyping"],
    glow: "cyan" as const,
  },
  {
    title: "Design Systems",
    items: ["Style Guides", "Component Libraries", "Tokens", "Documentation"],
    glow: "violet" as const,
  },
  {
    title: "Production",
    items: ["Content Creation", "Writing", "Edición", "Lanzamiento"],
    glow: "blue" as const,
  },
];

export function DesignSection() {
  return (
    <section id="design" className="section-container">
      <SectionHeader
        title={sections.design.title}
        subtitle={sections.design.subtitle}
      />

      <p className="text-center text-white/60 max-w-2xl mx-auto mt-4">
        {sections.design.description}
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {designAreas.map((area) => (
          <Card key={area.title} glow={area.glow}>
            <h3 className="text-lg font-display font-bold text-neon-cyan mb-4">
              {area.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {area.items.map((item) => (
                <Badge key={item} variant="outline">
                  {item}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
