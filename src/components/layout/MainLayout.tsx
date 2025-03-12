
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimatedTransition from "../ui-custom/AnimatedTransition";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();
  
  // Apply display settings from localStorage if available
  useEffect(() => {
    const applyDisplaySettings = () => {
      const savedSettings = localStorage.getItem("displaySettings");
      if (savedSettings) {
        const { screenSize, inputMethod, autoDetectInputMethod } = JSON.parse(savedSettings);
        
        // Apply screen size class
        document.body.classList.remove('screen-size-standard', 'screen-size-compact', 'screen-size-large');
        document.body.classList.add(`screen-size-${screenSize}`);
        
        // Apply container class
        document.body.classList.remove('container-standard', 'container-compact', 'container-large');
        document.body.classList.add(`container-${screenSize}`);
        
        // Apply input method
        if (autoDetectInputMethod) {
          const isTouchDevice = 'ontouchstart' in window || 
            navigator.maxTouchPoints > 0 ||
            (navigator as any).msMaxTouchPoints > 0;
            
          document.body.classList.remove('touch-ui', 'mouse-ui');
          document.body.classList.add(isTouchDevice ? 'touch-ui' : 'mouse-ui');
        } else {
          document.body.classList.remove('touch-ui', 'mouse-ui');
          document.body.classList.add(inputMethod === 'touch' ? 'touch-ui' : 'mouse-ui');
        }
      }
    };
    
    applyDisplaySettings();
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-background w-full m-0 p-0 full-width-container">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <AnimatedTransition animation="fade" delay={100}>
        <div 
          className={`flex-1 transition-all duration-300 ease-in-out w-full m-0 p-0 ${
            !sidebarCollapsed && !isMobile ? "md:ml-64" : "ml-0"
          }`}
        >
          <div className="h-screen w-full overflow-hidden m-0 p-0">
            <Outlet />
          </div>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default MainLayout;
