
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimatedTransition from "../ui-custom/AnimatedTransition";
import { getSidebarLinks } from "./sidebar/sidebarLinks";
import { SidebarProps } from "./sidebar/types";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarUserProfile from "./sidebar/SidebarUserProfile";
import SidebarNavigation from "./sidebar/SidebarNavigation";
import SidebarFooter from "./sidebar/SidebarFooter";

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user, logout, hasPermission } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize open categories based on current path
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
    
    setOpenCategories(categoriesState);
    setIsInitialized(true);
  }, [location.pathname]);

  const toggleCategory = (category: string) => {
    if (collapsed) {
      // If sidebar is collapsed and category is clicked, first expand the sidebar
      onToggle();
      // Then set the category as open after a small delay
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
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Get all sidebar links
  const allLinks = getSidebarLinks();
  
  // Filter links based on user role
  const mainLinks = allLinks.filter(link => {
    // Admin can see all links
    if (hasPermission("admin")) return true;
    
    // Filter based on path
    if (link.path === "/pos" || link.path.includes("pos")) {
      return hasPermission(["admin", "cashier"]);
    }
    
    if (link.path === "/kitchen") {
      return hasPermission(["admin", "kitchen"]);
    }
    
    // Hide these sections from non-admins
    if (
      (link.name === "الأصناف" || 
       link.name === "المخزون" || 
       link.name === "التقارير")
    ) {
      return hasPermission("admin");
    }
    
    if (link.path === "/settings") {
      return hasPermission("admin");
    }
    
    // By default, show the link
    return true;
  });

  if (isMobile && collapsed) return null;

  const sidebarTransition = collapsed ? "w-20" : "w-64";

  return (
    <AnimatedTransition animation="fade" show={isInitialized}>
      <aside
        className={cn(
          "fixed lg:relative inset-y-0 right-0 z-30 flex h-screen flex-col glass border-l shadow-md",
          sidebarTransition,
          "transition-all duration-300 ease-in-out"
        )}
      >
        <SidebarHeader collapsed={collapsed} onToggle={onToggle} />
        <SidebarUserProfile user={user} collapsed={collapsed} />
        <SidebarNavigation 
          links={mainLinks} 
          collapsed={collapsed} 
          openCategories={openCategories}
          onToggleCategory={toggleCategory}
        />
        <SidebarFooter 
          collapsed={collapsed} 
          language={language} 
          onToggleLanguage={toggleLanguage} 
          onLogout={handleLogout}
        />
      </aside>
    </AnimatedTransition>
  );
};

export default Sidebar;
