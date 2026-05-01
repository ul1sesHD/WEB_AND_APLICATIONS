import sections from "@/lib/data/sections.json";
import resume from "@/lib/data/resume.json";
import { Button, Card } from "@/components/ui";
import { SectionHeader } from "./AboutSection";

export function ContactSection() {
  return (
    <section id="contact" className="section-container">
      <SectionHeader
        title={sections.contact.title}
        subtitle={sections.contact.subtitle}
      />

      <Card glow="cyan" className="max-w-2xl mx-auto mt-12 text-center">
        <p className="text-white/70 mb-6">{sections.contact.description}</p>

        <a href={`mailto:${resume.email}`} className="inline-block">
          <Button size="lg">{resume.email}</Button>
        </a>

        <p className="text-xs text-white/40 mt-6 uppercase tracking-widest">
          O encuéntrame en GitHub · LinkedIn
        </p>
      </Card>
    </section>
  );
}
