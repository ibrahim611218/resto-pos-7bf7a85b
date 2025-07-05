
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

export interface AdvancedThemeContextProps {
  currentTheme: ThemeSettings;
  mode: "light" | "dark";
  availableThemes: ThemeSettings[];
  setTheme: (themeId: string) => void;
  toggleMode: () => void;
  setMode: (mode: "light" | "dark") => void;
  addCustomTheme: (theme: ThemeSettings) => void;
  removeCustomTheme: (themeId: string) => void;
}
