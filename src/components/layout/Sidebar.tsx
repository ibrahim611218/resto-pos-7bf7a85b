import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Boxes,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Plus,
  Tags,
  Users,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimatedTransition from "../ui-custom/AnimatedTransition";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface SidebarLink {
  name: string;
  path: string;
  icon: React.ReactNode;
  children?: SidebarLink[];
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    products: false,
    reports: false,
    inventory: false,
    pos: false,
  });

  const toggleCategory = (category: string) => {
    if (collapsed) return;
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const mainLinks: SidebarLink[] = [
    { 
      name: "لوحة التحكم", 
      path: "/", 
      icon: <LayoutDashboard size={20} /> 
    },
    { 
      name: "نقاط البيع", 
      path: "#", 
      icon: <ShoppingCart size={20} />,
      children: [
        { name: "عملية بيع جديدة", path: "/pos", icon: <Plus size={16} /> },
        { name: "الفواتير", path: "/invoices", icon: <FileText size={16} /> },
      ]
    },
    { 
      name: "الأصناف", 
      path: "#", 
      icon: <Package size={20} />,
      children: [
        { name: "قائمة الأصناف", path: "/products", icon: <Clipboard size={16} /> },
        { name: "إضافة صنف", path: "/products/add", icon: <Plus size={16} /> },
        { name: "التصنيفات", path: "/categories", icon: <Tags size={16} /> },
      ]
    },
    { 
      name: "المخزون", 
      path: "#", 
      icon: <Boxes size={20} />,
      children: [
        { name: "حركة المخزون", path: "/inventory", icon: <Package size={16} /> },
        { name: "إضافة مخزون", path: "/inventory/add", icon: <Plus size={16} /> },
      ]
    },
    { 
      name: "التقارير", 
      path: "#", 
      icon: <BarChart3 size={20} />,
      children: [
        { name: "المبيعات", path: "/reports/sales", icon: <BarChart3 size={16} /> },
        { name: "المخزون", path: "/reports/inventory", icon: <Package size={16} /> },
        { name: "العملاء", path: "/reports/customers", icon: <Users size={16} /> },
      ]
    },
    { 
      name: "الإعدادات", 
      path: "/settings", 
      icon: <Settings size={20} /> 
    },
  ];

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

        <nav className="mt-4 flex-1 space-y-1 px-3">
          {mainLinks.map((link) => 
            link.children ? (
              <Collapsible 
                key={link.name}
                open={openCategories[link.path.replace("/", "")]}
                onOpenChange={() => toggleCategory(link.path.replace("/", ""))}
                className={cn(
                  "w-full",
                  collapsed && "hidden"
                )}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-between",
                      location.pathname === link.path && "bg-accent text-accent-foreground"
                    )}
                  >
                    <span className="flex items-center">
                      {link.icon}
                      {!collapsed && <span className="mr-3">{link.name}</span>}
                    </span>
                    {!collapsed && (
                      <ChevronRight
                        size={16}
                        className={cn(
                          "transition-transform duration-200",
                          openCategories[link.path.replace("/", "")] && "transform rotate-90"
                        )}
                      />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 mr-6 mt-1">
                  {link.children.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 transition-colors",
                        location.pathname === child.path
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground",
                      )}
                    >
                      {child.icon}
                      <span className="mr-3">{child.name}</span>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
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
                  <span className="mr-3 transition-opacity">{link.name}</span>
                )}
              </Link>
            )
          )}
        </nav>
      </aside>
    </AnimatedTransition>
  );
};

export default Sidebar;
