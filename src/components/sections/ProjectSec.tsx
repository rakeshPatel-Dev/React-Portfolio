import { ArrowUpRight, Github, Globe } from "lucide-react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { projectData } from "@/data/projectData";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import SpotlightCard from "../ui/spotlightCard";
import LazyImageWithSkeleton from "../LazyLoading";

const ProjectSec = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section id="projects" className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl mt-6 heading-bold">
            Projects
          </h2>


        </div>

        {/* card container */}

        <div className="parent-container grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-2">
          {projectData.slice(0, 4).map((project, idx) => (
            <SpotlightCard
              key={idx}
              spotlightColor={`rgba(${0},${0},${110},${0.5})`}
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
                <h2 className="text-2xl heading-bold mb-4">{project.title}</h2>
                <div className="flex items-center gap-3">
                  <Tooltip>
                    <TooltipTrigger>
                      <a
                        title="Website link"
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => e.stopPropagation()} // prevent card click
                      >
                        <Globe className="hover:text-primary text-muted-foreground transition-all cursor-pointer w-5 h-5 hover:scale-115" />
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
                        <Github className="hover:text-primary text-muted-foreground transition-all cursor-pointer w-5 h-5 hover:scale-115" />
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
                <h3>Technologies</h3>
                <div className="flex items-center  gap-4">
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
                  className=" cursor-pointer text-muted-foreground hover:text-primary transition-all"
                  variant="link"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  View details
                </Button>
              </div>
            </SpotlightCard>
          ))}
        </div>
        <div className="flex w-full justify-end heading-medium items-center">
          <Button variant="outline" className="">
            <Link to="/projects">View More</Link>
            <ArrowUpRight className="ml-2.5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProjectSec;
