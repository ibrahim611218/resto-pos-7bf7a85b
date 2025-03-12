
import React, { useState } from "react";
import InvoicesList from "@/features/invoices/InvoicesList";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Invoices: React.FC = () => {
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
            {isArabic ? "إدارة الفواتير" : "Invoices Management"}
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
                {isArabic ? "فلترة الفواتير" : "Invoice Filters"}
              </h2>
              
              <ul className="space-y-3">
                <li className="sidebar-item">
                  {isArabic ? "اليوم" : "Today"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "هذا الأسبوع" : "This Week"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "هذا الشهر" : "This Month"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "مدفوعة" : "Paid"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "غير مدفوعة" : "Unpaid"}
                </li>
                <li className="sidebar-item">
                  {isArabic ? "ملغاة" : "Cancelled"}
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
          <InvoicesList language={language} />
        </div>
      </div>
    </div>
  );
};

export default Invoices;
