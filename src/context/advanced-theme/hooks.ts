
import { useState, useEffect } from "react";
import { ThemeSettings } from "./types";
import { defaultThemes } from "./defaultThemes";
import { 
  applyThemeToDOM, 
  getStoredThemes, 
  saveCustomThemes, 
  getStoredThemeId, 
  getStoredMode 
} from "./utils";

export const useAdvancedThemeState = () => {
  const [currentThemeId, setCurrentThemeId] = useState<string>(getStoredThemeId);
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [availableThemes, setAvailableThemes] = useState<ThemeSettings[]>(() => {
    const customThemes = getStoredThemes();
    return [...defaultThemes, ...customThemes];
  });

  const currentTheme = availableThemes.find(theme => theme.id === currentThemeId) || defaultThemes[0];

  // Apply theme changes to DOM
  useEffect(() => {
    localStorage.setItem("advanced-theme", currentThemeId);
    localStorage.setItem("theme-mode", mode);
    applyThemeToDOM(currentTheme, mode);
  }, [currentThemeId, mode, currentTheme]);

  const setTheme = (themeId: string) => {
    setCurrentThemeId(themeId);
  };

  const toggleMode = () => {
    setMode('dark');
  };

  const addCustomTheme = (theme: ThemeSettings) => {
    const newThemes = [...availableThemes, theme];
    setAvailableThemes(newThemes);
    
    const customThemes = newThemes.filter(t => !defaultThemes.find(dt => dt.id === t.id));
    saveCustomThemes(customThemes);
  };

  const removeCustomTheme = (themeId: string) => {
    const newThemes = availableThemes.filter(theme => theme.id !== themeId);
    setAvailableThemes(newThemes);
    
    const customThemes = newThemes.filter(t => !defaultThemes.find(dt => dt.id === t.id));
    saveCustomThemes(customThemes);
    
    if (currentThemeId === themeId) {
      setCurrentThemeId(defaultThemes[0].id);
    }
  };

  return {
    currentTheme,
    mode,
    availableThemes,
    setTheme,
    toggleMode,
    setMode: (_mode: "light" | "dark") => setMode('dark'),
    addCustomTheme,
    removeCustomTheme
  };
};
