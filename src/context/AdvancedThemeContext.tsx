
import React, { createContext, useContext } from "react";
import { AdvancedThemeContextProps } from "./advanced-theme/types";
import { useAdvancedThemeState } from "./advanced-theme/hooks";

const AdvancedThemeContext = createContext<AdvancedThemeContextProps | undefined>(undefined);

export const AdvancedThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeState = useAdvancedThemeState();

  return (
    <AdvancedThemeContext.Provider value={themeState}>
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

// Export types for external use
export type { ThemeSettings, ThemeColors, AdvancedThemeContextProps } from "./advanced-theme/types";
