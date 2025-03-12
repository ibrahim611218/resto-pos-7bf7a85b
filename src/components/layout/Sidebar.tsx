
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimatedTransition from "../ui-custom/AnimatedTransition";
import { getSidebarLinks } from "./sidebar/sidebarLinks";
import SidebarItem from "./sidebar/SidebarItem";
import { SidebarProps } from "./sidebar/types";
import ThemeToggle from "../ui-custom/ThemeToggle";
import LanguageToggle from "../ui-custom/LanguageToggle";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLanguage } from "@/context/LanguageContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user, logout, hasPermission } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

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

  return (
    <AnimatedTransition animation="fade">
      <aside
        className={cn(
          "fixed lg:relative inset-y-0 right-0 z-30 flex h-screen flex-col glass border-l",
          collapsed ? "w-20" : "w-64",
          "transition-all duration-300 ease-in-out"
        )}
      >
        <div className="flex items-center justify-between p-4 h-16">
          {!collapsed && (
            <AnimatedTransition animation="fade">
              <h2 className="text-xl font-bold">نظام المطاعم</h2>
            </AnimatedTransition>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="mr-auto"
            onClick={onToggle}
          >
            {collapsed ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Button>
        </div>

        {user && (
          <div className={cn(
            "flex items-center px-4 py-3 border-b",
            collapsed ? "justify-center" : "justify-start gap-3"
          )}>
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {user.role === "admin" ? "مدير" : 
                   user.role === "cashier" ? "محاسب" : 
                   user.role === "kitchen" ? "مطبخ" : "مستخدم"}
                </span>
              </div>
            )}
          </div>
        )}

        <nav className="mt-4 flex-1 space-y-1 px-3 overflow-y-auto">
          {mainLinks.map((link) => (
            <SidebarItem
              key={link.name}
              link={link}
              collapsed={collapsed}
              isOpen={openCategories[link.path.replace("/", "")] || false}
              currentPath={location.pathname}
              onToggleCategory={toggleCategory}
            />
          ))}
        </nav>
        
        <div className="border-t p-3 space-y-2">
          <ThemeToggle collapsed={collapsed} className="w-full justify-start" />
          <LanguageToggle 
            collapsed={collapsed} 
            className="w-full justify-start" 
            language={language}
            onToggle={toggleLanguage}
          />
          
          <Button 
            variant="outline"
            className={cn(
              "w-full",
              collapsed ? "justify-center" : "justify-start"
            )}
            onClick={handleLogout}
          >
            <LogOut size={18} />
            {!collapsed && <span className="mr-2">تسجيل الخروج</span>}
          </Button>
        </div>
      </aside>
    </AnimatedTransition>
  );
};

export default Sidebar;
