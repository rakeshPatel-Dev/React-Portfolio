"use client";

import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Dock, DockIcon } from "@/components/ui/Dock";
import {
  Home,
  Code2,
  MessageCircle,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "../components/ui/animated-theme-toggler";

export function AppDock() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <TooltipProvider delayDuration={80}>
        <Dock direction="middle">

          {/* Navigation */}
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/"
                  aria-label="Home"
                  className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12 rounded-full")}
                >
                  <Home className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Home</TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/projects"
                  aria-label="Projects"
                  className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12 rounded-full")}
                >
                  <Code2 className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Projects</TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/contact"
                  aria-label="Contact"
                  className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12 rounded-full")}
                >
                  <MessageCircle className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Contact</TooltipContent>
            </Tooltip>
          </DockIcon>

          {/* Divider */}
          <Separator orientation="vertical" className="h-8 bg-neutral-500/50" />

          {/* Socials */}
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  title="GitHub"
                  rel="noopener"
                  href="https://github.com/rakeshPatel-Dev"
                  target="_blank"
                  className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12 rounded-full")}
                >
                  <Github className="size-5" />
                </a>
              </TooltipTrigger>
              <TooltipContent>GitHub</TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  title="LinkedIn"
                  rel="noopener"
                  href="https://linkedin.com/in/rakeshpatel-developer"
                  target="_blank"
                  className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12 rounded-full")}
                >
                  <Linkedin className="size-5" />
                </a>
              </TooltipTrigger>
              <TooltipContent>LinkedIn</TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  title="Email"
                  href="mailto:rk5080976@gmail.com"
                  className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12 rounded-full")}
                >
                  <Mail className="size-5" />
                </a>
              </TooltipTrigger>
              <TooltipContent>Email</TooltipContent>
            </Tooltip>
          </DockIcon>

          {/* Divider */}

          <Separator orientation="vertical" className="h-8 bg-neutral-500/50" />


          {/* Theme Toggle */}
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <AnimatedThemeToggler className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-12 cursor-pointer rounded-full")} />
                </div>
              </TooltipTrigger>
              <TooltipContent>Theme</TooltipContent>
            </Tooltip>
          </DockIcon>


        </Dock>
      </TooltipProvider>
    </div>
  );
}
