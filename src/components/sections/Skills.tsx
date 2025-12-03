import React from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaGithub,
  FaFigma,
} from "react-icons/fa";
import { SiTailwindcss, SiFirebase, SiNextdotjs } from "react-icons/si";

// shadcn/ui
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

const Skills = () => {
  const skills = [
    { icon: <FaHtml5 />, title: "HTML 5", desc: "Site Structure", color: "#E34F26" },
    { icon: <FaCss3Alt />, title: "CSS 3", desc: "Styling Layouts", color: "#1572B6" },
    { icon: <FaJs />, title: "JavaScript", desc: "Interactivity", color: "#F7DF1E" },
    { icon: <SiTailwindcss />, title: "Tailwind CSS", desc: "Fast UI Styling", color: "#38BDF8" },
    { icon: <FaReact />, title: "React", desc: "Component UI", color: "#61DAFB" },
    { icon: <SiNextdotjs />, title: "Next.js", desc: "Fullstack Framework", color: "#000000" },
    { icon: <SiFirebase />, title: "Firebase", desc: "Auth & Database", color: "#F5820D" },
    { icon: <FaGitAlt />, title: "Git", desc: "Version Control", color: "#F05032" },
    { icon: <FaGithub />, title: "GitHub", desc: "Collaboration", color: "#000000" },
    { icon: <FaFigma />, title: "Figma", desc: "UI/UX Design", color: "#F24E1E" },
  ];

  return (
    <TooltipProvider delayDuration={80}>
      <section id="skills" className="flex flex-col gap-4 mt-8 mb-16">

        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Skills
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {skills.map((skill, idx) => (
            <Tooltip key={idx}>
              <TooltipTrigger asChild>
                <div
                  className="
                    group relative flex flex-col items-center justify-center 
                    gap-3 p-4 rounded-2xl border border-neutral-300/40 dark:border-neutral-700
                    bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl
                    transition-all duration-300 cursor-pointer

                    transform skew-x-2 group-hover:skew-x-0
                    hover:-translate-y-1 hover:shadow-xl
                  "
                  style={{
                    boxShadow: `0 0 0px ${skill.color}15`,
                  }}
                >
                  <div
                    className="
                      absolute inset-0 rounded-2xl opacity-0 
                      group-hover:opacity-100 transition-all duration-300 blur-xl
                    "
                    style={{
                      background: `${skill.color}25`,
                    }}
                  ></div>

                  <div className="relative flex items-center gap-3">
                    <span
                      className="text-3xl transition-transform duration-300 group-hover:scale-110"
                      style={{ color: skill.color }}
                    >
                      {skill.icon}
                    </span>

                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {skill.title}
                    </h3>
                  </div>
                </div>
              </TooltipTrigger>

              {/* Tooltip content */}
              <TooltipContent
                side="top"
                className="px-3 py-1.5 text-sm font-medium bg-neutral-900 text-white rounded-md shadow-md"
                style={{
                  border: `1px solid ${skill.color}40`,
                }}
              >
                {skill.desc}
              </TooltipContent>

            </Tooltip>
          ))}

        </div>
      </section>
    </TooltipProvider>
  );
};

export default Skills;
