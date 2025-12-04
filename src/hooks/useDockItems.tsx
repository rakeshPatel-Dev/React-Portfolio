import { 
  Home, 
  Code2,
  Mail,
  Github,
  Linkedin,
  SunMoon
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const useDockItems = () => {
  const navigate = useNavigate();

  const separatorItem = {
    icon: (
      <div className="w-px h-6 bg-neutral-400/40 dark:bg-neutral-600/60 rounded" />
    ),
    label: "",
    onClick: () => {},
    disabled: true,
  };

  return [
    { icon: <Home size={18} />, label: "Home", onClick: () => navigate("/") },
    { icon: <Code2 size={18} />, label: "Projects", onClick: () => navigate("/projects") },
    { icon: <Mail size={18} />, label: "Contact", onClick: () => navigate("/contact") },

    separatorItem,

    { icon: <Github size={18} />, label: "GitHub", onClick: () => window.open("https://github.com/", "_blank") },
    { icon: <Linkedin size={18} />, label: "LinkedIn", onClick: () => window.open("https://linkedin.com/", "_blank") },

    separatorItem,

    { icon: <SunMoon size={18} />, label: "Theme", onClick: () => alert("Toggle theme!") },
  ];
};

export default useDockItems;
