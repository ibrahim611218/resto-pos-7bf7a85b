
import React, { useEffect } from "react";

interface SidebarEventHandlerProps {
  onToggle: () => void;
  children: React.ReactNode;
}

const SidebarEventHandler: React.FC<SidebarEventHandlerProps> = ({ onToggle, children }) => {
  // Listen for custom toggle sidebar event
  useEffect(() => {
    const handleToggleSidebar = (e: Event) => {
      // Check if there is a detail with forceCollapse
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.forceCollapse) {
        // Just force collapse, don't toggle
        console.log("Force collapsing sidebar from event");
      } else {
        // Normal toggle
        onToggle();
      }
    };

    window.addEventListener('toggle-sidebar', handleToggleSidebar);
    
    return () => {
      window.removeEventListener('toggle-sidebar', handleToggleSidebar);
    };
  }, [onToggle]);

  return <>{children}</>;
};

export default SidebarEventHandler;
