
import React, { useEffect } from "react";

interface SidebarEventHandlerProps {
  onToggle: () => void;
  children: React.ReactNode;
}

const SidebarEventHandler: React.FC<SidebarEventHandlerProps> = ({ onToggle, children }) => {
  // Listen for custom toggle sidebar event
  useEffect(() => {
    const handleToggleSidebar = () => {
      onToggle();
    };

    window.addEventListener('toggle-sidebar', handleToggleSidebar);
    
    return () => {
      window.removeEventListener('toggle-sidebar', handleToggleSidebar);
    };
  }, [onToggle]);

  return <>{children}</>;
};

export default SidebarEventHandler;
