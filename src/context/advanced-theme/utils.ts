
import { ThemeSettings, ThemeColors } from "./types";

export const applyThemeToDOM = (
  theme: ThemeSettings, 
  mode: "light" | "dark"
) => {
  const colors = theme.colors[mode];
  const root = document.documentElement;
  
  // Apply theme colors to CSS variables
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
  });
  
  // Apply other theme settings
  root.style.setProperty('--radius', `${theme.borderRadius}rem`);
  root.style.setProperty('--font-family', theme.fontFamily);
  
  // Apply mode class
  root.classList.remove("light", "dark");
  root.classList.add(mode);
  
  // Apply theme-specific classes
  root.classList.toggle("shadows-enabled", theme.shadows);
  root.classList.toggle("animations-enabled", theme.animations);
};

export const getStoredThemes = (): ThemeSettings[] => {
  const customThemes = localStorage.getItem("custom-themes");
  return customThemes ? JSON.parse(customThemes) : [];
};

export const saveCustomThemes = (themes: ThemeSettings[]): void => {
  localStorage.setItem("custom-themes", JSON.stringify(themes));
};

export const getStoredThemeId = (): string => {
  return localStorage.getItem("advanced-theme") || "saudi-green";
};

export const getStoredMode = (): "light" | "dark" => {
  const savedMode = localStorage.getItem("theme-mode") as "light" | "dark";
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return savedMode || (prefersDark ? "dark" : "light");
};
