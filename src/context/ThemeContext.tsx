
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "saudi";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem("theme") as Theme;
    // Check system preference if no stored theme
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    return savedTheme || (prefersDark ? "dark" : "light");
  });

  useEffect(() => {
    // Update localStorage when theme changes
    localStorage.setItem("theme", theme);
    
    // Update document class for CSS styling
    const root = document.documentElement;
    root.classList.remove("light", "dark", "saudi");
    root.classList.add(theme);
    
    // Apply dark mode specific styles
    if (theme === "dark") {
      // Apply black background, white text, blue borders for dark mode
      document.documentElement.style.setProperty('--background', '0 0% 0%');  // Black background
      document.documentElement.style.setProperty('--foreground', '0 0% 100%');  // White text
      document.documentElement.style.setProperty('--border', '210 100% 50%'); // Blue borders
      document.documentElement.style.setProperty('--card', '0 0% 5%');  // Slightly lighter black for cards
      document.documentElement.style.setProperty('--input', '210 100% 30%');  // Blue inputs
      document.documentElement.style.setProperty('--ring', '210 100% 50%');  // Blue focus rings
    } else if (theme === "saudi") {
      // Saudi mode uses orange borders defined in the CSS
      document.documentElement.style.setProperty('--border', '30 100% 50%');  // Orange borders
    } else {
      // Light mode - reset to default theme values (if needed)
      document.documentElement.style.setProperty('--background', '0 0% 100%');
      document.documentElement.style.setProperty('--foreground', '240 10% 3.9%');
      document.documentElement.style.setProperty('--border', '240 5.9% 90%');
      document.documentElement.style.setProperty('--card', '0 0% 100%');
      document.documentElement.style.setProperty('--input', '240 5.9% 90%');
      document.documentElement.style.setProperty('--ring', '240 5.9% 10%');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "light") return "dark";
      if (prevTheme === "dark") return "saudi";
      return "light";
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
