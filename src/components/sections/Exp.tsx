import { MapPin, Globe, Facebook } from "lucide-react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
// import { Link } from "react-router-dom";

const Exp = () => {
  return (
    <div className="mt-10 mb-16">
      {/* Section Title */}
      <h1 className="text-2xl heading-bold mb-6 ">
        Experience
      </h1>

      <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-3 sm:pl-5 ml-1 sm:ml-2 space-y-6">

        {/* Top Row */}
        <div className="flex flex-col sm:flex-row sm:items-start w-full gap-4 sm:gap-0">

          <div className="sm:ml-3 w-full">

            {/* Title row — COMPANY NAME */}
            <div className="flex flex-col sm:flex-row justify-between w-full items-start sm:items-center gap-2 sm:gap-0">

              {/* LEFT */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-xl font-bold">
                <span>Ghardailo Dugdh Dairy Co.</span>

                {/* Icons */}
                <div className="flex gap-2">
                  <Tooltip>
                    <TooltipTrigger>
                      <a href="#" title="Website">
                        <Globe className="w-4 h-4 text-neutral-600 dark:text-neutral-500" />
                        <TooltipContent>View Website</TooltipContent>
                      </a>
                    </TooltipTrigger>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <a
                        href="https://www.facebook.com/ghardailodairy" target="_blank"
                        rel="noopener"
                        title="Facebook"
                      >
                        <Facebook className="w-4 h-4 text-neutral-600 dark:text-neutral-500" />
                        <TooltipContent>Facebook</TooltipContent>
                      </a>
                    </TooltipTrigger>
                  </Tooltip>
                </div>
              </div>

              {/* RIGHT */}
              <div className="text-right text-sm text-neutral-600 dark:text-neutral-300 mt-1 sm:mt-0">
                <div className="flex items-center gap-1 justify-start sm:justify-end">
                  <MapPin className="w-4 h-4" /> Rautahat, Nepal
                </div>
                <p>May 2025 – November 2025</p>
              </div>
            </div>

            {/* Post / Position */}
            <p className="mt-2 sm:mt-1 text-muted-foreground text-lg font-medium">
              Frontend Developer Intern
            </p>

            {/* Tech Icons */}
            <div className="flex flex-wrap items-center gap-3 mt-3 text-neutral-700 dark:text-neutral-300">
              <span className="flex items-center gap-2 border-dashed border-2 px-3 py-1 text-sm rounded-xl hover:scale-105 transition-all select-none hover:bg-primary/5">
                <FaHtml5 className="text-[#E34F26]" />
                HTML5
              </span>
              <span className="flex items-center gap-2 border-dashed border-2 px-3 py-1 text-sm rounded-xl hover:scale-105 transition-all select-none hover:bg-primary/5">
                <FaCss3Alt className="text-[#1572B6]" />
                CSS3
              </span>
              <span className="flex items-center gap-2 border-dashed border-2 px-3 py-1 text-sm rounded-xl hover:scale-105 transition-all select-none hover:bg-primary/5">
                <FaJs className="text-[#F7DF1E]" />
                JavaScript
              </span>
              <span className="flex items-center gap-2 border-dashed border-2 px-3 py-1 text-sm rounded-xl hover:scale-105 transition-all select-none hover:bg-primary/5">
                <FaReact className="text-[#61DAFB]" />
                React
              </span>
            </div>

            {/* Accordion */}
            <Accordion type="single" collapsible className="mt-3">
              <AccordionItem value="item-1">
                <AccordionTrigger>View Objectives</AccordionTrigger>
                <AccordionContent>
                  <ul className="ml-5 mt-1 list-disc text-neutral-700 dark:text-neutral-300 space-y-1">
                    <li>
                      Built and maintained the official dairy website using <strong>HTML, CSS, JavaScript</strong>.
                    </li>
                    <li>Improved UI responsiveness for mobile users in remote areas.</li>
                    <li>Designed smooth navigation and clean layouts for better UX.</li>
                    <li>Collaborated with design & management to update product info.</li>
                    <li>Helped simplify digital operations for farmers and staff.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Exp;
