
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useFullscreen } from "@/hooks/useFullscreen";

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
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { isFullscreen } = useFullscreen();
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

  // Improved toggle category function
  const toggleCategory = useCallback((category: string) => {
    if (collapsed) {
      // First expand the sidebar
      onToggle();
      // Then open the category after a short delay
      setTimeout(() => {
        setOpenCategories((prev) => ({
          ...prev,
          [category]: !prev[category],
        }));
      }, 300);
    } else {
      // If sidebar is already expanded, just toggle the category
      setOpenCategories((prev) => ({
        ...prev,
        [category]: !prev[category],
      }));
    }
  }, [collapsed, onToggle]);

  // Handle navigation with proper sidebar behavior
  const handleNavigate = useCallback((path: string) => {
    navigate(path);
    
    // If in mobile or fullscreen, collapse sidebar after navigation
    if (isMobile || isFullscreen) {
      setTimeout(() => {
        onToggle();
      }, 100);
    }
  }, [navigate, isMobile, isFullscreen, onToggle]);

  // Update component when children try to navigate
  useEffect(() => {
    const handleSidebarNavigate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.path) {
        handleNavigate(customEvent.detail.path);
      }
    };
    
    window.addEventListener('sidebar-navigate', handleSidebarNavigate);
    
    return () => {
      window.removeEventListener('sidebar-navigate', handleSidebarNavigate);
    };
  }, [handleNavigate]);

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
