import {
  RiReactjsFill,
  RiTailwindCssFill,
  RiJavascriptFill,
} from "react-icons/ri";

import { FaYoutube, FaUnsplash, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { SiShadcnui, SiVite } from "react-icons/si";
import { IoImage, IoSearch, IoHeart } from "react-icons/io5";
// import { TbBrandTypescript } from "react-icons/tb";

export interface ProjectType {
  image: string;
  title: string;
  description: string;
  type: "frontend" | "web-clone" | "feature" | "microapp" | "fullStack";
  typeColor: string;
  liveLink: string;
  sourceLink: string;
  status: string;
  icons: {
    icon: any;
    tooltip: string;
    color: string;
  }[];
}

export const projectData: ProjectType[] = [
  {
    image: "/public/images/moodymusik.webp",
    title: "MoodyMusik",
    description:
      "A mood-based playlist generator with real-time search and a dedicated song player.",
    type: "fullStack",
    typeColor: "#800000", // green for frontend
    liveLink: "https://moodymusik.vercel.app/",
    sourceLink: "https://github.com/rakeshPatel-Dev/moodyMusik",
    status: "Completed",
    icons: [
      { icon: RiReactjsFill, tooltip: "React", color: "#61dafb" },
      { icon: RiTailwindCssFill, tooltip: "TailwindCSS", color: "#38bdf8" },
      { icon: FaYoutube, tooltip: "YouTube API", color: "#ff0000" },
    ],
  },
  {
    image: "/public/images/imagetoolkit.webp",
    title: "Image Toolkit",
    description:
      "A powerful image toolkit to resize, compress, convert and crop images instantly.",
    type: "frontend",
    typeColor: "#4ade80",
    liveLink: "https://imagetoolkit.vercel.app/",
    sourceLink: "https://github.com/rakeshPatel-Dev/image-toolkit",
    status: "Completed",
    icons: [
      { icon: IoImage, tooltip: "Image Operations", color: "#f97316" },
      { icon: RiReactjsFill, tooltip: "React", color: "#61dafb" },
      { icon: SiShadcnui, tooltip: "Shadcn UI", color: "#7c3aed" },
    ],
  },
  {
    image: "/public/images/photolab.webp",
    title: "Photolab",
    description:
      "A clean gallery app with search, dark mode, and random image fetching.",
    type: "frontend",
    typeColor: "#4ade80",
    liveLink: "https://photolab-app.netlify.app/",
    sourceLink: "https://github.com/rakeshPatel-Dev/gallery-app",
    status: "Completed",
    icons: [
      { icon: IoSearch, tooltip: "Search Feature", color: "#facc15" },
      { icon: FaUnsplash, tooltip: "Unsplash API", color: "#0ea5e9" },
      { icon: RiReactjsFill, tooltip: "React", color: "#61dafb" },
    ],
  },
  {
    image: "/public/images/guess the number.webp",
    title: "Call Reminder App",
    description:
      "A simple and elegant reminder app for scheduling calls.",
    type: "frontend",
    typeColor: "#4ade80",
    liveLink: "https://callreminderapp.netlify.app/",
    sourceLink: "https://github.com/rakeshPatel-Dev/Note-App.git",
    status: "Completed",
    icons: [
      { icon: FaHtml5, tooltip: "HTML5", color: "#e34f26" },
      { icon: FaCss3Alt, tooltip: "CSS3", color: "#1572b6" },
      { icon: RiJavascriptFill, tooltip: "JavaScript", color: "#f7df1e" },
    ],
  },
  {
    image: "/public/images/todoapp.webp",
    title: "To Do App",
    description:
      "An interactive To-Do app that stores tasks using LocalStorage.",
    type: "frontend",
    typeColor: "#4ade80",
    liveLink: "https://rakeshpatel-dev.github.io/todo-App/",
    sourceLink: "https://github.com/rakeshPatel-Dev/todo-App",
    status: "Completed",
    icons: [
      { icon: FaHtml5, tooltip: "HTML5", color: "#e34f26" },
      { icon: RiJavascriptFill, tooltip: "JavaScript", color: "#f7df1e" },
      { icon: RiTailwindCssFill, tooltip: "TailwindCSS", color: "#38bdf8" },
    ],
  },
  {
    image: "/public/images/guess the number.webp",
    title: "Netflix Nepal Clone",
    description:
      "A UI-heavy clone showcasing movie grid, hero section, and animated UI.",
    type: "web-clone",
    typeColor: "#f472b6", // pink for web-clone
    liveLink: "#",
    sourceLink:
      "https://github.com/rakeshPatel-Dev/Clone-Projects/tree/main/Netflix",
    status: "Completed",
    icons: [
      { icon: RiTailwindCssFill, tooltip: "TailwindCSS", color: "#38bdf8" },
      { icon: RiJavascriptFill, tooltip: "JavaScript", color: "#f7df1e" },
      { icon: SiVite, tooltip: "Vite", color: "#646cff" },
    ],
  },
  {
    image: "/public/images/userfinder.webp",
    title: "Find User Feature",
    description:
      "A reusable search component to find users or items by name or keyword.",
    type: "feature",
    typeColor: "#facc15", // yellow for feature
    liveLink: "#",
    sourceLink: "https://github.com/rakeshPatel-Dev/User-Finder",
    status: "Completed",
    icons: [
      { icon: IoSearch, tooltip: "Search Logic", color: "#facc15" },
      { icon: RiJavascriptFill, tooltip: "JavaScript", color: "#f7df1e" },
    ],
  },
  {
    image: "/public/images/loveconfession.webp",
    title: "Love Confession Website",
    description:
      "A fun micro-interaction project where the 'No' button dodges you.",
    type: "microapp",
    typeColor: "#38bdf8", // blue for microapp
    liveLink: "#",
    sourceLink: "https://github.com/rakeshPatel-Dev/Love-Confession",
    status: "Fun Project",
    icons: [
      { icon: IoHeart, tooltip: "Fun Interaction", color: "#ec4899" },
      { icon: RiJavascriptFill, tooltip: "JavaScript", color: "#f7df1e" },
    ],
  },
];
