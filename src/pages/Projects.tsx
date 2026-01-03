import { Github, Globe } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { projectData } from "@/data/projectData";
import { Tooltip, TooltipContent, TooltipTrigger } from "../components/ui/tooltip";
import SpotlightCard from "../components/ui/spotlightCard";
import LazyImageWithSkeleton from "@/components/LazyLoading";
import PageTransition from "@/components/PageTransition";

const ProjectSec = () => {
  const navigate = useNavigate();


  return (
    <PageTransition>
      <div>
        <section id="projects" className="flex max-w-4xl px-6 sm:px-4 lg:px-0 mt-25 mb-10 mx-auto flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl heading-bold">
              Projects
            </h2>
          </div>

          {/* card container */}

          <div className="parent-container grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-2">
            {projectData.map((project, idx) => (
              <SpotlightCard
                key={idx}
                spotlightColor={`rgba(${0},${0},${140},${0.5})`}
                className="cursor-pointer"
                onClick={() => navigate(`/projects/${project.id}`)}

              >
                {/* Type at top right */}
                <span
                  className="absolute z-10 top-3 right-3 px-3 py-1 rounded-full text-white backdrop-blur-2xl text-xs font-medium border border-primary/10"
                  style={{ backgroundColor: project.typeColor + "80" }} // 99 = ~60% opacity in hex
                >
                  {project.type.toUpperCase()}
                </span>


                {/* Project Image */}
                <div className="overflow-hidden rounded-xl">
                  <LazyImageWithSkeleton
                    src={project.image}
                    alt={project.title}
                    title={project.title}
                    className="w-full object-cover hover:scale-110 mb-4 transition-all rounded-xl"
                  />

                </div>

                {/* Title + Live/Github Icons */}
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl heading-bold mb-4">{project.title}</h1>
                  <div className="flex text-muted-foreground items-center gap-3">
                    <Tooltip>
                      <TooltipTrigger>
                        <a
                          title="website link"
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()} // prevent card click
                        >
                          <Globe className="hover:text-primary transition-all cursor-pointer w-5 h-5 hover:scale-115" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>View Live</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger>
                        <a
                          title="Github link"
                          href={project.sourceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="hover:text-primary  transition-all cursor-pointer w-5 h-5 hover:scale-115" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>Source Code</TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Description */}
                <p className="font-body text-muted-foreground mb-4">{project.description}</p>

                {/* Technologies */}
                <div className="flex flex-col gap-2 mb-4">
                  <h1>Technologies</h1>
                  <div className="flex items-center gap-4">
                    {project.icons.map((iconData, idx) => {
                      const Icon = iconData.icon;
                      return (
                        <Tooltip key={idx}>
                          <TooltipTrigger>
                            <Icon
                              className="w-6 h-6 hover:scale-110 transition-all"
                              style={{ color: iconData.color }}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </TooltipTrigger>
                          <TooltipContent>{iconData.tooltip}</TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>

                {/* Status + View More */}
                <div className="select-none flex items-center justify-between flex-row mt-3">
                  <div
                    className={`flex items-center gap-2 border px-3 py-1 rounded-full text-sm font-medium cursor-default ${project.status === "Completed"
                      ? "text-green-500 border-green-500"
                      : "text-red-500 border-red-500"
                      }`}
                  >
                    <span className="relative flex h-3 w-3">
                      <span
                        className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${project.status === "Completed" ? "bg-green-400" : "bg-red-400"
                          }`}
                      ></span>
                      <span
                        className={`relative inline-flex h-3 w-3 rounded-full ${project.status === "Completed" ? "bg-green-500" : "bg-red-500"
                          }`}
                      ></span>
                    </span>
                    {project.status}
                  </div>


                  <Button
                    className="text-muted-foreground hover:text-primary cursor-pointer transition-all"
                    variant="link"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    View details
                  </Button>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>

  );
};

export default ProjectSec;
