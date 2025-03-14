
import React, { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface SidebarEventHandlerProps {
  onToggle: () => void;
  children: React.ReactNode;
}

const SidebarEventHandler: React.FC<SidebarEventHandlerProps> = ({ onToggle, children }) => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  // Listen for custom toggle sidebar event
  useEffect(() => {
    const handleToggleSidebar = (e: Event) => {
      // Convert to CustomEvent to access detail
      const customEvent = e as CustomEvent;
      
      if (customEvent.detail?.forceCollapse) {
        // This event just wants to force the sidebar closed
        console.log("Force collapsing sidebar from event");
        // We don't call onToggle directly, instead dispatch another event
        window.dispatchEvent(new CustomEvent('sidebar-force-collapse'));
      } else {
        // Normal toggle behavior
        onToggle();
      }
    };

    // Listen for sidebar toggle event
    window.addEventListener('toggle-sidebar', handleToggleSidebar);
    
    return () => {
      window.removeEventListener('toggle-sidebar', handleToggleSidebar);
    };
  }, [onToggle]);

  return <div dir={isArabic ? "rtl" : "ltr"}>{children}</div>;
};

export default SidebarEventHandler;
