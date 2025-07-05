
import React, { createContext, useContext, useEffect, useState } from "react";

export interface ThemeColors {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  destructive: string;
  destructiveForeground: string;
  success: string;
  successForeground: string;
}

export interface ThemeSettings {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
  borderRadius: number;
  fontFamily: string;
  shadows: boolean;
  animations: boolean;
}

const defaultThemes: ThemeSettings[] = [
  {
    id: "saudi-green",
    name: "Saudi Green",
    nameAr: "الأخضر السعودي",
    description: "Traditional Saudi colors with green theme",
    descriptionAr: "الألوان السعودية التقليدية مع الثيم الأخضر",
    colors: {
      light: {
        primary: "167 100% 15%",
        primaryForeground: "0 0% 98%",
        secondary: "240 4.8% 95.9%",
        secondaryForeground: "167 80% 15%",
        accent: "167 100% 95%",
        accentForeground: "167 100% 15%",
        background: "0 0% 98%",
        foreground: "240 10% 3.9%",
        card: "0 0% 100%",
        cardForeground: "240 10% 3.9%",
        muted: "240 4.8% 95.9%",
        mutedForeground: "240 3.8% 46.1%",
        border: "240 5.9% 90%",
        destructive: "0 84.2% 60.2%",
        destructiveForeground: "0 0% 98%",
        success: "142 76% 36%",
        successForeground: "0 0% 98%"
      },
      dark: {
        primary: "167 100% 20%",
        primaryForeground: "0 0% 98%",
        secondary: "167 30% 15%",
        secondaryForeground: "0 0% 98%",
        accent: "167 30% 15%",
        accentForeground: "0 0% 98%",
        background: "167 100% 6%",
        foreground: "0 0% 98%",
        card: "167 100% 8%",
        cardForeground: "0 0% 98%",
        muted: "167 30% 15%",
        mutedForeground: "240 5% 64.9%",
        border: "167 30% 15%",
        destructive: "0 62.8% 30.6%",
        destructiveForeground: "0 0% 98%",
        success: "142 76% 36%",
        successForeground: "0 0% 98%"
      }
    },
    borderRadius: 0.75,
    fontFamily: "Cairo",
    shadows: true,
    animations: true
  },
  {
    id: "royal-blue",
    name: "Royal Blue",
    nameAr: "الأزرق الملكي",
    description: "Elegant royal blue theme",
    descriptionAr: "ثيم أزرق ملكي أنيق",
    colors: {
      light: {
        primary: "221 83% 53%",
        primaryForeground: "0 0% 98%",
        secondary: "240 4.8% 95.9%",
        secondaryForeground: "221 80% 40%",
        accent: "221 100% 95%",
        accentForeground: "221 83% 53%",
        background: "0 0% 98%",
        foreground: "240 10% 3.9%",
        card: "0 0% 100%",
        cardForeground: "240 10% 3.9%",
        muted: "240 4.8% 95.9%",
        mutedForeground: "240 3.8% 46.1%",
        border: "240 5.9% 90%",
        destructive: "0 84.2% 60.2%",
        destructiveForeground: "0 0% 98%",
        success: "142 76% 36%",
        successForeground: "0 0% 98%"
      },
      dark: {
        primary: "221 83% 60%",
        primaryForeground: "0 0% 98%",
        secondary: "221 30% 15%",
        secondaryForeground: "0 0% 98%",
        accent: "221 30% 15%",
        accentForeground: "0 0% 98%",
        background: "221 100% 6%",
        foreground: "0 0% 98%",
        card: "221 100% 8%",
        cardForeground: "0 0% 98%",
        muted: "221 30% 15%",
        mutedForeground: "240 5% 64.9%",
        border: "221 30% 15%",
        destructive: "0 62.8% 30.6%",
        destructiveForeground: "0 0% 98%",
        success: "142 76% 36%",
        successForeground: "0 0% 98%"
      }
    },
    borderRadius: 0.5,
    fontFamily: "Inter",
    shadows: true,
    animations: true
  },
  {
    id: "golden-sand",
    name: "Golden Sand",
    nameAr: "الرمال الذهبية",
    description: "Warm golden sand theme",
    descriptionAr: "ثيم الرمال الذهبية الدافئ",
    colors: {
      light: {
        primary: "45 93% 47%",
        primaryForeground: "0 0% 98%",
        secondary: "240 4.8% 95.9%",
        secondaryForeground: "45 80% 40%",
        accent: "45 100% 95%",
        accentForeground: "45 93% 47%",
        background: "0 0% 98%",
        foreground: "240 10% 3.9%",
        card: "0 0% 100%",
        cardForeground: "240 10% 3.9%",
        muted: "240 4.8% 95.9%",
        mutedForeground: "240 3.8% 46.1%",
        border: "240 5.9% 90%",
        destructive: "0 84.2% 60.2%",
        destructiveForeground: "0 0% 98%",
        success: "142 76% 36%",
        successForeground: "0 0% 98%"
      },
      dark: {
        primary: "45 93% 55%",
        primaryForeground: "0 0% 98%",
        secondary: "45 30% 15%",
        secondaryForeground: "0 0% 98%",
        accent: "45 30% 15%",
        accentForeground: "0 0% 98%",
        background: "45 100% 6%",
        foreground: "0 0% 98%",
        card: "45 100% 8%",
        cardForeground: "0 0% 98%",
        muted: "45 30% 15%",
        mutedForeground: "240 5% 64.9%",
        border: "45 30% 15%",
        destructive: "0 62.8% 30.6%",
        destructiveForeground: "0 0% 98%",
        success: "142 76% 36%",
        successForeground: "0 0% 98%"
      }
    },
    borderRadius: 1,
    fontFamily: "Tajawal",
    shadows: false,
    animations: true
  }
];

interface AdvancedThemeContextProps {
  currentTheme: ThemeSettings;
  mode: "light" | "dark";
  availableThemes: ThemeSettings[];
  setTheme: (themeId: string) => void;
  toggleMode: () => void;
  setMode: (mode: "light" | "dark") => void;
  addCustomTheme: (theme: ThemeSettings) => void;
  removeCustomTheme: (themeId: string) => void;
}

const AdvancedThemeContext = createContext<AdvancedThemeContextProps | undefined>(undefined);

export const AdvancedThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentThemeId, setCurrentThemeId] = useState<string>(() => {
    return localStorage.getItem("advanced-theme") || "saudi-green";
  });
  
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const savedMode = localStorage.getItem("theme-mode") as "light" | "dark";
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return savedMode || (prefersDark ? "dark" : "light");
  });

  const [availableThemes, setAvailableThemes] = useState<ThemeSettings[]>(() => {
    const customThemes = localStorage.getItem("custom-themes");
    const custom = customThemes ? JSON.parse(customThemes) : [];
    return [...defaultThemes, ...custom];
  });

  const currentTheme = availableThemes.find(theme => theme.id === currentThemeId) || defaultThemes[0];

  useEffect(() => {
    localStorage.setItem("advanced-theme", currentThemeId);
    localStorage.setItem("theme-mode", mode);
    
    // Apply theme colors to CSS variables
    const colors = currentTheme.colors[mode];
    const root = document.documentElement;
    
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    });
    
    // Apply other theme settings
    root.style.setProperty('--radius', `${currentTheme.borderRadius}rem`);
    root.style.setProperty('--font-family', currentTheme.fontFamily);
    
    // Apply mode class
    root.classList.remove("light", "dark");
    root.classList.add(mode);
    
    // Apply theme-specific classes
    root.classList.toggle("shadows-enabled", currentTheme.shadows);
    root.classList.toggle("animations-enabled", currentTheme.animations);
    
  }, [currentThemeId, mode, currentTheme]);

  const setTheme = (themeId: string) => {
    setCurrentThemeId(themeId);
  };

  const toggleMode = () => {
    setMode(prevMode => prevMode === "light" ? "dark" : "light");
  };

  const addCustomTheme = (theme: ThemeSettings) => {
    const newThemes = [...availableThemes, theme];
    setAvailableThemes(newThemes);
    
    const customThemes = newThemes.filter(t => !defaultThemes.find(dt => dt.id === t.id));
    localStorage.setItem("custom-themes", JSON.stringify(customThemes));
  };

  const removeCustomTheme = (themeId: string) => {
    const newThemes = availableThemes.filter(theme => theme.id !== themeId);
    setAvailableThemes(newThemes);
    
    const customThemes = newThemes.filter(t => !defaultThemes.find(dt => dt.id === t.id));
    localStorage.setItem("custom-themes", JSON.stringify(customThemes));
    
    if (currentThemeId === themeId) {
      setCurrentThemeId(defaultThemes[0].id);
    }
  };

  return (
    <AdvancedThemeContext.Provider value={{
      currentTheme,
      mode,
      availableThemes,
      setTheme,
      toggleMode,
      setMode,
      addCustomTheme,
      removeCustomTheme
    }}>
      {children}
    </AdvancedThemeContext.Provider>
  );
};

export const useAdvancedTheme = (): AdvancedThemeContextProps => {
  const context = useContext(AdvancedThemeContext);
  if (!context) {
    throw new Error("useAdvancedTheme must be used within an AdvancedThemeProvider");
  }
  return context;
};
