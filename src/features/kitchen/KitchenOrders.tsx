
import React, { useState } from "react";
import { Language } from "@/types";
import KitchenOrdersList from "./components/KitchenOrdersList";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface KitchenOrdersProps {
  language: Language;
}

const KitchenOrders: React.FC<KitchenOrdersProps> = ({ language }) => {
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
            {isArabic ? "إدارة طلبات المطبخ" : "Kitchen Orders Management"}
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
                {isArabic ? "فلترة الطلبات" : "Order Filters"}
              </h2>
              
              <ul className="space-y-3">
                <li className="sidebar-item">
                  {isArabic ? "الطلبات الجديدة" : "New Orders"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "قيد التحضير" : "In Progress"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "جاهزة للتسليم" : "Ready for Pickup"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "تم التسليم" : "Completed"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "ملغية" : "Cancelled"}
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
          <div className="scrollable-area">
            <KitchenOrdersList language={language} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenOrders;
