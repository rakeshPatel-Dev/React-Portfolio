// src/pages/ProjectDetails.tsx
import { useParams, Link } from "react-router-dom";
import { projectData } from "@/data/projectData";
import type { ProjectType } from "@/data/projectData";
import { caseStudies } from "@/data/caseStudies";
import type { CaseStudy } from "@/data/caseStudies";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { FaReact, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { Github, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"; // or from Radix if directly
import ProjectFolder from "./ProjectFolder";
import { SiNextdotjs } from "react-icons/si";


const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const project: ProjectType | undefined = projectData.find((p) => p.id === id);
  const caseStudy: CaseStudy | undefined = caseStudies.find((c) => c.id === id);

  if (!project || !caseStudy) {
    return (
      <div className="min-h-screen flex-col gap-14 flex items-center justify-center text-center text-neutral-600 dark:text-neutral-300">
        <div>

          <h1>Project not found, working on it...</h1>
          <Button variant="link">
            <Link to="/projects">
              Go Back
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-20 flex-col mb-4">
          <h1 className="text-2xl heading-bold">Explore more projects</h1>
          <ProjectFolder />
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-6 md:p-10 space-y-10 mt-20 dark:text-white">

      {/* Project Header */}
      <header className="flex flex-col gap-6">
        <h1 className="heading-bold text-3xl md:text-4xl font-bold">{project.title}</h1>
        <p className="font-body text-neutral-600 dark:text-neutral-300">{project.description}</p>

        {/* Project Image */}
        <div className="w-full max-h-96 md:max-h-[450px] overflow-hidden mt-6">
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`} // more descriptive
            className="w-full h-full object-cover rounded-xl transition-transform"
          />
        </div>

        {/* Tech Icons */}
        <div className="flex flex-wrap gap-3 mt-3">
          {project.icons.map((iconData, idx) => {
            const IconComponent = iconData.icon;
            return (
              <Tooltip key={idx}>
                <TooltipTrigger asChild>
                  <button
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-primary/10 transition-all min-h-10 min-w-10"
                    aria-label={iconData.tooltip}
                  >
                    <IconComponent style={{ color: iconData.color }} className="w-5 h-5" />
                    <span className="sr-only">{iconData.tooltip}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent>{iconData.tooltip}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Links */}
        <div className="flex gap-4 mt-4 flex-wrap">
          <Button variant="default" className="cursor-pointer">
            <a target="_blank" rel="noopener noreferrer" href={project.liveLink} className="flex items-center gap-2">
              <Globe /> Live Demo
            </a>
          </Button>
          <Button variant="outline" className="cursor-pointer">
            <a target="_blank" rel="noopener noreferrer" href={project.sourceLink} className="flex items-center gap-2">
              <Github /> Source Code
            </a>
          </Button>
        </div>
      </header>

      {/* Case Study Section */}
      <section className="flex flex-col gap-6">
        <h2 className="heading-bold text-2xl font-bold border-b-2 pb-2">
          Case Study
        </h2>

        {["Problem", "Solution"].map((section, i) => (
          <div key={i} className="px-4">
            <h3 className="heading-medium text-xl font-semibold mb-2 py-2">
              {section}
            </h3>
            <p className="font-body text-neutral-700 dark:text-neutral-300">
              {caseStudy[section.toLowerCase() as "problem" | "solution"]}
            </p>
          </div>
        ))}

        {/* Key Features (auto-foldable) */}
        <Accordion type="single" collapsible defaultValue={undefined}>
          <AccordionItem value="features">
            <AccordionTrigger className="heading-medium text-xl font-semibold mb-2 py-2 px-4">
              Key Features
            </AccordionTrigger>
            <AccordionContent className="mt-2 px-4">
              <ul className="flex flex-col gap-2">
                {caseStudy.features.map((f, idx) => (
                  <li
                    key={idx}
                    className="px-2 py-1 flex items-center rounded-full text-sm text-neutral-800 dark:text-neutral-200 hover:bg-primary/10 transition-colors min-h-10"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </AccordionContent>

          </AccordionItem>
        </Accordion>

        {/* Tech Stack */}
        <div className="px-4">
          <h3 className="heading-medium text-xl font-semibold mb-2 py-2">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-3 mt-2">
            {caseStudy.techStack.map((tech, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-2 border rounded-xl text-sm hover:bg-primary/10 min-h-10"
              >
                {tech.toLowerCase().includes("react") && <FaReact className="w-5 h-5 text-[#61dafb]" />}
                {tech.toLowerCase().includes("js") && <SiNextdotjs className="w-5 h-5 text-[#f7df1e]" />}
                {tech.toLowerCase().includes("html") && <FaHtml5 className="w-5 h-5 text-[#E34F26]" />}
                {tech.toLowerCase().includes("css") && <FaCss3Alt className="w-5 h-5 text-[#1572B6]" />}
                {tech.toLowerCase().includes("tailwind") && <RiTailwindCssFill className="w-5 h-5 text-[#38bdf8]" />}
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Result / Impact */}
        <div className="px-4">
          <h3 className="heading-medium text-xl font-semibold mb-2 py-2">
            Result & Impact
          </h3>
          <p className="font-body text-neutral-700 dark:text-neutral-300">{caseStudy.result}</p>
        </div>
      </section>

      {/* Explore More Projects */}
      <section className="flex items-center gap-20 flex-col mb-4">
        <h2 className="text-2xl heading-bold">Explore more projects</h2>
        <ProjectFolder />
      </section>

    </main>

  );
};

export default ProjectDetails;
