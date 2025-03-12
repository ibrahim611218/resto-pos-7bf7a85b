
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import InventoryManager from "@/features/inventory/InventoryManager";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Inventory = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [sidebarVisible, setSidebarVisible] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  
  return (
    <div className="single-page-layout" dir={isArabic ? "rtl" : "ltr"}>
      <div className="single-page-header flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="icon"
            className="mr-2"
            onClick={toggleSidebar}
          >
            <Menu className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold">
            {isArabic ? "إدارة المخزون" : "Inventory Management"}
          </h1>
        </div>
      </div>
      
      <div className="single-page-content">
        {/* Sidebar */}
        <div 
          className={`sidebar-container ${sidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}
          style={{
            width: sidebarVisible ? '240px' : '0',
            transition: 'width 0.3s ease'
          }}
        >
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4">
              <h2 className="text-xl font-bold mb-4 centered-text">
                {isArabic ? "فلترة المخزون" : "Inventory Filters"}
              </h2>
              
              <ul className="space-y-3">
                <li className="sidebar-item">
                  {isArabic ? "المنتجات منخفضة المخزون" : "Low Stock Items"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "المواد الخام" : "Raw Materials"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "المنتجات النهائية" : "Finished Products"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "المشتريات الأخيرة" : "Recent Purchases"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "تقرير الجرد" : "Inventory Report"}
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div 
          className="single-page-main"
          style={{
            marginLeft: sidebarVisible ? '0' : '0',
            width: sidebarVisible ? 'calc(100% - 240px)' : '100%',
          }}
        >
          <InventoryManager language={language} />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
