
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Receipt,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimatedTransition from "../ui-custom/AnimatedTransition";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const links = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "POS", path: "/pos", icon: <ShoppingCart size={20} /> },
    { name: "Products", path: "/products", icon: <Package size={20} /> },
    { name: "Invoices", path: "/invoices", icon: <Receipt size={20} /> },
    { name: "Reports", path: "/reports", icon: <BarChart3 size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  if (isMobile && collapsed) return null;

  return (
    <AnimatedTransition animation="fade">
      <aside
        className={cn(
          "fixed lg:relative inset-y-0 left-0 z-30 flex h-screen flex-col glass border-r",
          collapsed ? "w-20" : "w-64",
          "transition-all duration-300 ease-in-out"
        )}
      >
        <div className="flex items-center justify-between p-4 h-16">
          {!collapsed && (
            <AnimatedTransition animation="fade">
              <h2 className="text-xl font-bold">NectarPOS</h2>
            </AnimatedTransition>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={onToggle}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>

        <nav className="mt-4 flex-1 space-y-1 px-3">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center rounded-md px-3 py-2 transition-colors",
                location.pathname === link.path
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
                collapsed ? "justify-center" : "justify-start"
              )}
            >
              {link.icon}
              {!collapsed && (
                <span className="ml-3 transition-opacity">{link.name}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4">
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center text-muted-foreground",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <LogOut size={20} />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>
    </AnimatedTransition>
  );
};

export default Sidebar;
