import sections from "@/lib/data/sections.json";
import skillsData from "@/lib/data/skills.json";
import { Card, Badge } from "@/components/ui";
import type { SkillGroup, Proficiency } from "@/types";
import { SectionHeader } from "./AboutSection";

const proficiencyVariant: Record<Proficiency, "cyan" | "violet" | "blue" | "outline"> = {
  Expert: "cyan",
  Advanced: "violet",
  Intermediate: "blue",
  Learning: "outline",
};

export function SkillsSection() {
  const groups = skillsData.categories as SkillGroup[];

  return (
    <section id="skills" className="section-container">
      <SectionHeader
        title={sections.skills.title}
        subtitle={sections.skills.subtitle}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {groups.map((group, idx) => (
          <Card
            key={group.name}
            glow={idx % 2 === 0 ? "cyan" : "violet"}
            className="flex flex-col"
          >
            <h3 className="text-lg font-display font-bold text-neon-cyan mb-1">
              {group.name}
            </h3>
            {group.description && (
              <p className="text-xs text-white/50 mb-4">{group.description}</p>
            )}
            <ul className="space-y-2 mt-auto">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="flex items-center justify-between gap-2 text-sm"
                >
                  <span className="text-white/80">{skill.name}</span>
                  <Badge variant={proficiencyVariant[skill.proficiency]}>
                    {skill.proficiency}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}
