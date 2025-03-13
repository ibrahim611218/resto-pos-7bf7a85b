
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarLink } from "./types";
import { useLanguage } from "@/context/LanguageContext";
import { handleDesktopExport } from "@/utils/desktop-export";

interface SidebarItemProps {
  item: SidebarLink;
  isActive: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isActive,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  
  const hasSubMenu = item.subMenuItems && item.subMenuItems.length > 0;
  
  const handleToggleSubmenu = (e: React.MouseEvent) => {
    if (hasSubMenu) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
    if (onClick) onClick();
  };
  
  const handleActionClick = (e: React.MouseEvent, action?: string) => {
    e.preventDefault();
    
    if (action === "desktop-export") {
      handleDesktopExport(language);
    }
    
    if (onClick) onClick();
  };
  
  const itemContent = (
    <>
      <span className="mr-2 rtl:ml-2 rtl:mr-0">{item.icon}</span>
      <span className="text-sm whitespace-nowrap">
        {language === "ar" ? item.name : item.name_en}
      </span>
      {hasSubMenu && (
        <ChevronDown
          size={16}
          className={cn(
            "ml-auto transition-transform rtl:mr-auto rtl:ml-0",
            isOpen && "transform rotate-180"
          )}
        />
      )}
    </>
  );
  
  return (
    <div className="w-full">
      {/* Main Item */}
      {item.isAction ? (
        <a
          href="#"
          className={cn(
            "flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors",
            isActive && "bg-gray-100 dark:bg-gray-800"
          )}
          onClick={(e) => handleActionClick(e, item.action)}
        >
          {itemContent}
        </a>
      ) : (
        <Link
          to={item.path}
          className={cn(
            "flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg transition-colors",
            isActive && "bg-gray-100 dark:bg-gray-800"
          )}
          onClick={handleToggleSubmenu}
        >
          {itemContent}
        </Link>
      )}
      
      {/* Sub Menu Items */}
      {hasSubMenu && isOpen && (
        <div className="pl-4 mt-1 space-y-1 rtl:pl-0 rtl:pr-4">
          {item.subMenuItems?.map((subItem, idx) => (
            <Link
              key={idx}
              to={subItem.path}
              className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={onClick}
            >
              {subItem.icon && (
                <span className="mr-2 rtl:ml-2 rtl:mr-0">{subItem.icon}</span>
              )}
              <span>{language === "ar" ? subItem.name : subItem.name_en}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
