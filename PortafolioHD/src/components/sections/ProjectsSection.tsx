import sections from "@/lib/data/sections.json";
import projectsData from "@/lib/data/projects.json";
import { Card, Badge, Button } from "@/components/ui";
import type { Project } from "@/types";
import { SectionHeader } from "./AboutSection";

export function ProjectsSection() {
  const projects = projectsData as Project[];

  return (
    <section id="projects" className="section-container">
      <SectionHeader
        title={sections.projects.title}
        subtitle={sections.projects.subtitle}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {projects.map((project) => (
          <Card key={project.id} glow="violet" className="flex flex-col">
            <div className="flex items-start justify-between gap-2 mb-3">
              <h3 className="text-xl font-display font-bold text-white">
                {project.title}
              </h3>
              <Badge variant="cyan">{project.category}</Badge>
            </div>
            <p className="text-sm text-white/70 mb-4 flex-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2 mt-auto">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex-1">
                  <Button size="sm" className="w-full">
                    Ver Live
                  </Button>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex-1">
                  <Button variant="secondary" size="sm" className="w-full">
                    Código
                  </Button>
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
