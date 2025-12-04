"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Create Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook for easy use
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};

// Provider Component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("system");

  const applyTheme = (selectedTheme: Theme) => {
    const root = window.document.documentElement;

    // Remove previous class
    root.classList.remove("light", "dark");

    if (selectedTheme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(prefersDark ? "dark" : "light");
    } else {
      root.classList.add(selectedTheme);
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);  
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  // Load initial theme
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme;
    const initialTheme = saved || "system";
    setThemeState(initialTheme);
    applyTheme(initialTheme);

    // Listen for system theme changes
    if (initialTheme === "system") {
      const media = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme("system");
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
