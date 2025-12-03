import { Link } from "react-router-dom";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { projectData } from "@/data/projectData";
import { Tooltip, TooltipTrigger } from "@/components/ui/Tooltip"; // your tooltip component
import { Github, Globe } from "lucide-react";
import { TooltipContent } from "@radix-ui/react-tooltip";
// import {
//   FaReact,
//   FaHtml5,
//   FaCss3,
//   FaJs,
//   FaGithub,
//   FaExternalLinkAlt,
// } from "react-icons/fa";

// import { RiGlobeFill } from "react-icons/ri";

const Projects = () => {
  return (
    <div className="parent-container grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projectData.map((project, idx) => (
        <SpotlightCard
          key={idx}
          className="p-4 rounded-lg w-96 border flex flex-col gap-4"
          spotlightColor="rgba(0, 229, 255, 0.8)"
        >
          {/* Project Image */}
          <div>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          {/* Title + Icons */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">{project.title}</h1>
            <div className="flex items-center gap-2">
              {/* LIve */}
              <Tooltip>
                <TooltipTrigger>
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <Globe className="w-5 h-5 cursor-pointer text-gray-700 dark:text-gray-300" />
                </a>
                </TooltipTrigger>
                <TooltipContent>Live Demo</TooltipContent>
              </Tooltip>
              {/* Github */}
              <Tooltip>
                <TooltipTrigger>
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 cursor-pointer text-gray-700 dark:text-gray-300" />
                </a>
                </TooltipTrigger>
                <TooltipContent>Source Code</TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300">{project.description}</p>

          {/* Tech Icons */}
          <div className="flex flex-col gap-2">
            <h1 className="font-medium">Technologies</h1>
            <div className="flex gap-4 items-center">
              {project.icons.map((ic, iIdx) => (
                <Tooltip key={iIdx} content={ic.tooltip}>
                  <ic.icon className="w-6 h-6 text-gray-700 dark:text-gray-300 cursor-pointer" />
                </Tooltip>
              ))}
            </div>
          </div>

          {/* Status + View More */}
          <div className="flex items-center justify-between">
            <div className="border flex items-center rounded-full gap-2 px-4 py-2">
              <span className="h-3 w-3 bg-green-600 animate-pulse rounded-full"></span>
              <span>{project.status}</span>
            </div>
            <Link
              to="/project"
              className="text-blue-600 hover:underline font-medium"
            >
              View More
            </Link>
          </div>
        </SpotlightCard>
      ))}
    </div>
  );
};

export default Projects;
