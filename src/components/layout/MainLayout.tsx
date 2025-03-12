import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimatedTransition from "../ui-custom/AnimatedTransition";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const applyDisplaySettings = () => {
      const savedSettings = localStorage.getItem("displaySettings");
      if (savedSettings) {
        const { screenSize, inputMethod, autoDetectInputMethod } = JSON.parse(savedSettings);
        
        document.body.classList.remove('screen-size-standard', 'screen-size-compact', 'screen-size-large');
        document.body.classList.add(`screen-size-${screenSize}`);
        
        document.body.classList.remove('container-standard', 'container-compact', 'container-large');
        document.body.classList.add(`container-${screenSize}`);
        
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
    <div className="app-layout">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <AnimatedTransition animation="fade" delay={100}>
        <main 
          className={`app-content ${
            !sidebarCollapsed && !isMobile ? "md:ml-64" : "ml-0"
          }`}
        >
          <div className="responsive-container">
            <Outlet />
          </div>
        </main>
      </AnimatedTransition>
    </div>
  );
};

export default MainLayout;
