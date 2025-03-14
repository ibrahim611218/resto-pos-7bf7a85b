
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarContextType {
  openCategories: Record<string, boolean>;
  setOpenCategories: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  toggleCategory: (category: string) => void;
  isInitialized: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarContextProvider");
  }
  return context;
};

interface SidebarContextProviderProps {
  collapsed: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const SidebarContextProvider: React.FC<SidebarContextProviderProps> = ({ 
  children, 
  collapsed,
  onToggle
}) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Setup initial open categories based on current URL
  useEffect(() => {
    const path = location.pathname;
    const categoriesState: Record<string, boolean> = {};
    
    if (path.includes('/pos') || path.includes('/invoices') || path.includes('/customers')) {
      categoriesState['pos'] = true;
    }
    
    if (path.includes('/products') || path.includes('/categories')) {
      categoriesState['products'] = true;
    }
    
    if (path.includes('/inventory')) {
      categoriesState['inventory'] = true;
    }
    
    if (path.includes('/reports')) {
      categoriesState['reports'] = true;
    }
    
    if (path.includes('/settings')) {
      categoriesState['settings'] = true;
    }
    
    setOpenCategories(categoriesState);
    setIsInitialized(true);
  }, [location.pathname]);

  const toggleCategory = useCallback((category: string) => {
    if (collapsed) {
      onToggle();
      setTimeout(() => {
        setOpenCategories((prev) => ({
          ...prev,
          [category]: !prev[category],
        }));
      }, 300);
    } else {
      setOpenCategories((prev) => ({
        ...prev,
        [category]: !prev[category],
      }));
    }
  }, [collapsed, onToggle]);

  return (
    <SidebarContext.Provider 
      value={{ 
        openCategories, 
        setOpenCategories, 
        toggleCategory,
        isInitialized
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
